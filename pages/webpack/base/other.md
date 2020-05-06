# 其他配置项

## context

context 是 webpack entry 的上下文，是入口文件所处的目录的绝对路径。默认使用当前目录

```js
context: path.resolve(__dirname, 'app');
```

:::danger
在 html-webpack-plugin 中，模板文件的路径也是相对于 context 的
:::

## devtool

控制是否生成，以及如何生成 source map，用于调试

可选参数项
::: tip
eval： 生成代码 每个模块都被 eval 执行，并且存在@sourceURL
cheap-eval-source-map： 转换代码（行内） 每个模块被 eval 执行，并且 sourcemap 作为 eval 的一个 dataurl

cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能

eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能

cheap-source-map： 转换代码（行内） 生成的 sourcemap 没有列映射，从 loaders 生成的 sourcemap 没有被使用

cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从 loader 中进行映射

source-map： 原始代码 最好的 sourcemap 质量有完整的结果，但是会很慢

:::

看似配置项很多， 其实只是五个关键字 eval，source-map，cheap，module，inline 的任意组合。这五个关键字每一项都代表一个特性， 这四种特性可以任意组合

- eval： 使用 eval 包裹模块代码
- source-map： 产生.map 文件
- cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含 loader 的 sourcemap
- module： 包含 loader 的 sourcemap（比如 jsx to js ，babel 的 sourcemap）
- inline： 将.map 作为 DataURI 嵌入，不单独生成.map 文件（这个配置项比较少见）

开发环境

eval, eval-source-map, cheap-eval-source-map, cheap-module-eval-source-map, cheap-module-source-map

生产环境

source-map hidden-source-map nosources-source-map

## targets

告知 webpack 为目标(target)指定一个环境。

## performance

配置如何展示性能提示

```js
performance: {
  hints: false; // false 关闭  warning 警告  error 错误
}
```

## watch

启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。

> watch: false
> webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。

```js
watchOptions: {
  aggregateTimeout: 300, // 默认值 文件修改重新构建的延迟时间
  poll: 1000, // 轮询检测时间 每秒检查一次变动

}
```

对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules：

> ignored: /node\*modules/
> ignored: "files/\*\*/\_.js"

## externals

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

从 CDN 引入 jQuery，而不是把它打包：

```js
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"
></script>
```

webpack.config.js

```js
externals: {
  jquery: 'jQuery';
}
```

文件中使用

```js
import $ from 'jquery';

$('.my-element').animate(...);
```

不会被打包，减少打包文件的大小,不影响项目中的 import 的使用。

## node

这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。

此功能由 webpack 内部的 NodeStuffPlugin 插件提供。如果 target 是 "web"（默认）或 "webworker"，那么 NodeSourcePlugin 插件也会被激活。

是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一……

- true：提供 polyfill。
- "mock"：提供 mock 实现预期接口，但功能很少或没有。
- "empty"：提供空对象。
- false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 ReferenceError 而崩溃。尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。

vue-cli 的配置

```js
node: {
        setImmediate: false,
        process: 'mock',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
```

## stats

如果你不希望使用 quiet 或 noInfo 这样的不显示信息，而是又不想得到全部的信息，只是想要获取某部分 bundle 的信息，使用 stats 选项是比较好的折衷方式。

> 对于 webpack-dev-server，这个属性要放在 devServer 对象里。
> 在使用 Node.js API 时，此选项无效。

更加精细的控制

```js
stats: {

  // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
  all: undefined,

  // 添加资源信息
  assets: true,

  // 对资源按指定的字段进行排序
  // 你可以使用 `!field` 来反转排序。
  assetsSort: "field",

  // 添加构建日期和构建时间信息
  builtAt: true,

  // 添加缓存（但未构建）模块的信息
  cached: true,

  // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
  cachedAssets: true,

  // 添加 children 信息
  children: true,

  // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
  chunks: true,

  // 将构建模块信息添加到 chunk 信息
  chunkModules: true,

  // 添加 chunk 和 chunk merge 来源的信息
  chunkOrigins: true,

  // 按指定的字段，对 chunk 进行排序
  // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
  chunksSort: "field",

  // 用于缩短 request 的上下文目录
  context: "../src/",

  // `webpack --colors` 等同于
  colors: false,

  // 显示每个模块到入口起点的距离(distance)
  depth: false,

  // 通过对应的 bundle 显示入口起点
  entrypoints: false,

  // 添加 --env information
  env: false,

  // 添加错误信息
  errors: true,

  // 添加错误的详细信息（就像解析日志一样）
  errorDetails: true,

  // 将资源显示在 stats 中的情况排除
  // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
  // 并返回一个布尔值或如下所述的数组。
  excludeAssets: "filter" | /filter/ | (assetName) => ... return true|false |
    ["filter"] | [/filter/] | [(assetName) => ... return true|false],

  // 将模块显示在 stats 中的情况排除
  // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
  // 并返回一个布尔值或如下所述的数组。
  excludeModules: "filter" | /filter/ | (moduleSource) => ... return true|false |
    ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],

  // 和 excludeModules 相同
  exclude: "filter" | /filter/ | (moduleSource) => ... return true|false |
    ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],

  // 添加 compilation 的哈希值
  hash: true,

  // 设置要显示的模块的最大数量
  maxModules: 15,

  // 添加构建模块信息
  modules: true,

  // 按指定的字段，对模块进行排序
  // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
  modulesSort: "field",

  // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
  moduleTrace: true,

  // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
  performance: true,

  // 显示模块的导出
  providedExports: false,

  // 添加 public path 的信息
  publicPath: true,

  // 添加模块被引入的原因
  reasons: true,

  // 添加模块的源码
  source: true,

  // 添加时间信息
  timings: true,

  // 显示哪个模块导出被用到
  usedExports: false,

  // 添加 webpack 版本信息
  version: true,

  // 添加警告
  warnings: true,

  // 过滤警告显示（从 webpack 2.4.0 开始），
  // 可以是 String, Regexp, 一个获取 warning 的函数
  // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
  warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
};
```
