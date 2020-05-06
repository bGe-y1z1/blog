# 打包模式 mode

webpack 的 mode 配置用于提供模式配置选项告诉 webpack 相应地使用其内置的优化，mode 有以下三个可选值

- development
- production
- none

默认为 production

#### 配置

1. 直接写在 webpack.config.js 配置中

```js
module.exports = {
  mode: 'production',
};
```

2. 作为 webpack 执行的参数
   :::tip
   webpack --mode=production
   :::
   通过上面的配置，我们就可以在业务代码中通过 process.env.NODE_ENV 拿到环境变量值，这里的 process.env.NODE_ENV 要跟 node 的区分，这句等同于

```js
new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
```

#### 使用

在 package.json 中配置

```js
{
 "scripts": {
    "dev": "webpack-dev-server --mode=development --devtool inline-source-map --hot",
    "build":"webpack --mode=production",
  },
}
```

#### 不同模式的区别

production 生产环境模式，会开启一下配置
::: tip

- FlagDependencyUsagePlugin: 编译时标记依赖

- FlagIncludedChunksPlugin:标记子 chunks，防子 chunks 多次加载

- ModuleConcatenationPlugin:作用域提升(scope hosting),预编译功能,提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度

- NoEmitOnErrorsPlugin:在输出阶段时，遇到编译错误跳过

- OccurrenceOrderPlugin:给经常使用的 ids 更短的值

- SideEffectsFlagPlugin:识别 package.json 或者 module.rules 的 sideEffects 标志（纯的 ES2015 模块)，安全地删除未用到的 export 导出

- UglifyJsPlugin:删除未引用代码，并压缩
  :::

development 开发环境模式，会开启一下配置
::: tip

- NamedChunksPlugin: 把 chunk id 变为一个字符串标识符。

- NamedModulesPlugin:当开启 HMR 的时候使用该插件会显示模块的相对路径

  :::
