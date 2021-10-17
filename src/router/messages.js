const { Router } = require('express')
const checkJwt = require('../middleware/checkJWT')
const { getChat } = require('../controllers/message')

const router = Router()

router.get('/:to', checkJwt, getChat)

module.exports = router
