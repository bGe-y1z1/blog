# 变量的解构赋值

从数组和对象中提取值，对变量进行赋值，这被称为解构
只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。

## 基本原理

解构是 ES6 提供的语法糖，其实内在是针对可迭代对象的 Iterator 接口，通过遍历器按顺序获取对应的值进行赋值

Iterator 是一种接口，为各种不一样的数据解构提供统一的访问机制。任何数据解构只要有 Iterator 接口，就能通过遍历操作，依次按顺序处理数据结构内所有成员。ES6 中的 for of 的语法相当于遍历器，会在遍历数据结构时，自动寻找 Iterator 接口。 Iterator 作用： - 为各种数据解构提供统一的访问接口 - 使得数据解构能按次序排列处理 - 可以使用 ES6 最新命令 for of 进行遍历

## 使用范围

:::tip

- 数组
- 对象
- 字符串 -字符串被转换成了一个类似数组的对象。
- 数值和布尔值 -解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
- 函数参数
  :::

## 模式匹配

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

剩余参数解构赋值后的类型为数组

```js
let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

let [x, y, ...z] = ["a"];
x; // "a"
y; // undefined
z; // []
```

:::danger
如果解构不成功，变量的值就等于 undefined。
:::

## 不完全解构

即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```js
let [x, y] = [1, 2, 3];
x; // 1
y; // 2

let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4
```

## 默认值

- 解构赋值允许指定默认值。
- 默认值可以是一个表达式
- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明

```js
var [foo = true] = [];
foo[(x, (y = "b"))] = ["a"]; // true // x='a', y='b'
[x, y = "b"] = ["a", undefined]; // x='a', y='b'

var [x = 1] = [null];
x; // null
```

:::danger
ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于 undefined，默认值是不会生效的
:::

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
function f() {
  console.log("aaa");
}

let [x = f()] = [1];
```

> 上面代码中，因为 x 能取到值，所以函数 f 根本不会执行。

## 对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; // "aaa"
foo; // error: foo is not defined
```

上面代码中，foo 是匹配的模式，baz 才是变量。真正被赋值的是变量 baz，而不是模式 foo。
:::danger
采用这种写法时，变量的声明和赋值是一体的。对于 let 和 const 来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。
:::

```js
let foo;
let { foo } = { foo: 1 }; // SyntaxError: Duplicate declaration "foo"

let foo;
({ foo } = { foo: 1 }); // 成功

let baz;
({ bar: baz } = { bar: 1 }); // 成功
```

上面代码中，let 命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。

## 用途

### 交换变量的值

```js
[x, y] = [y, x];
```

### 从函数返回多个值

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2,
  };
}
var { foo, bar } = example();
```

### 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

### 提取 JSON 数据

```js
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309],
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

### 函数参数的默认值

```js
jQuery.ajax = function (
  url,
  {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  }
) {
  // ... do stuff
};
```

### 遍历 Map 结构

```js
var map = new Map();
map.set("first", "hello");
map.set("second", "world");

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [, value] of map) {
  // ...
}
```

### 输入模块的指定方法

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```
