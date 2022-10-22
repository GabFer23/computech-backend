const { Schema, model } = require('mongoose');

// !================================================================================
// * ========================== ESTRUCTURA DE ESQUEMA ==========================

const BrandSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});


// !================================================================================

// ? ======= RETIRAR __V DE LOS DATOS RETORNADOS 
BrandSchema.methods.toJSON = function(){
  const {__v, ...data} = this.toObject();
  return data;
}

// !================================================================================

module.exports = model('Brand', BrandSchema);