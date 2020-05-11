# 原理

webpack 的运行环境是 node,通过 Compiler 类来读取配置文件,根据 babylon 等插件和入口文件生成依赖树在将数据渲染成模版,最后写入到输出文件,loader 解析在读取文件的时候获取 rules 匹配 test 和 use，并执行 loader，plugins 根据 webpack 的生命周期钩子处理

## 执行文件 bin/webpack

> 执行的环境 #！/usr/bin/env node

```js
// 需要找到当前执行的路径 拿到 webpack,config.js

let path = require('path');
// 配置文件
let config = require(path.resolve('webpack,config.js'));

// 解析配置文件
let Compiler = require('../lib/Compiler.js');
let compiler = new Compiler(config);
// webpack 生命周期钩子
compiler.hooks.entryOption.call();

// 执行标示
compiler.run();
```

## Compiler 类

> let babylon = require('babylon') 把源码转换 ast
> let t = require('@babel/types')
> let traverse = require('@babel/traverse')
> let generator = require('@babel/generator')

```js
class Compiler {
  constructor(config) {
    this.config = config; // 配置信息
    this.entryId; // 入口文件 id
    this.modules = {}; // 模块依赖
    this.entry = config.entry; // 入口文件
    this.root = process.cwd(); // 跟目录
    // webpack 生命周期钩子
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPulgins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };

    // 如果有plugins参数
    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPulgins.call();
  }

  // 获取源码
  getSource(modulePath) {
    // 解析 rules
    let rules = this.config.module.rules;
    let content = fs.readFileSync(modulePath, 'utf-8');
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modelePath)) {
        function normalLoader() {
          let laoder = require(use[len--]);
          if (len >= 0) {
            content = laoder(content);
          }
        }
        normalLoader();
      }
    }
    return content;
  }

  // 解析语法树
  parse(source, parentPath) {
    let ast = babylon.parse(source);
    let dependencies = []; // 依赖的数组
    traverse(ast, {
      callExpression(p) {
        // 解析 require()
        let node = p.node;
        if (node.callee.name === 'require') {
          node.callee.name = '**webpack_require**';
          let moduleName = node.arguments[0].value; // 取到的就是模块的应用名
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          moduleName = './' + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies };
  }

  //
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath);

    // 模块 id modulePath = modulePath - thid.root
    let moduleName = `./ ${path.relative(this.root, modulePath)}`;
    if (isEntry) {
      this.entryId = moduleName;
    }
    // 解析源码 返回一个依赖列表
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );

    // 把相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode;
    // 父模块的加载 递归
    dependencies.forEach((dep) => {
      this.buildModule(path.join(this.root, dep), false);
    });
  }
  // 发射文件
  emitFile() {
    // 用数据 渲染
    // 拿到输入目录
    let main = path.join(this.config.output.path, this.config.output.filename);
    // 模版的路径
    let templateStr = this.getSource(path.join(diename, 'main.ejs'));
    // 采用 ejs 模版渲染
    let code = ejs.render(templateStr, { entryId: this.entryId, modules });
    this.assets = {};
    // 资源中 路径对应的代码
    this.assets = code;
    fs.writeFileSync(main, this.assets[mian]);
  }
  // 执行
  run() {
    this.hooks.run.call();
    // 编译时
    this.hooks.compile.call();
    // 执行 创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);
    // 编译完成
    this.hooks.afterCompile.call();
    // 发射打包文件
    this.emitFile();
    // 发射完
    this.hooks.emit.call();
    // 结束
    this.hooks.done.call();
  }
}
```

## loader

## plugins

```js
let { SyncHook } = require('tapable');

this.hooks = {
  entryOption: new SyncHook(),
  compile: new SyncHook(),
  afterCompile: new SyncHook(),
  afterPulgins: new SyncHook(),
  run: new SyncHook(),
  emit: new SyncHook(),
  done: new SyncHook(),
};

// 如果有plugins参数
let plugins = this.config.plugins;
if (Array.isArray(plugins)) {
  plugins.forEach((plugin) => {
    plugin.apply(this);
  });
}
```
