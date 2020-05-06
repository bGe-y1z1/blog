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

:::tip
对于 loader，它是一个转换器，将 A 文件进行编译形成 B 文件，这里操作的是文件，比如将 A.scss 转换为 A.css，单纯的文件转换过程

plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务
:::
