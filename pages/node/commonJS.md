# commonJS规范

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见，CommonJS规范加载模块是同步的，也就是说，加载完成才可以执行后面的操作，Node.js主要用于服务器编程，模块一般都是存在本地硬盘中，加载比较快，所以Node.js采用CommonJS规范。

```js
 // example.js
 var x = 5,
 var addX = function (value) {
   return value + x
 };
```
上面代码中，变量x和函数addX,是当前文件私有的，如果想在多文件分享变变量，必须定义为<font color=#D2691E>global</font>对象的属性

<p>CommonJS规范规定，每个模块内部，<font color=#D2691E>module</font>变量代表当前模块。这个变量是一个对象，
它的<font color=#D2691E>exports</font>属性（即module.exports）是对外的接口。
加载某个模块，其实是加载该模块的module.exports属性。</p>

<h3>commomJS 的特点</h3>

::: tip
- 所有代码多运行在模块作用域下，不会污染全局作用域
- 模块可以被多次加载，但只是在第一次加载的时候运行一次，然后结果就被缓存了，以后在加载就直接读取缓存结果，想要让模块再次运行必须清楚缓存
- 模块加载的顺序，按照其在代码中出现的顺序
:::

## module 模块
  node内部提供一个Module构造函数，所有模块都是Module实例
  ```js
    function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    // ...
  ```
  每个模块内部，都有一个module对象，代表当前模块他有一下属性
  ::: tip
  - module.id 模块的识别符，通常是带有绝对路径的模块文件名。
  - module.filename 模块的文件名，带有绝对路径。
  - module.loaded 返回一个布尔值，表示模块是否已经完成加载。
  - module.parent 返回一个对象，表示调用该模块的模块。
  - module.children 返回一个数组，表示该模块要用到的其他模块。
  - module.exports 表示模块对外输出的值。
  :::

 
  module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量

  #### exports变量
  为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

  ```js
  var exports = module.exports;
  ```
  造成的结果是，在对外输出模块接口时，可以向exports对象添加方法
  ```js
  exports.area = function (r) {
  return Math.PI * r * r;
};

exports.circumference = function (r) {
  return 2 * Math.PI * r;
};
  ```

## require 命令
Node使用CommonJS模块规范，内置的require命令用于加载模块文件。

require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。

#### 模块的缓存

第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。

所有缓存的模块保存在require.cache之中，如果想删除模块的缓存，可以像下面这样写。

```js
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})
```

## 模块的加载机制

CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值

#### require的内部处理流程
require命令是CommonJS规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的module.require命令，而后者又调用Node的内部命令Module._load

一旦require函数准备完毕，整个所要加载的脚本内容，就被放到一个新的函数之中，这样可以避免污染全局环境。该函数的参数包括require、module、exports，以及其他一些参数
```js
(function (exports, require, module, __filename, __dirname) {
  // YOUR CODE INJECTED HERE!
});
```