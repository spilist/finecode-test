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

const sortBy = (array, prop, compareFunc) => {
  return array.sort((obj1, obj2) => compareFunc(obj1[prop], obj2[prop]));
};

const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

this.multiply = multiply.bind(this);
this.divide = divide.bind(this);
this.add = add.bind(this);
this.subtract = subtract.bind(this);

const calc = (functionName, ...params) => {
  return this[functionName](...params);
};

module.exports = {
  tableToDictList,
  filterArray,
  pick,
  sortDistinct,
  sortBy,
  calc,
  multiply
};
