const mongoose = require('mongoose')

const dbConnection = async () => {
  await mongoose.connect(process.env.DB_CNN).catch((err) => {
    console.log({ ...err })
    throw new Error('Error connecting to Mongo')
  })
  console.log('DB online')
}

module.exports = dbConnection
