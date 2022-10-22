const bcrypt = require('bcryptjs');

// ! =============================================================================================

const encryptPassword = async password => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

// ! =============================================================================================

const passwordsMatches = (reqPassword, dbPassword) => {
  return bcrypt.compareSync(reqPassword, dbPassword);
};

// ! =============================================================================================

module.exports = {
  passwordsMatches,
  encryptPassword,
};
