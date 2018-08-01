const lodash = require("lodash");
const impl = require("./impl");

describe("tableToDictList(table)", () => {
  it("converts table to list", () => {
    const table = [
      [
        "월",
        "일",
        "품명",
        "수량",
        "단가",
        "공급가액",
        "부가세",
        "코드",
        "거래처명"
      ],
      [
        "01",
        "01",
        "사업용신용카드사용분",
        "",
        "",
        "10,364",
        "1,036",
        "00140",
        "한국맥도날드 서초뱅뱅점"
      ],
      [
        "01",
        "01",
        "사업용신용카드사용분",
        "",
        "",
        "10,999",
        "1,101",
        "00406",
        "마이(부평점)"
      ],
      [
        "01",
        "01",
        "사업용신용카드사용분",
        "",
        "",
        "1,818",
        "182",
        "00237",
        "르뽀미에도곡점"
      ]
    ];
    const dictList = impl.tableToDictList(table);
    expect(dictList[0]["공급가액"]).toBe("10,364");
    expect(dictList[1]["거래처명"]).toBe("마이(부평점)");
  });
});

describe("filterArray(array, predicate)", () => {
  it("only filters which matches for predicate", () => {
    const data = lodash.range(0, 100);
    const filtered = impl.filterArray(data, num => num % 3 === 0);
    filtered.forEach(num => {
      expect(num % 3).toBe(0);
    });
  });
});

describe("pick(json, key)", () => {
  it("finds value of the key", () => {
    const data = {
      glossary: {
        title: "example glossary",
        GlossDiv: {
          title: "S",
          GlossList: {
            GlossEntry: {
              ID: "SGML",
              SortAs: "SGML",
              GlossTerm: "Standard Generalized Markup Language",
              Acronym: "SGML",
              Abbrev: "ISO 8879:1986",
              GlossDef: {
                para:
                  "A meta-markup language, used to create markup languages such as DocBook.",
                GlossSeeAlso: ["GML", "XML"]
              },
              GlossSee: "markup"
            }
          }
        }
      }
    };
    const picked = impl.pick(data, "GlossTerm");
    expect(picked).toBe("Standard Generalized Markup Language");
  });
});

describe("sortDistinct(array)", () => {
  it("sorts in order with distinct values", () => {
    const data = [1, 5, 8, 10, 4, 9, 11, 10, 8, 14, 3, 4];
    const result = impl.sortDistinct(data);
    expect(result).toEqual([1, 3, 4, 5, 8, 9, 10, 11, 14]);
  });
});

describe("sortBy(array, property, compareFunc)", () => {
  it("sorts by object property", () => {
    class Voucher {
      constructor(trader, amount) {
        this.trader = trader;
        this.amount = amount;
      }
    }

    const data = [
      new Voucher("GS마트", 125000),
      new Voucher("7 Eleven", 8500),
      new Voucher("신세계", 288000),
      new Voucher("이마트", 80000)
    ];

    const vouchers = impl.sortBy(data, "amount", (a, b) => a < b);
    expect(vouchers[0].trader).toBe("신세계");
    expect(vouchers[3].trader).toBe("7 Eleven");
  });
});

describe("calc(functionName, params)", () => {
  it("apply function call by name with params", () => {
    expect(impl.calc("multiply", 6, 3)).toBe(18);
    expect(impl.multiply(6, 3)).toBe(18);
    expect(impl.calc("divide", 6, 3)).toBe(2);
    expect(impl.calc("add", 6, 3)).toBe(9);
    expect(impl.calc("subtract", 6, 3)).toBe(3);
  });
});

describe("treeTraverse", () => {
  it("traverses tree", () => {
    const unixTree = {
      Unix: {
        "PWB/Unix": {
          "System III": {
            "HP-UX": null
          },
          "System V": {
            UnixWare: null,
            Solaris: {
              OpenSolaris: null
            }
          }
        },
        BSD: {
          "Unix 9": null,
          FreeBSD: null,
          NetBSD: null,
          MacOS: null
        },
        Xenix: {
          "Sco Unix": {
            OpenServer: null
          },
          AIX: null
        }
      },
      Linux: {
        Debian: {
          Ubuntu: null,
          "Linux Mint": null
        },
        Redhat: {
          CentOS: null,
          Fedora: null
        },
        Gentoo: null
      }
    };

    expect(impl.findDeepestChild(unixTree)).toBe("OpenSolaris");
    expect(impl.findNodesContaningMoreThan(unixTree, 3)).toEqual([
      "Unix",
      "BSD",
      "Linux"
    ]);
    expect(impl.countAllDistributions(unixTree, "Linux")).toBe(7);
  });
});

describe("renderMessage(messages, currentUserId)", () => {
  it("reners chat for the current user", () => {
    const messages = [
      new impl.Notice("Welcome to chat"),
      new impl.Message({ userId: 1, content: "Hello World" }),
      new impl.Message({
        userId: 2,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }),
      new impl.Message({ userId: 3, content: "안녕하세요." }),
      new impl.Message({ userId: 2, content: "ありがとうございます。" })
    ];

    expect(impl.renderMessage(messages, { userId: 2 })).toBe(
      `<li class="notice">Welcome to chat</li>
  <li class="left">
      <img class="profile" src="{{user_image(1)}}">
      <div class="message-content">Hello World</div>
  </li>
  <li class="right">
      <img class="profile" src="{{user_image(2)}}">
      <div class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
  </li>
  <li class="left">
      <img class="profile" src="{{user_image(3)}}">
      <div class="message-content">안녕하세요.</div>
  </li>
  <li class="right">
      <img class="profile" src="{{user_image(2)}}">
      <div class="message-content">ありがとうございます。</div>
  </li>`
    );
  });
});
