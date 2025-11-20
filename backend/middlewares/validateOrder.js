const { body, validationResult } = require('express-validator');

const validateCreateOrder = [
  body('items').isArray({ min: 1 }).withMessage('items debe ser un arreglo con al menos un elemento'),
  body('items.*.articleId').isInt({ gt: 0 }).withMessage('items[].articleId debe ser un entero mayor que 0'),
  body('items.*.quantity').isInt({ gt: 0 }).withMessage('items[].quantity debe ser un entero mayor que 0'),
  body('userId').optional().isInt({ gt: 0 }).withMessage('userId debe ser un entero mayor que 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCreateOrder };
