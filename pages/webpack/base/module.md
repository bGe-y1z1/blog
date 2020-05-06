# 模块配置

## noParse

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

```js
noParse: /jquery|lodash/

// 从 webpack 3.0.0 开始
noParse: function(content) {
  return /jquery|lodash/.test(content);
}
```

## rules

规则数组，当规则匹配时使用
创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

#### enforce

可能的值有："pre" | "post"
提升权重，所有 loader 通过 前置, 行内, 普通, 后置 排序，并按此顺序使用。

#### exclude

排除配置的文件

#### include

针对配置项打包

#### test

Rule.test 是 Rule.resource.test 的简写。如果你提供了一个 Rule.test 选项，就不能再提供 Rule.resource

#### use

使用哪些 loader

#### options

Rule.options 和 Rule.query 是 Rule.use: [ { options } ] 的简写

#### parser

解析选项对象。所有应用的解析选项都将合并。

```js
parser: {
  amd: false, // 禁用 AMD
  commonjs: false, // 禁用 CommonJS
  system: false, // 禁用 SystemJS
  harmony: false, // 禁用 ES2015 Harmony import/export
  requireInclude: false, // 禁用 require.include
  requireEnsure: false, // 禁用 require.ensure
  requireContext: false, // 禁用 require.context
  browserify: false, // 禁用特殊处理的 browserify bundle
  requireJs: false, // 禁用 requirejs.*
  node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
  node: {...} // 在模块级别(module level)上重新配置 node 层(layer)
}
```
