const { Schema, model } = require('mongoose');

// !================================================================================
// * ========================== ESTRUCTURA DE ESQUEMA ==========================

const ComputerSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descrición es obligatoria'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    screen: {
      type: Number,
      required: [true, 'El tamaño de la pantalla es obligatoria'],
      trim: true,
    },
    // ? Tipo de disco duro
    storageType: {
      type: String,
      enum: ['hdd', 'ssd'],
      required: [true, 'El tipo de disco duro es obligatorio'],
    },
    storage: {
      type: Number,
      required: [true, 'El almacenamiento es obligatorio'],
    },
    RAM: {
      type: Number,
      required: [true, 'La memoria RAM es obligatoria'],
    },
    // ? Sistema operativo
    OS: {
      type: String,
      enum: ['windows', 'macOS', 'linux'],
      required: [true, 'El sistema opetativo es obligatorio'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: ['laptop', 'desktop'],
    },
    // ? Teclado retroiluminado
    backLightKeyboard: {
      type: Boolean,
      default: false,
    },
    // ? Propietario / vendedor
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'La referencia al propietario es obligatoria'],
    },
    // ? Marca
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'La referencia a la marca es obligatoria'],
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

// !================================================================================

// ? ======= RETIRAR __V DE LOS DATOS RETORNADOS
ComputerSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

// !================================================================================

module.exports = model('Computer', ComputerSchema);
