import { body } from 'express-validator';

export const createHotelValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Hotel name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Hotel name must be between 3 and 100 characters'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Location must be between 3 and 100 characters'),

  body('price')
    .isNumeric()
    .withMessage('Price must be a valid number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than 0'),
];
