const { request, response } = require('express');
const { Brand } = require('../models');

// ? |======================================[ ÁREA PÚBLICA ]=======================================|

// ! =============================================================================================
// * ========================== OBTENER TODAS LAS MARCAS ==========================

const getAllBrands = async (req = request, res = response) => {
  try {
    // ? OBTENER TODAS LAS MARCAS
    const brands = await Brand.find();

    res.status(201).json({
      ok: true,
      msg: 'Marcas obtenidas',
      brands,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

// ? |======================================[ ÁREA PRIVADA ]=======================================|

// ! =============================================================================================
// * ========================== AGREGAR MARCA ==========================

const createBrand = async (req = request, res = response) => {
  const { name } = req.body;
  try {
    // ? ====== EVITAR NOMBRES DE MARCA REPETIDOS ======
    const brandExists = await Brand.findOne({ name });

    if (brandExists) {
      return res.status(400).json({
        msg: `La marca con el nombre '${brandExists.name}' ya existe`,
      });
    }

    // ? ====== CREAR NUEVA MARCA ======
    const newBrand = new Brand(req.body);

    const savedBrand = await newBrand.save();

    res.status(201).json({
      ok: true,
      msg: 'Marca creada correctamente',
      brand: savedBrand,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

// ! =============================================================================================

module.exports = {
  getAllBrands,
  createBrand,
};
