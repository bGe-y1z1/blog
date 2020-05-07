# 优化项

## noParse

> 不去解析属性值代表的库的依赖

```js
noParse:/jquery/,//不去解析jquery中的依赖库
```

## ignorePlugin

> 忽略第三方包指定目录，让这些指定目录不要被打包进去

> 该插件能够使得指定目录被忽略，从而使得打包变快，文件变小

```js
let Webpack = require('webpack');
plugins: [
  new Webpack.IgnorePlugin(/\.\/locale/, /moment/), // moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
];
```

:::tip
// 手动引入所需要的语言包
import 'moment/locale/zh-cn';
:::

## DllPlugin && DllReferencePlugin

> 我们在打包一个 react 的项目的时候，会把 react 和 react-dom 这两个库打包起来。而这两个库很大且基本不会变，所以如果每次打包都要打包这两个第三方包的话，浪费时间，消耗性能。所以，我们一般会采取如下操作：

> 将 react 和 react-dom 单独打包好，然后动态链接引入即可。如果第二次打包，那么发现 react 和 react-dom 已经被打包好了，那么就不需要再打包了，这样就大大提升了性能。

:::tip
DllReferencePlugin 和 DLL 插件 DllPlugin 都是在*另外*的 webpack 设置中使用的。
:::

### DllPlugin

> 这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的。

```js
new webpack.DllPlugin({
  context: __dirname, // (optional): manifest 文件中请求的上下文(context)(默认值为 webpack 的上下文(context))
  name: '[name]_[hash]', // 暴露出的 DLL 的函数名 (TemplatePaths: [hash] & [name] )
  path: path.join(__dirname, 'manifest.json'), // manifest json 文件的绝对路径 (输出文件)
});
```

### DllReferencePlugin

> 这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。

```js
new webpack.DllReferencePlugin({
  context: __dirname, // (绝对路径) manifest (或者是内容属性)中请求的上下文
  manifest: require('./manifest.json'), // 包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
  name: './my-dll.js', // dll 暴露的地方的名称 (默认值为 manifest.name)
  scope: 'dll', // dll 中内容的前缀
  sourceType: 'commonjs2', // dll 是如何暴露的 (libraryTarget)
});
```

## happypack

> 实现 js 和 css 多线程打包

```js
let HappyPack = require('happypack');

module.exports = {
   module:{
       rules:[
           {
               test:/\.js$/,
               use:'HappyPack/loader?id=js'//这个id=js就代表这是打包js的
           },
           {
               test:/\.css$/,
               use:'HappyPack/loader?id=css'//这个id=css就代表这是打包css的
           }
       ]
   },
   plugins:[
       new HappyPack({这个id:js就代表这是打包js的
           id:'css',//
           use:['style-loader','css-loader']
       }),
       new HappyPack({这个id:js就代表这是打包js的
           id:'js',//
           use:[{//use是一个数组，这里写原先在rules的use里的loader配置
               loader:'babel-loader',
               options:{
                   presets:[
                       '@babel/presets-env',
                       '@babel/presets-react'
                   ]
               }
           }]
       })
   ]
}
```

## webpack 自带优化

### Tree-Shaking

> 在生产环境下
> 使用 import 引入(不是 require)
> 会自动去除没用的代码

:::tip
import 在生产环境下，支持 tree-shaking，require 不支持 tree-shaking
:::

### Scope-Hosting

> 在生产环境下，
> 提升作用域

```js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log(d);
```

> webpack 在生产环境下打包的时候，会直接将 d 打包成 a+b+c 的结果，即 d 直接打包成 6.这样就无需声明多个变量再去相加。
> webpack 在生产环境下会自动省略不必要的代码。

## 抽离公共代码

> 使用 optimization 的 splitChunks 属性

