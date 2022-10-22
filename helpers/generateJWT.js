const jwt = require('jsonwebtoken');

// !================================================================================
// * ========================== GENERAR JSON WEB TOKEN ==========================


const generateJWT = (_id, name) => {
  return new Promise((resolve, reject) => {

    jwt.sign({ _id, name }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    }, (err, token) => {
        if (err) {
            console.log(err);
            reject('No se pudo generar el token');
        }

        resolve(token);
    });
  });
};

// !================================================================================

module.exports = {
  generateJWT,
};
