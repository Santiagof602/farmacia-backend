const { Order, OrderItem, Article, User } = require("../models");

// Obtener todas las órdenes de un usuario
async function index(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId es requerido' });
    }

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [Article]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
  }
}

// Obtener una orden específica
async function show(req, res) {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [Article]
        },
        User
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener orden', error: error.message });
  }
}

// Crear una nueva orden (compra)
async function store(req, res) {
  const { sequelize } = require('../models');
  const t = await sequelize.transaction();
  try {
    // items: [{ articleId, quantity }, ...]
    const items = req.body.items;
    let userId = req.body.userId;

    // If authenticated, prefer token user id
    if (req.user && req.user.id) {
      userId = req.user.id;
    }

    if (!userId || !items || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'userId e items son requeridos' });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      await t.rollback();
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    let total = 0;
    const orderItemsData = [];

    // Validar artículos y calcular total (con bloqueo optimista)
    for (const item of items) {
      const article = await Article.findByPk(item.articleId, { transaction: t, lock: t.LOCK.UPDATE });

      if (!article) {
        await t.rollback();
        return res.status(404).json({ message: `Artículo con id ${item.articleId} no encontrado` });
      }

      if (article.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Stock insuficiente para ${article.name}` });
      }

      const itemPrice = parseFloat(article.price);
      const itemTotal = itemPrice * item.quantity;
      total += itemTotal;

      orderItemsData.push({ articleId: article.id, quantity: item.quantity, price: itemPrice });
    }

    // Crear la orden dentro de la transacción
    const order = await Order.create({ userId, total, status: 'pending' }, { transaction: t });

    // Crear items y decrementar stock
    for (const itemData of orderItemsData) {
      await OrderItem.create({ orderId: order.id, ...itemData }, { transaction: t });

      // Actualizar stock
      const article = await Article.findByPk(itemData.articleId, { transaction: t, lock: t.LOCK.UPDATE });
      await article.update({ stock: article.stock - itemData.quantity }, { transaction: t });
    }

    await t.commit();

    // Obtener la orden completa con items
    const completeOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, include: [Article] }]
    });

    res.status(201).json({ message: 'Orden creada exitosamente', order: completeOrder });
  } catch (error) {
    try { await t.rollback(); } catch (e) {}
    res.status(500).json({ message: 'Error al crear orden', error: error.message });
  }
}

// Actualizar estado de una orden
async function update(req, res) {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    const { status } = req.body;

    if (!['pending', 'paid', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    await order.update({ status });

    res.json({ message: 'Orden actualizada', order });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar orden', error: error.message });
  }
}

// Cancelar una orden
async function destroy(req, res) {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [OrderItem]
    });

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    // Authorization: allow owner or admin
    const requesterId = req.user && req.user.id;
    const requesterRole = req.user && req.user.role;
    if (requesterRole !== 'admin' && requesterId !== order.userId) {
      return res.status(403).json({ message: 'Acceso denegado: solo admin o propietario pueden cancelar la orden' });
    }

    // Si la orden no ha sido pagada, devolver stock
    if (order.status === 'pending') {
      for (const item of order.orderItems) {
        const article = await Article.findByPk(item.articleId);
        await article.update({ stock: article.stock + item.quantity });
      }
    }

    await order.update({ status: 'cancelled' });

    res.json({ message: 'Orden cancelada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cancelar orden', error: error.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
