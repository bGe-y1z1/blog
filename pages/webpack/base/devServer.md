# 本地 server

启动本地服务

```js
devServer: {
  historyApiFallback: true, // 当使用html5 history api,将会在响应404时返回index.html
  quiet: false, //控制台中不输出打包的信息
  noInfo: false,
  inline: true, //开启页面自动刷新
  lazy: false, //不启动懒加载
  progress: true, //显示打包的进度
  contentBase: path.join(__dirname, "dist"),//对外提供的访问内容的路径
  compress: true, //是否启用gzip压缩
  port: 9000, //提供访问的端口
  hot: true, // 启用webpack的Hot Module Replacement特性。
  proxy: {
    "/api": {
      target: "http://localhost:3000", // 代理路径
      pathRewrite: {"^/api" : ""} // 重写路径
    }
  }
  setup(app){
    app.get('/some/path', function(req, res) {
      res.json({ custom: 'response' });
    }); // 为某个路径添加自定义处理
  }
}
```
