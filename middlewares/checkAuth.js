const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// !================================================================================================

const checkAuth = async (req = request, res = response, next) => {
  try {
    let token = req.headers?.authorization;

    // ? CONFIRMAR QUE EL TOKEN ESTÁ EN LA PETICIÓN
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No exite token en la petición',
      });
    }

    // ? CONFIRMAR QUE EL TOKEN ES DE TIPO BEARER
    if (!token.startsWith('Bearer')) {
      return res.status(401).json({
        ok: false,
        msg: 'token no válido',
      });
    }
     
    // ? OBTENER TOKEN ([Bearer] + [token])
    token = token.split(' ')[1];

    // ? DECODIFICAR TOKEN PARA OBTENR EL ID Y NOMBRE DEL USUARIO
    const { _id, name } = jwt.verify(token, process.env.JWT_SECRET);

    // ? ====== VALIDAR SI EXISTE EL USUARIO ======
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'Token no válido - usuario no existe en DB',
      });
    }

    // ? AGREGAR ID Y NOMBRE DEL USUARIO EN EL REQUEST
    req.user = { _id: user._id, name: user.name };

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: `Token no válido ${error.message}`,
    });
  }
};

// !================================================================================================

module.exports = {
  checkAuth,
};
