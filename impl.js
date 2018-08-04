const tableToDictList = table => {
  const [header, ...rest] = table;
  return rest.map(row =>
    row.reduce((acc, item, index) => {
      acc[header[index]] = item;
      return acc;
    }, {})
  );
};

const filterMultipleOfThree = array => {
  return array.filter(num => num % 3 === 0);
};

const _pick = (obj, key) => {
  for (let prop in obj) {
    if (prop === key) {
      return obj[prop];
    } else if (obj[prop] instanceof Object) {
      const result = _pick(obj[prop], key);
      if (result) {
        return result;
      }
    } else {
      continue;
    }
  }
};

const pickGlossTerm = jsonStr => {
  const json = JSON.parse(jsonStr);
  return _pick(json, "GlossTerm");
};

// without compare function, it is sorted by converting items into unicode string. Thus, for example, 11 comes before 7.
// refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
const sortDistinct = array => {
  return array
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);
};

const sortByAmount = array => {
  return array.sort((obj1, obj2) => obj2.amount - obj1.amount);
};

this.multiply = (a, b) => a * b;
this.divide = (a, b) => a / b;
this.add = (a, b) => a + b;
this.subtract = (a, b) => a - b;

const calc = (functionName, ...params) => {
  return this[functionName](...params);
};

const findDeepestChild = tree => {
  const depthCount = [];
  const pushCount = (obj, count) => {
    count += 1;
    for (let name in obj) {
      depthCount.push({ name, count });
      if (obj[name] instanceof Object) {
        pushCount(obj[name], count);
      }
    }
  };
  pushCount(tree, 0);
  return depthCount.sort((a, b) => b.count - a.count)[0].name;
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

const countAllChildren = (tree, key) => {
  const obj = _pick(tree, key);
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

  render(currentUserId) {
    const className = this.userId === currentUserId ? "right" : "left";

    return `<li class="${className}">
  <img class="profile" src="{{user_image(${this.userId})}}">
  <div class="message-content">${this.content}</div>
</li>`;
  }
}

class Notice extends Message {
  constructor(content) {
    super({ content });
  }

  render() {
    return `<li class="notice">${this.content}</li>`;
  }
}

const renderMessage = (array, params) => {
  return array.map(item => item.render(params.userId)).join("\n");
};

module.exports = {
  tableToDictList,
  filterMultipleOfThree,
  pickGlossTerm,
  sortDistinct,
  sortByAmount,
  calc,
  multiply: this.multiply,
  findDeepestChild,
  findNodesContaningMoreThan,
  countAllChildren,
  Notice,
  Message,
  renderMessage
};
