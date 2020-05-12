# url-loader 解析

通过 loader-utilsloader-utils 来获取 option 参数，之后根据参数设置处理 source 在返回

```js
// 获取option的工具 getOptions
let loaderUtils = require('loader-utils');
// loader的执行方法
function loader(source) {
  // 获取参数
  let { limit } = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    return `module.exports = "data:${mime.getType(
      this.resourcePath
    )};base64, ${source.toString('base64')}"`;
  } else {
    return require('./file-loader').call(this, source);
  }
}
loader.raw = true;
module.exports = laoder;
```
