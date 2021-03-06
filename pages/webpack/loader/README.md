# loader

loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

:::tip

- 处理一个文件可以使用多个 loader，loader 的执行顺序和配置中的顺序是相反的，即最后一个 loader 最先执行，第一个 loader 最后执行

- 第一个执行的 loader 接收源文件内容作为参数，其它 loader 接收前一个执行的 loader 的返回值作为参数，最后执行的 loader 会返回此模块的 JavaScript 源码
  :::

例子:

```js
module.exports = {
  module: {
    rules: [
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // 给 css-loader 传入配置项
            options: {
              minimize: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
```

## Loader 的职责

一个 loader 的职责是单一的,一个原文件需要多次转换才能使用就通过多个 loader 来转化,确保每个 loader 只做一次转化,
开发过程只需要关注输入和输出

## loader 基础

由于 Webpack 是运行在 Node.js 之上的，一个 Loader 其实就是一个 Node.js 模块，这个模块需要导出一个函数。 这个导出的函数的工作就是获得处理前的原内容，对原内容执行处理后，返回处理后的内容。

一个简单的 loader 源代码

```js
module.exports = function (source) {
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该`Loader`没有做任何转换
  return source;
};
```

## Loader 进阶

webpack 还提供了一些 api 给 loader 调用

### 获得 Loader 的 options loader-utils

在最上面处理 SCSS 文件的 Webpack 配置中，给 css-loader 传了 options 参数，以控制 css-loader。要在自己编写的 Loader 中获取到用户传入的 options，需要这样做：

```js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return source;
};
```

### 返回其他结果 this.callback

上面的 Loader 都只是返回了原内容转换后的内容，但有些场景下还需要返回除了内容之外的东西。
例如以用 babel-loader 转换 ES6 代码为例，它还需要输出转换后的 ES5 代码对应的 Source Map，以方便调试源码。 为了把 Source Map 也一起随着 ES5 代码返回给 Webpack，可以这样写：

```js
module.exports = function (source) {
  // 通过 this.callback 告诉 Webpack 返回的结果
  this.callback(null, source, sourceMaps);
  // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
  // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中
  return;
};
```

其中的 this.callback 是 Webpack 给 Loader 注入的 API，以方便 Loader 和 Webpack 之间通信。this.callback 的详细使用方法如下：

```js
this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```

### 同步与异步

Loader 有同步和异步之分，上面介绍的 Loader 都是同步的 Loader，因为它们的转换流程都是同步的，转换完成后再返回结果。 但在有些场景下转换的步骤只能是异步完成的，例如你需要通过网络请求才能得出结果，如果采用同步的方式网络请求就会阻塞整个构建，导致构建非常缓慢。
在转换步骤是异步时，你可以这样：

```js
module.exports = function (source) {
  // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
  var callback = this.async();
  someAsyncOperation(source, function (err, result, sourceMaps, ast) {
    // 通过 callback 返回异步执行后的结果
    callback(err, result, sourceMaps, ast);
  });
};
```

### 处理二进制数据

在默认的情况下，Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串。 但有些场景下 Loader 不是处理文本文件，而是处理二进制文件，例如 file-loader，就需要 Webpack 给 Loader 传入二进制格式的数据。 为此，你需要这样编写 Loader：

```js
module.exports = function (source) {
  // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
  source instanceof Buffer === true;
  // Loader 返回的类型也可以是 Buffer 类型的
  // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
  return source;
};
// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据
module.exports.raw = true;
```

### 缓存加速

在有些情况下，有些转换操作需要大量计算非常耗时，如果每次构建都重新执行重复的转换操作，构建将会变得非常缓慢。为此，Webpack 会默认缓存所有 Loader 的处理结果，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时， 是不会重新调用对应的 Loader 去执行转换操作的。
如果想让 Webpack 不缓存该 Loader 的处理结果，可以这样：

```js
module.exports = function (source) {
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  return source;
};
```

### 其它 Loader API

除了以上提到的在 Loader 中能调用的 Webpack API 外，还存在以下常用 API：

- this.context：当前处理文件的所在目录，假如当前 Loader 处理的文件是/src/main.js，则 this.context 就等于/src。
- this.resource：当前处理文件的完整请求路径，包括 querystring，例如/src/main.js?name=1。
- this.resourcePath：当前处理文件的路径，例如/src/main.js。
- this.resourceQuery：当前处理文件的 querystring。
- this.target：等于 Webpack 配置中的 Target。
- this.loadModule：当 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时， 就可以通过 this.loadModule(request: string, callback: function(err, source, sourceMap, module))去获得 request 对应文件的处理结果。
- this.resolve：像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string))。
- this.addDependency：给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)。
- this.addContextDependency：和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)。
- this.clearDependencies：清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()。
- this.emitFile：输出一个文件，使用方法为 emitFile(name: string, content: Buffer|string, sourceMap: {...})

:::tip
对于 loader，它是一个转换器，将 A 文件进行编译形成 B 文件，这里操作的是文件，比如将 A.scss 转换为 A.css，单纯的文件转换过程

plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务
:::
