const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('name').isLength({max:30}),
    body('contact').isEmail(),
    body('employees').isLength(5),
    body('type').isLength({ max: 20 }),
    body('model').isLength({ max: 30 }),
    body('serialNumber').isLength({ max: 50 }),
    body('cpu').isLength({ max: 30 }),
    body('ram').isLength({ min: 10 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}