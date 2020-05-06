# 模块解析 resolve

配置模块如何解析

## alias

创建 import 或 require 的别名，来确保模块引入变得简单、例如，一些位于 src/ 文件夹下的常用模块：

```js

// 设置
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}

// 使用
import Utility from 'Utilities/utility';
```

也可以在给定对象的键后的末尾添加 \$，以表示精准匹配：

## extensions

自动解析确定的扩展。默认值为：

> extensions: [".js", ".json"]

```js

    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
```

## modules

告诉 webpack 解析模块时应该搜索的目录。

```js
modules: [path.resolve(__dirname, 'src'), 'node_modules'];
```

# resolveLoader

这组选项与上面的 resolve 对象的属性集合相同，但仅用于解析 webpack 的 loader 包
