// ! =============================================================================================

const isValidCategory = category => {
    const includes = ['laptop', 'desktop'].includes(category);
  
    if (!includes) {
      throw new Error(`Categoría ${category} no es válido`);
    }
    return true;
  };
  
  // ! =============================================================================================
  
  const isValidOS = OS => {
    const includes = ['windows', 'macOS', 'linux'].includes(OS);
  
    if (!includes) {
      throw new Error(`Sistema operativo ${OS} no es válido`);
    }
    return true;
  };
  
  // ! =============================================================================================
  
  const isValidStorageType = storageType => {
    const includes = ['hdd', 'ssd'].includes(storageType);
  
    if (!includes) {
      throw new Error(`El tipo de almacenamiento ${storageType} no es válido`);
    }
  
    return true;
  };
  
  // ! =============================================================================================
  
  module.exports = {
    isValidCategory,
    isValidOS,
    isValidStorageType,
  };
  