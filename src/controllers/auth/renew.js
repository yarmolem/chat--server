const { response } = require('express')

const renew = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = renew
