# symbol

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过 Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

注意，Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

## 使用场景

### 使用 Symbol 来作为对象属性名(key)

当使用了 Symbol 作为对象的属性 key 后，在对该对象进行 key 的枚举时，会有什么不同？在实际应用中，我们经常会需要使用 Object.keys()或者 for...in 来枚举对象的属性名

当使用 JSON.stringify()将对象转换成 JSON 字符串的时候，Symbol 属性也会被排除在输出内容之外

```js
const PROP_NAME = Symbol();
const PROP_AGE = Symbol();

let obj = {
  [PROP_NAME]: "一斤代码",
};
obj[PROP_AGE] = 18;

obj[PROP_NAME]; // '一斤代码'
obj[PROP_AGE]; // 18

//  Object.keys()或者 for...in 无法获取key
let obj = {
  [Symbol("name")]: "一斤代码",
  age: 18,
  title: "Engineer",
};

Object.keys(obj); // ['age', 'title']

for (let p in obj) {
  console.log(p); // 分别会输出：'age' 和 'title'
}
//
Object.getOwnPropertyNames(obj); // ['age', 'title']

// 当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外
JSON.stringify(obj); // {"age":18,"title":"Engineer"}
// 使用Object的API
Object.getOwnPropertySymbols(obj); // [Symbol(name)]

// 使用新增的反射API
Reflect.ownKeys(obj); // [Symbol(name), 'age', 'title']
```

### 使用 symbol 来定义常量

```js
const TYPE_AUDIO = Symbol();
const TYPE_VIDEO = Symbol();
const TYPE_IMAGE = Symbol();

function handleFileResource(resource) {
  switch (resource.type) {
    case TYPE_AUDIO:
      playAudio(resource);
      break;
    case TYPE_VIDEO:
      playVideo(resource);
      break;
    case TYPE_IMAGE:
      previewImage(resource);
      break;
    default:
      throw new Error("Unknown type of resource");
  }
}
```

### 使用 Symbol 定义类的私有属性/方法

a.js

```js
const PASSWORD = Symbol();

class Login {
  constructor(username, password) {
    this.username = username;
    this[PASSWORD] = password;
  }

  checkPassword(pwd) {
    return this[PASSWORD] === pwd;
  }
}

export default Login;
```

b.js

```js
import Login from "./a";

const login = new Login("admin", "123456");

login.checkPassword("123456"); // true

login.PASSWORD; // oh!no!
login[PASSWORD]; // oh!no!
login["PASSWORD"]; // oh!no!
```

## 注册和获取全局 Symbol

通常情况下，我们在一个浏览器窗口中（window），使用 Symbol()函数来定义和 Symbol 实例就足够了。但是，如果你的应用涉及到多个 window，并需要这些 window 中使用的某些 Symbol 是同一个，那就不能使用 Symbol()函数了，因为用它在不同 window 中创建的 Symbol 实例总是唯一的，而我们需要的是在所有这些 window 环境下保持一个共享的 Symbol。这种情况下，我们就需要使用另一个 API 来创建或获取 Symbol，那就是 Symbol.for()，它可以注册或获取一个 window 间全局的 Symbol 实例：

```js
let gs1 = Symbol.for("global_symbol_1"); //注册一个全局Symbol
let gs2 = Symbol.for("global_symbol_1"); //获取全局Symbol

gs1 === gs2; // true
```
