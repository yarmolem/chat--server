const { Router } = require('express')
const { getUser } = require('../controllers/user')
const checkJwt = require('../middleware/checkJwt')

const router = Router()

router.get('/:uid', checkJwt, getUser)

module.exports = router
