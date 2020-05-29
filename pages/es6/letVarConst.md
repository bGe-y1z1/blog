# ES6-let 与 const

:::tip
在说 let 和 const 之前我们先说下 var, var 有一下几个特点

- 可以重复说明
- 不能定义常量
- 没有块级作用域
- 变量预解析
  :::

## let

> 块级作用域

```js
{
  let a = 1;
}
console.log(a); // a is not defined
```

> 作用域链 当子块没有声明时，用父块的 a

```js
{
  let a = 0;
  {
    console.log(a); //0，
  }
}
```

> 不同作用域可以重复定义
> 子块可以重新声明 b，但不影响父块的 b

```js
{
  let b = 0;
  {
    let b = 1; //可行不报错，
  }
}
```

> 不支持预解析
> 因为子块有 let 声明 c，但是不支持预解析，故报错

```js
{
  let c = 0;
  {
    console.log(c); //报错 Cannot access 'c' before initialization，
    let c = 1;
  }
}
```

> 在全局作用域下，var 的变量是会挂在 window 下的，而 let 声明的变量并不会挂在 window 下(仅浏览器而言)

```js
var zhuangzhuang = 1;
console.log(window.zhuangzhuang); //1

let jingjing = 2;
console.log(widnow.jingjing); //undefined
```

## const

const 用于定义常量，一旦定义，不能重复赋值,但需要注意以下情况：

```js
const PI = 3.14;
PI = 2; //报错，不能重复赋值

const PI = { name: "zhuangzhuang" };
PI = { name: "zz" }; //报错，不能重复赋值 Assignment to constant variable.
```

> const 不能重复定义，但是如果为对象，可以改变其属性值

```js
const PI = { name: "zhuangzhuang" };
PI.name = "zz"; //OK，不能重复赋值对象，但是可以改变对象内的属性
PI.age = 18; // ok
console.log(PI); //{ name: 'zz', age: 18 }

const arr = [1, 2, 3];

arr = [1, 2, 4]; // Assignment to constant variable.
arr[0] = 5; // ok
console.log(arr); //  [ 5, 2, 3 ]
arr[3] = 5; // ok
console.log(arr); //  [ 5, 2, 3, 5 ]
```
