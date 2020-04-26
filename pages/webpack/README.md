# webpack

webpack是一个现代javascript应用程序的模块打包器

![nodeJS](/webpack/webpack.webp)

## webpack的两大特点
  模块化和打包

以CommonJS来编写，但也支持AMD、CMD模块（对于新项目，推荐直接使用CommonJS）；
串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持；
可以根据配置或者智能分析打包成多个文件，实现公共模块或者按需加载；
支持对CSS，图片等资源进行打包，这样子就不用使用Grunt或Gulp(browserify只能打包JS文件)；
开发时在内存中完成打包，性能更快，完全可以支持开发过程的实时打包需求；
对source map有很好的支持。

#### 模块化
  webpack会把一切视为模块，模块化的文件非常灵活利于调试和升级，webpack让人感觉有种工程化的感觉
#### 打包
  
