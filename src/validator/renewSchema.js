const { check } = require('express-validator')
const checkErrors = require('../middleware/checkErrors')

module.exports = [check('token', 'Token is required').isJWT(), checkErrors]
