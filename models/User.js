const { Schema, model } = require('mongoose');

// !================================================================================
// * ========================== ESTRUCTURA DE ESQUEMA ==========================

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email del usuario es obligatorio'],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'El teléfono del usuario es obligatorio'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    trim: true,
  },
});

// !================================================================================

// ? ======= RETIRAR __V DE LOS DATOS RETORNADOS 
UserSchema.methods.toJSON = function(){
  const {__v, ...data} = this.toObject();
  return data;
}

// !================================================================================

module.exports = model('User', UserSchema);
