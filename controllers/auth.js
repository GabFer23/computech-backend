const { request, response } = require('express');
const { User } = require('../models');
const { generateJWT } = require('../helpers/generateJWT');
const {passwordsMatches , encryptPassword } = require('../helpers/passwordHandler');

// ! =============================================================================================
// * ========================== REGISTRO DE USUARIO ==========================

const signUp = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // ? ====== VALIDAR SI EL CORREO YA ESTÁ EN USO ======
    const emailAlreadyIsInUse = await User.findOne({ email });
    if (emailAlreadyIsInUse) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está en uso',
      });
    }

    // ? INSTANCIAR NUEVO USUARIO
    const user = new User(req.body);

    // ? ENCRIPTAR CONTRASEÑA
    user.password = await encryptPassword(password);

    // ? GUARDAR USUARIO
    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'Registro completado',
      user: {
        _id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

// ! =============================================================================================
// * ========================== LOGIN DE USUARIO ==========================

const Login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // ? ====== VALIDAR SI EXISTE UN USUARIO CON EL CORREO ======
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con el correo',
      });
    }

    // ? ======= COMPARAR CONTRASEÑA =======
    const matches = passwordsMatches(password, user.password);
    if (!matches) {
      return res.status(403).json({
        ok: false,
        msg: 'Contraseña incorrecto',
      });
    }

    // ? ======= GENERAR JWT =======
    const token = await generateJWT(user._id, user.name);

    res.status(200).json({
      ok: true,
      msg: 'Login completado',
      user: {
        _id: user._id,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

// ! =============================================================================================
// * ========================== RENOVAR TOKEN ==========================

const refreshToken = async (req = request, res = response) => {
  const { user } = req;

  try {
    // ? ======= GENERAR JWT =======
    const token = await generateJWT(user._id, user.name);

    res.status(200).json({
      ok: true,
      msg: 'Token renovado',
      user: {
        _id: user._id,
        name: user.name,
        token,
      },
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
  signUp,
  Login,
  refreshToken,
};
