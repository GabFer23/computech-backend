// ! =============================================================================================

const handleStringFilters = (queryObject, stringFilters) => {
    const {
      q = '',
      storageType,
      OS,
      category,
      backLightKeyboard,
      brand,
    } = stringFilters;
  
    const regex = { $regex: q, $options: 'i' };
    const search = {
      $or: [{ title: regex }, { description: regex }],
    };
  
    queryObject = { ...search };
  
    if (storageType) {
      queryObject.storageType = storageType;
    }
  
    if (OS) {
      queryObject.OS = OS;
    }
  
    if (category) {
      queryObject.category = category;
    }
  
    if (backLightKeyboard) {
      queryObject.backLightKeyboard = true;
    }
  
    if (brand) {
      queryObject.brand = brand;
    }
  
    return queryObject;
  };
  
  // ! =============================================================================================
  
  const handleNumericFilters = (queryObject, numericFilters) => {
    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        match => `-${operatorMap[match]}-`
      );
      const options = ['price', 'storage', 'RAM'];
      filters = filters.split(',').forEach(item => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
  
    return queryObject;
  };
  
  // ! =============================================================================================
  
  module.exports = {
    handleStringFilters,
    handleNumericFilters,
  };
  