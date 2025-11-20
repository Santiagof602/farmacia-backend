const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // No mostrar contraseñas
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
}

// Store a newly created resource in storage (REGISTER)
async function store(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validaciones básicas
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // Hashear la contrasea
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const userResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    // Generar JWT
    const { JWT_SECRET } = require('../middlewares/authJWT');
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(userResponse, JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: userResponse,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { firstname, lastname, email } = req.body;

    await user.update({ firstname, lastname, email });

    const userResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    res.json({ message: 'Usuario actualizado', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
}

// LOGIN endpoint
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contrasea con bcrypt
    const bcrypt = require('bcrypt');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales invlidas' });
    }

    const userResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    // Generar JWT
    const { JWT_SECRET } = require('../middlewares/authJWT');
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(userResponse, JWT_SECRET, { expiresIn: '2h' });

    res.json({
      message: 'Login exitoso',
      user: userResponse,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  login,
};
