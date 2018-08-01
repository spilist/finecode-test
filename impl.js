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

module.exports = {
  tableToDictList,
  filterArray
};
