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
    .sort((a, b) => (a > b ? 1 : -1));
};

const sortBy = (array, prop, compareFunc) => {
  return array.sort(
    (obj1, obj2) => (compareFunc(obj1[prop], obj2[prop]) ? 1 : -1)
  );
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

const findDeepestChild = tree => {
  const depthCount = [];
  const pushCount = (obj, count) => {
    count += 1;
    for (let key in obj) {
      depthCount.push({ name: key, count });
      if (obj[key] instanceof Object) {
        pushCount(obj[key], count);
      }
    }
  };
  pushCount(tree, 0);
  return depthCount.sort((a, b) => (a.count < b.count ? 1 : -1))[0].name;
};

const findNodesContaningMoreThan = (tree, count) => {
  const nodes = [];
  const childrenCount = obj => {
    for (let key in obj) {
      if (obj[key] instanceof Object) {
        nodes.push({ name: key, count: Object.keys(obj[key]).length });
      }
      childrenCount(obj[key]);
    }
  };
  childrenCount(tree);
  return nodes.filter(node => node.count >= count).map(node => node.name);
};

const _pick2 = (obj, key) => {
  for (let prop in obj) {
    if (prop === key) {
      return obj[prop];
    } else if (obj[prop] instanceof Object) {
      _pick2(obj[prop], key);
    } else {
      continue;
    }
  }
};

const countAllChildren = (tree, key) => {
  const obj = _pick2(tree, key);
  let count = 0;

  const childrenCount = obj => {
    for (let key in obj) {
      count += 1;
      if (obj[key] instanceof Object) {
        childrenCount(obj[key]);
      }
    }
  };
  childrenCount(obj);
  return count;
};

class Message {
  constructor(params) {
    this.userId = params.userId;
    this.content = params.content;
  }
}

class Notice extends Message {
  constructor(content) {
    super({ userId: 0, content });
  }
}

const renderMessage = (array, params) => {
  const currentUserId = params.userId;

  return array
    .map(item => {
      if (item.userId === 0) {
        return `<li class="notice">${item.content}</li>`;
      } else {
        const className = item.userId === currentUserId ? "right" : "left";

        return `<li class="${className}"><img class="profile" src="{{user_image(${
          item.userId
        })}}"><div class="message-content">${item.content}</div></li>`;
      }
    })
    .join("\n");
};

module.exports = {
  tableToDictList,
  filterArray,
  pick,
  sortDistinct,
  sortBy,
  calc,
  multiply,
  findDeepestChild,
  findNodesContaningMoreThan,
  countAllChildren,
  Notice,
  Message,
  renderMessage
};
