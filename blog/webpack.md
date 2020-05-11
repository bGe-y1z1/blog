# webpack4

webpack4 的构建 [demo](https://github.com/bGe-y1z1/webpack4)

安装 webpack webpack-cli

> yarn add webpack webpack-cli -D

创建配置文件

> mkdir webpack.config.js

配置入口和出口

```js
// webpack.config.js
const path = require('path');

const webpackConfig = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:7].js', // 打包成7位的hash
    publicPath: '', // 项目的跟目录可以配置cdn链接
    chunkFilename: '[name].js', // 单独打包的文件 分包
  },
};
module.exports = webpackConfig;
```

配置脚本命令

```js
// package.js 中添加
"scripts": {
    "dev": "webpack"
  },
```

执行

> yarn run dev

控制台会有警告需要设置 mode 打包模式，添加 mode

```js
// webpack.config.js
const path = require('path');

const webpackConfig = {
  mode: 'development', // 也可以在脚本命令处配置 mode=development
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:7].js', // 打包成7位的hash
    publicPath: '', // 项目的跟目录可以配置cdn链接
    chunkFilename: '[name].js', // 单独打包的文件 分包
  },
};
module.exports = webpackConfig;
```

配置入口问价和依赖
安装 vue 和 vue-router

> yarn add vue vue-router -D

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```

设置模块解析方式 resolve

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 解析文件顺序
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }, // 设置文件别名
   // modules: [''], // 设置模块搜索的目录
  },
```

配置模块

解析 .vue 文件 需要安装 vue-loader vue-template-compiler

> yarn add vue-loader vue-template-compiler -D

配置 module

```js
module: {
    rules: [
      {
        test: /\.vue$/, // 匹配.vue结尾的文件
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
    ],
  },
```

配置 plugins

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
 plugins: [new VueLoaderPlugin()],
```

解析 stylus css 预处理器
安装插件 stylus stylus-loader css-loader vue-style-loader

> yarn add stylus stylus-loader css-loader vue-style-loader -D

```js
module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },

```

配置 html 主页面

安装插件 html-webpack-plugin

> yarn add html-webpack-plugin -D

```js
const htmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
```

配置本地服务 webpack-dev-server
安装 webpack-dev-server

> yarn add webpack-dev-server -D

```js
devServer: {
    // 代理服务
    host: '127.0.0.1',
    port: 8085,
    // publicPath: '/',
    hot: true, // 开启热更新
  },
```

修改脚本命令

```js
// package.js 中添加
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  },
```

执行 yarn run dev 在浏览器打开http://127.0.0.1:8085/

区分生产和开发 配置环境变量 NODE_ENV
安装 cross-env 它是运行跨平台设置和使用环境变量的脚本
重新配置启动命令

```js
"scripts": {
    "dev": "cross-env NODE_ENV=dev webpack-dev-server",
    "build": "cross-env NODE_ENV=prod  webpack"
  },
```

创建 开发配置文件
mkdir build/webpack.config.dev.js
创建 生产配置文件
mkdir build/webpack.config.prod.js
创建 公用配置文件
mkdir build/webpack.config.common.js

修改 webpack.config.js

```js
// 获取环境命令，并去除首尾空格
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/gi, '');
// 根据环境变量引用相关的配置文件
module.exports = require(`./build/webpack.config.${env}.js`);
```

配置 js babel
安装 babel-loader @babel/core

> yarn add babel-loader @babel/core -D

```js
 module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
```

配置.babelrc 文件
安装 @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime

```js
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
}

```

设置调试模式 devtool: '#eval-source-map',

配置 sass

> yarn add sass-loader node-sass -D

```js
module.exports = {
  module: {
    rules: [
      // ... 忽略其它规则

      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              // sass-loader version >= 8
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
  // 插件忽略
};
```

配置 less

> yarn add less less-loader -D

```js
{
  test: /\.less$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'less-loader'
  ]
}
```

配置 PostCSS

> yarn add postcss-loader -D

```js
{
  test: /\.css$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    'postcss-loader'
  ]
}
```

配置 TypeScript

> yarn add typescript ts-loader -D

```js
module.exports = {
  resolve: {
    // 将 `.ts` 添加为一个可解析的扩展名。
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      // ... 忽略其它规则
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
    ],
  },
  // ...plugin omitted
};
```

配置 Pug

> yarn add pug pug-plain-loader -D

```js
{
  test: /\.pug$/,
  oneOf: [
    // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
    {
      resourceQuery: /^\?vue/,
      use: ['pug-plain-loader']
    },
    // 这条规则应用到 JavaScript 内的 pug 导入
    {
      use: ['raw-loader', 'pug-plain-loader']
    }
  ]
}
```

配置插件

配置分析插件 SpeedMeasurePlugin

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
  ...
});
```

优化项配置

配置缓存 cache-loader thread-loader

```js
{
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(), // 运行的目录
        exclude: /node_modules/,
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
      },
```

配置 optimization

```js
/**
     * 优化项
     */
    optimization: {
      /**
       * 分割代码块，如果只有一个入口，就不需要分割了，只有多页，才需要把公共的抽离出来
       * @param cacheGroups 缓存组
       * @param vendors 第三方库
       * @param common 公共的模块
       * @param priority 添加权重
       * @param minChunks 重复2次使用的时候需要抽离出来
       *
       */
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /node_modules/,
            priority: 1,
            chunks: 'initial', // 刚开始就要抽离
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          cache: true,
          parallel: true,
          extractComments: false,
        }),
        new OptimizeCssnanoPlugin({}),
      ],
    },

```
