# bable-loader 解析

由@babel/core 转化源代码，通过 loader-utilsloader-utils 来获取 option 参数，之后异步返回转化后的源码和 sourcemap 代码

```js
// babel 转化器 transform
let babel = require('bable/core');
// 获取option的工具 getOptions
let loaderUtils = require('loader-utils');
// loader的执行方法
function loader(source) {
  // 获取参数
  let options = loaderUtils.getOptions(this);
  // 异步返回函数
  let cb = this.async;
  babel.transrorm(
    source,
    {
      ...options,
      sourceMap: true,
      filename: this.resourcePath.split('/').pop, // 文件名称
    },
    function (err, result) {
      cb(err, result.code, result.map); // 异步
    }
  );
}

module.exports = laoder;
```
