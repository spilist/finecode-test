const tableToDictList = table => {
  const [header, ...rest] = table;
  return rest.map(row =>
    row.reduce((acc, item, index) => {
      acc[header[index]] = item;
      return acc;
    }, {})
  );
};

const filterArray = (array, predicate) => {
  return array.filter(predicate);
};

const pick = (obj, key) => {
  for (let prop in obj) {
    if (prop === key) {
      return obj[prop];
    } else if (obj[prop] instanceof Object) {
      return pick(obj[prop], key);
    } else {
      continue;
    }
  }
};

const sortDistinct = array => {
  return array
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a > b);
};

module.exports = {
  tableToDictList,
  filterArray,
  pick,
  sortDistinct
};
