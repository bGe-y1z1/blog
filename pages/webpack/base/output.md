# output

文件输出配置

## 配置项

```js
module.exports = {
  output: {
    path: path.resolve(process.cwd(), './examples/element-ui/'), // process.cwd() 将打包后的文件放在执行命令的目录
    publicPath: '',
    filename: '[name].[hash:7].js', // 打包成7位的hash
    chunkFilename: '[name].[hash:7].js', // 分包生成
  },
};
```

#### filename: 控制输出资源的文件名

:::tip

- bundle.js: 设置为固定的文件名
- [name].js: entry 设置为对象的 key 值
- [hash].js: 当前打包的所有资源的 hash
- [chunkhash].js: 当前 chunk 内容的 hash
- [id]: 当前 chunk 的 ID
- [query]: filename 配置项中的 query

:::

:::danger
开发环境不必要设置 chunkhash，强烈推荐生产环境配置 chunkhash，目的是控制客户端缓存。
:::

#### path

指定资源输出的位置，必须为绝对路径（默认为 dist 目录）
`path: path.resolve(process.cwd(), './examples/element-ui/'), // process.cwd() 将打包后的文件放在执行命`
:::danger
Webpack-dev-server 也有 publicPath 参数，请设置该参数和 webpack 的 path 路径相同。
:::

#### publicPath

由 JS 或 CSS 内部请求的间接资源（异步加载的 CSS，CSS 请求图片、字体等）的请求位置

:::tip
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）

publicPath: "//cdn.example.com/assets/", // CDN (协议相同)

publicPath: "/assets/", // 相对于服务(server-relative)

publicPath: "assets/", // 相对于 HTML 页面

publicPath: "../assets/", // 相对于 HTML 页面

publicPath: "", // 相对于 HTML 页面（目录相同）

:::

#### chunkfilename

不在 output.entry 中的文件，但是需要单独打包的文件名。（设置使用 require.ensure 或者 import 异步加载模块打包后的名称）