```js
module.exports = {
  optimization: {
    splitChunks: {
      //分割代码块，如果只有一个入口，就不需要分割了，只有多页，才需要把公共的抽离出来
      cacheGroups: {
        //缓存组
        common: {
          //公共的模块
          chunks: 'initial', //刚开始就要抽离
          minSize: 0, //大小大于0字节的时候需要抽离出来
          minChunks: 2, //重复2次使用的时候需要抽离出来
        },
        vendor: {
          priority: 1, //添加权重 将权重提高，使得先去抽离第三方库，再去抽离公用js
          test: /node_modules/, //把这个目录下符合下面几个条件的库抽离出来
          chunks: 'initial', //刚开始就要抽离
          minSize: 0, //大小大于0字节的时候需要抽离出来
          minChunks: 2, //重复2次使用的时候需要抽离出来
        },
      },
    },
  },
};
```

## 懒加载

> 在这里的懒加载，其实就是按需加载（动态加载）。需要对 webpack 进行相关配置。

> 1.案例情景：

> 当我点击按钮的时候，需要动态去加载 resource.js，并读取该文件导出的内容

```js
//index.js
/*在页面上有一个按钮，点击按钮去加载资源resource.js*/
let button = document.createElement('button');

button.innerHTML = '点击';

button.addEventListener('click', function () {
  console.log('click');
  //es6草案中的语法,利用jsonp实现动态加载文件
  //直接使用不支持，需要利用语法动态导入的插件@babel/plugin-syntax-dynamic-import
  //vue的懒加载  react的懒加载都是这个原理，打包的时候会打包好resource.js文件，然后按需去动态加载
  import('./resource.js').then((data) => {
    console.log(data.default); //数据是放在data的default属性里的
  });
});

document.body.appendChild(button);

//resource.js
export default 'resource';
```

> 2.在上述代码中，直接使用 import()去动态加载资源，是 es6 草案中语法，并不是正式语法，所以直接使用会报错，需要配置相关的语法动态导入的插件@babel/plugin-syntax-dynamic-import，并在 webpack 中做简单配置:

```js
module.exports = {
 ...
 module:{
  rules:[
   {
    test:/\.js$/,
    use:{
     loader:'babel-loader',
     options:{
      presets:[
       '@babel/preset-env',
       '@babel/preset-react'
      ],
      plugins:[
       '@babel/plugin-syntax-dynamic-import'
      ]
     }
    }
   }
  ]
 },
}
```

> 3.配置完后，import()动态加载返回的是一个 promise，得到的数据是存在.then 的回调函数的 data.default 属性中的。

## 热更新

> 所谓的热更新指的是对数据变化的局部进行更新，而不进行页面刷新。

### 热更新配置

> 在 devServer 中开启 hot 配置为 true
> 添加两个 webpack 的内置插件，分别为 new webpack.NamedModulesPlugin()和 new webpack.HotModuleReplacementPlugin(),前者用于打印更新的模块路径，告诉我们哪个模块热更新了；后者是热更新插件。

```js
let path = require('path');
 let webpack = require('webpack');
 let HtmlWebpackPlugin = require('html-webpack-plugin');
 module.exports = {
  devServer:{
   port:3001,
   open:true,
   contentBase:'./dist',
   hot:true,//启用热更新
  },
  ...
  plugins:[
   new webpack.NamedModulesPlugin(),//打印更新的模块路径，告诉我们哪个模块热更新了
   new webpack.HotModuleReplacementPlugin(),//热更新插件
   new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename:'index.html'
   })
  ]
 }
```

> 这个时候，其实还不会热更新。需要在 index.js 里做一个是否进行热更新的判断

```js
import str from './resource.js';
console.log(str);

if (module.hot) {
  //是否热更新
  module.hot.accept('./resource.js', () => {
    //如果'./resource.js'热更新了，那么在热更新完成之后可以在回调函数里做一些事情
    console.log('文件更新了');
    let str = require('./resource.js'); //不能使用import，因为import只能写在页面顶端
    console.log(str.default);
  });
}
```
