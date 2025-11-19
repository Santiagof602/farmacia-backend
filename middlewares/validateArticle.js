const { body, validationResult } = require("express-validator");
const { Article, Category } = require("../models");

// Middleware para capturar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Validaciones para crear un artículo
const validateCreateArticle = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 100 }).withMessage("El nombre no puede exceder 100 caracteres"),
  // Unicidad para creación (se verifica antes de intentar insertar en DB)
  body('name').custom(async (value) => {
    const nameTrim = String(value).trim();
    const existing = await Article.findOne({ where: { name: nameTrim } });
    if (existing) {
      throw new Error('Ya existe un artículo con ese nombre');
    }
    return true;
  }),
  //incompleto revisar luego
  //body('name').custom(async (value) => {
//     const nameTrim = String(value).trim();
//     const existing = await Article.findOne({ where: { name: nameTrim } });
//     if (existing) {
//       throw new Error('Ya existe un artículo con ese nombre');
//     }
//     return true;
//   }),
  
  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .custom((value) => {
      // Acepta numeros o strings numericos con hasta 2 decimales
      const str = String(value);
      if (!/^\d+(\.\d{1,2})?$/.test(str)) {
        throw new Error('El precio debe ser un número con máximo dos decimales');
      }
      if (Number(value) <= 0) {
        throw new Error('El precio debe ser un número mayor a 0');
      }
      return true;
    }),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no puede exceder 500 caracteres"),
  
  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero no negativo"),
  
  // categoryId: debe ser un entero que exista en la tabla categories
  body("categoryId")
    .optional()
    .isInt({ min: 1 }).withMessage("categoryId debe ser un entero válido")
    .bail()
    .custom(async (value) => {
      const cat = await Category.findByPk(value);
      if (!cat) throw new Error('La categoría indicada no existe');
      return true;
    }),
  
  body("image")
    .optional()
    .isURL().withMessage("La imagen debe ser una URL válida"),
  
  handleValidationErrors
];

// Validaciones para actualizar un artículo (todos los campos son opcionales)
const validateUpdateArticle = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 100 }).withMessage("El nombre no puede exceder 100 caracteres"),
  // Unicidad para actualización: si se envía nombre, verificar que no exista otro artículo con ese nombre
  body('name').optional().custom(async (value, { req }) => {
    const nameTrim = String(value).trim();
    const existing = await Article.findOne({ where: { name: nameTrim } });
    if (existing && String(existing.id) !== String(req.params.id)) {
      throw new Error('Ya existe otro artículo con ese nombre');
    }
    return true;
  }),
  
  body("price")
    .optional()
    .isFloat({ min: 0.01 }).withMessage("El precio debe ser un número mayor a 0"),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no puede exceder 500 caracteres"),
  
  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero no negativo"),
  
  body("categoryId")
    .optional()
    .isInt({ min: 1 }).withMessage("categoryId debe ser un entero válido")
    .bail()
    .custom(async (value) => {
      const cat = await Category.findByPk(value);
      if (!cat) throw new Error('La categoría indicada no existe');
      return true;
    }),
  
  body("image")
    .optional()
    .isURL().withMessage("La imagen debe ser una URL válida"),
  
  handleValidationErrors
];

module.exports = {
  validateCreateArticle,
  validateUpdateArticle,
  handleValidationErrors
};
