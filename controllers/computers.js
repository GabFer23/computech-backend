const { request, response } = require('express');
const {
  handleStringFilters,
  handleNumericFilters,
} = require('../helpers/handleQueryObject');
const { Computer, Brand } = require('../models');

// ? |======================================[ ÁREA PÚBLICA ]=======================================|

// ! =============================================================================================
// * ================== OBTENER TODOS LOS COMPUTADORES ==================

const getAllComputers = async (req = request, res = response) => {
  // ? QUERY
  const {
    numericFilters,
    page = 1,
    pageSize = 10,
    ...stringFilters
  } = req.query;

  let queryObject = {};

  // ? AGREGAR FILTROS DE TEXTO AL QUERY OBJECT
  queryObject = handleStringFilters(queryObject, stringFilters);

  // ? AGREGAR FILTROS NUMÉRICOS AL QUERY OBJECT
  queryObject = handleNumericFilters(queryObject, numericFilters);

  try {
    const skip = (page - 1) * pageSize;
    const computers = await Computer.find(queryObject)
      .populate({ path: 'brand', select: '-__v' })
      .select('-owner')
      .skip(skip)
      .limit(pageSize);

    // ? OBTENER LA CANTIDAD DE REGISTROS DE COMPUTADORES
    const totalComputers = await Computer.find().countDocuments();

    // ? CALCULAR LA CANTIDAD DE PÁGINAS
    const totalPages = Math.ceil(totalComputers / pageSize);

    res.status(200).json({
      ok: true,
      msg: 'Obtenidos correctamente',
      computers,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

// ! =============================================================================================
// * ================== OBTENER UN COMPUTADOR POR ID ==================

const getComputerById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // ? BUSCAR COMPUTADOR POR ID
    const computer = await Computer.findById(id)
      .populate({
        path: 'owner',
        select: '-password -__v',
      })
      .populate({
        path: 'brand',
        select: '-__v',
      });

    // ? VERIFICAR SI EL COMPUTADOR EXISTE
    if (!computer) {
      return res.status(404).json({
        ok: false,
        msg: 'Computador no encontrado',
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'computer obtenido correctamente',
      computer,
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
// * ================= OBTENER TODOS LOS COMPUTADORES DE UN USUARIO =================

const getAllComputersByUser = async (req = request, res = response) => {
  const { user } = req;

  res.status(200).json({
    ok: true,
    msg: 'Obtenidos correctamente',
    user: user._id,
  });
};

// ! =============================================================================================
// * ================= CREAR COMPUTADOR =================

const createComputer = async (req = request, res = response) => {
  const { user } = req;

  try {
    // ? ====== VERIFICAR SI LA MARCA EXISTE ======
    const { brand } = req.body;
    const brandExists = await Brand.findById(brand);

    if (!brandExists) {
      return res.status(404).json({
        ok: false,
        msg: 'Marca no encontrada',
      });
    }

    // ? CREAR OBJETO A GUARDAR
    const newComputer = new Computer(req.body);

    // ? ASIGNAR DUEÑO AL COMPUTADOR
    newComputer.owner = user._id;

    // ? GUARDAR
    const savedComputer = await newComputer.save();

    await savedComputer.populate('brand');

    res.status(201).json({
      ok: true,
      msg: 'Creado correctamente',
      computer: savedComputer,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

// ! =============================================================================================
// * ================= ACTUALIZAR COMPUTADOR =================

const updateComputer = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Actualizado correctamente',
    computer: req.body,
  });
};

// ! =============================================================================================
// * ================= ELIMINAR COMPUTADOR =================

const deleteComputer = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'eliminado correctamente',
  });
};

// ! =============================================================================================

module.exports = {
  getAllComputers,
  getComputerById,
  getAllComputersByUser,
  createComputer,
  updateComputer,
  deleteComputer,
};
