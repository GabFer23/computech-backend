const { Router } = require('express');
const { check } = require('express-validator');

const {
  getAllComputers,
  getAllComputersByUser,
  createComputer,
  getComputerById,
  updateComputer,
  deleteComputer,
} = require('../controllers/computers');

const { isValidCategory, isValidOS, isValidStorageType } = require('../helpers/validators');

const { checkAuth } = require('../middlewares/checkAuth');
const { fieldsValidation } = require('../middlewares/fieldsValidation');
const router = Router();

// ? |======================================[ ÁREA PÚBLICA ]=======================================|

// ! =============================================================================================
// * ================== OBTENER TODOS LOS COMPUTADORES ==================

router.get('/', getAllComputers);

// ! =============================================================================================
// * ================== OBTENER UN COMPUTADOR POR ID ==================

router.get('/:id', [
    check('id', 'Id no válida').isMongoId(),
    fieldsValidation
], getComputerById);


// ? |======================================[ ÁREA PRIVADA ]=======================================|

// ? VALIDAR JWT
router.use(checkAuth);


// ! =============================================================================================
// * ================= OBTENER TODOS LOS COMPUTADORES DE UN USUARIO =================

router.get('/get/my', getAllComputersByUser);

// ! =============================================================================================
// * ================= CREAR COMPUTADOR =================

router.post('/', [
  check('title', 'El título es obligatorio').not().isEmpty(),
  check('description', 'La descripción es obligatoria').not().isEmpty(),
  check('price', 'Precio no válido').isNumeric(),
  check('screen', 'Tamaño no válido').isNumeric(),
  check('storageType').custom(isValidStorageType),
  check('storage', 'El almacenamiento no válido').isNumeric(),
  check('RAM', 'Valor de RAM no válido').isNumeric(),   
  check('OS').custom(isValidOS),
  check('category').custom(isValidCategory),
  check('brand', 'Id de marca no válido').isMongoId(),   
  fieldsValidation
], createComputer);


// ! =============================================================================================
// * ================= ACTUALIZAR COMPUTADOR =================

router.put('/:id', [
  check('id', 'Id no válida').isMongoId(),
  check('title', 'El título es obligatorio').not().isEmpty(),
  check('description', 'La descripción es obligatoria').not().isEmpty(),
  check('price', 'Precio no válido').isNumeric(),
  check('screen', 'Tamaño no válido').isNumeric(),
  check('storageType').custom(isValidStorageType),
  check('storage', 'El almacenamiento no válido').isNumeric(),
  check('RAM', 'Valor de RAM no válido').isNumeric(),   
  check('OS').custom(isValidOS),
  check('category').custom(isValidCategory),
  check('brand', 'Id de marca no válido').isMongoId(),   
  fieldsValidation
], updateComputer);

// ! =============================================================================================
// * ================= ACTUALIZAR COMPUTADOR =================

router.delete('/:id', [
  check('id', 'Id no válida').isMongoId(),
  fieldsValidation
], deleteComputer);

// ! =============================================================================================

module.exports = router;
