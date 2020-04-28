# entry

#### 单个文件简写语法

:::tip
用法: entry: string|Array
:::

```js
module.exports = {
  entry: {
    index: './src/index.js', // 入口文件
  },
};
```

```js
module.exports = {
  entry: ['./src/index.js', 'lodash'],
};
```

:::tip
当你向 entry 传入一个数组时会发生什么？向 entry 属性传入「文件路径(file path)数组」将创建“多个主入口。在你想要多个依赖文件一起注入，并且将它们的依赖导向到一个“chunk”时，传入数组的方式就很有用。
:::

#### 对象语法

:::tip
用法: entry: {[entryChunkName: string]: string|Array}
:::

```js
module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js',
  },
};
```

对象语法会比较繁琐。然而，这是应用程序中定义入口是最可扩展的方式。
:::tip
场景：

- 分离 应用程序(app) 和 第三方库(vendor) 入口 （为了支持提供更佳 vendor 分离能力的 DllPlugin，考虑移除该场景。）
- 多页配置 （同时 plugins 需要加上一个新的 HtmlWebpackPlugi）
  :::

#### 函数语法

```js
module.exports = {
        entry: () => './src/index.js'
}

module.exports = {
        entry: () => ({
                // 添加一些动态逻辑获取工程的入口
                if (boolean) {
                        return './src/index.js'
                } else {
                        return './src/main.jss'
                }
                // 或者
                // 返回一个Promise对象进行异步操作
                return new Promise(resolve => resolve('./src/index.js'));
        })
}
```

::: danger
Webpack 默认，bundle.js 文件大于 250KB（压缩前）会认为文件过大，会发生警告。

通过多入口将 vendor（包含库，框架等第三方不常用模块打包产生的 bundle）打包，提升效率

配置多页应用，减少资源体积。
:::
