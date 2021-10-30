const { Router } = require('express')
const checkJwt = require('../middleware/checkJwt')
const loginSchema = require('../validator/loginSchema')
const registerSchema = require('../validator/registerSchema')
const { login, register, renew } = require('../controllers/auth')

const router = Router()

router.get('/', checkJwt, renew)
router.post('/', loginSchema, login)
router.put('/', registerSchema, register)

module.exports = router
