const { check } = require('express-validator')
const checkErrors = require('../middleware/checkErrors')

module.exports = [
  check('email', 'Email is required').isEmail(),
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be more then 3 characters.').isLength({
    min: 3
  }),
  checkErrors
]
