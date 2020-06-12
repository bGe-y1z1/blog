# set 和 map 数据结构

## set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

Array.from 方法可以将 Set 结构转为数组。

::: danger

- 返回的是累数组
- 在 Set 内部，两个 NaN 是相等
  :::

```js
var set = new Set([1, 2, 3, 4, 4]);
console.log(set); // Set { 1, 2, 3, 4 } 返回的是类数组
console.log([...set]); // [ 1, 2, 3, 4 ]
```

### Set 实例的属性和方法

属性

- Set.prototype.constructor：构造函数，默认就是 Set 函数。
- Set.prototype.size：返回 Set 实例的成员总数。

方法

- add() 添加某个值，返回 Set 结构本身。
- delete() 删除某个值，返回一个布尔值，表示删除是否成功
- clear() 清除所有成员，没有返回值。
- has() 返回一个布尔值，表示该值是否为 Set 的成员。

遍历

keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员

## map

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适

### Map 实例的属性和方法

属性

- size 属性 返回 Map 结构的成员总数。

方法

- set(key, value) 方法设置 key 所对应的键值，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键
- get(key) get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- has(key) has 方法返回一个布尔值，表示某个键是否在 Map 数据结构中
- delete(key) delete 方法删除某个键，返回 true。如果删除失败，返回 false
- clear clear 方法清除所有成员，没有返回值。

遍历

keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员

### 其他数据结构的互相转换

#### （1）Map 转为数组

```js
let myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
[...myMap];
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

#### （2）数组转为 Map

```js
new Map([
  [true, 7],
  [{ foo: 3 }, ["abc"]],
]);
// Map {true => 7, Object {foo: 3} => ['abc']}
```

#### （3）Map 转为对象

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

let myMap = new Map().set("yes", true).set("no", false);
strMapToObj(myMap);
// { yes: true, no: false }
```

#### （4）对象转为 Map

```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({ yes: true, no: false });
// [ [ 'yes', true ], [ 'no', false ] ]
```

#### （5）Map 转为 JSON

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set("yes", true).set("no", false);
strMapToJson(myMap);
// '{"yes":true,"no":false}'

function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
mapToArrayJson(myMap);
// '[[true,7],[{"foo":3},["abc"]]]'
```

#### （6）JSON 转为 Map

```js
unction jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes":true,"no":false}')
// Map {'yes' => true, 'no' => false}

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```
