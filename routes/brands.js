const { Router } = require('express');
const { check } = require('express-validator');
const { getAllBrands, createBrand } = require('../controllers/brands');
const { checkAuth } = require('../middlewares/checkAuth');
const { fieldsValidation } = require('../middlewares/fieldsValidation');

const router = Router();

// ? |======================================[ ÁREA PÚBLICA ]=======================================|

// ! =============================================================================================
// * ========================== OBTENER TODAS LAS MARCAS ==========================

router.get('/', getAllBrands);

// ? |======================================[ ÁREA PRIVADA ]=======================================|

// ! =============================================================================================
// * ========================== AGREGAR MARCA ==========================

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldsValidation
],
checkAuth,
createBrand);

// ! =============================================================================================

module.exports = router;
