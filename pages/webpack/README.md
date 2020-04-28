# webpack

## webpack

webpack 是一个现代 javascript 应用程序的模块打包器

以 CommonJS 来编写，但也支持 AMD、CMD 模块（对于新项目，推荐直接使用 CommonJS）；
串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对 typescript ES6 的支持；
可以根据配置或者智能分析打包成多个文件，实现公共模块或者按需加载；
支持对 CSS，图片等资源进行打包，这样子就不用使用 Grunt 或 Gulp(browserify 只能打包 JS 文件)；
开发时在内存中完成打包，性能更快，完全可以支持开发过程的实时打包需求；
对 source map 有很好的支持。

![nodeJS](/webpack/webpack.webp)

#### webpack 的两大特点

- 模块化
- 打包

::: tip

作用

- 将 sass/less 等预编译的 css 语言转换成浏览器识别的 css 文件
- 能够将多个预编译文件打包成一个文件
- 打包 image/styles/assets/scrips/等前端常用的文件
- 搭建开发环境开启服务器
- 监视文件改动，热部署。
- 将单文件组件(\*.vue)类型的文件，转化成浏览器识别的内容

:::
