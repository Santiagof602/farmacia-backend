const { body, validationResult } = require("express-validator");

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

// Validaciones para crear una categoría
const validateCreateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre de la categoría es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 100 }).withMessage("El nombre no puede exceder 100 caracteres"),
  
  // Verificar unicidad del nombre
  body('name').custom(async (value) => {
    const nameTrim = String(value).trim();
    const existing = await require("../models").Category.findOne({ where: { name: nameTrim } });
    if (existing) {
      throw new Error('Ya existe una categoría con ese nombre');
    }
    return true;
  }),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no puede exceder 500 caracteres"),
  
  handleValidationErrors
];

// Validaciones para actualizar una categoría
const validateUpdateCategory = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 100 }).withMessage("El nombre no puede exceder 100 caracteres"),
  
  // Verificar unicidad al actualizar
  body('name').optional().custom(async (value, { req }) => {
    const nameTrim = String(value).trim();
    const existing = await require("../models").Category.findOne({ where: { name: nameTrim } });
    if (existing && String(existing.id) !== String(req.params.id)) {
      throw new Error('Ya existe otra categoría con ese nombre');
    }
    return true;
  }),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("La descripción no puede exceder 500 caracteres"),
  
  handleValidationErrors
];

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
  handleValidationErrors
};
