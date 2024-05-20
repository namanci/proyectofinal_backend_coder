const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { hashPassword } = require('../utils/hashPassword.js')

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String, 
    enum: ['user', 'premium', 'admin'],
    default: 'user'
  },
  first_connection: { type: Date, default: Date.now }
})

// Hasheamos la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password)
  }
  next()
})

userSchema.plugin(mongoosePaginate)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel