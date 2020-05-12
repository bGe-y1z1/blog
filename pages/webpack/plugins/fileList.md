# 获取打包的文件和大小

生成资源到 output 目录之前触发 FileListPlugin,根据 compilation.assets 拿到静态资源，循环静态资源将资源名称 filename 和大小写入的 content

```js
class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename;
  }
  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      let assets = compilation.assets;
      let content = `## 文件名      资源大小`;
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `- ${filename}      ${statObj.size()}\r\n`;
      });
      assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
```
