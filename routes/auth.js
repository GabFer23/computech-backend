const { Router } = require('express');
const { signUp, Login, refreshToken } = require('../controllers/auth');

const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fieldsValidation');
const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

// ! =============================================================================================
// * ========================== REGISTRO DE USUARIO ==========================

router.post('/signup',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('phone', 'El teléfono debe tener al menos 10 caracteres').isLength({
      min: 10,
    }),
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({
      min: 6,
    }),
    fieldsValidation,
  ],
  signUp
);

// ! =============================================================================================
// * ========================== LOGIN DE USUARIO ==========================

router.post('/login',
  [
    check('email', 'El email no es válido').isEmail(),
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({
      min: 6,
    }),
    fieldsValidation,
  ],
  Login
);

// ! =============================================================================================
// * ========================== RENOVAR TOKEN ==========================

router.get('/refresh', checkAuth, refreshToken);

// ! =============================================================================================

module.exports = router;
