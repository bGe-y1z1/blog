# plugin

在 webpack 运行的生命周期中会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。

Webpack 通过 Plugin 机制让其更加灵活，以适应各种应用场景。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
一个最基础的 Plugin 的代码是这样的：

```js
class BasicPlugin {
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {}

  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    compiler.plugin('compilation', function (compilation) {});
  }
}
// 导出 Plugin
module.exports = BasicPlugin;
```

使用这个 plugin 是 要这样配置

```js
const BasicPlugin = require('./BasicPlugin.js');
module.export = {
  plugins: [new BasicPlugin(options)],
};
```

Webpack 启动后，在读取配置的过程中会先执行 new BasicPlugin(options)初始化一个 BasicPlugin 获得其实例。 在初始化 compiler 对象后，再调用 basicPlugin.apply(compiler)给插件实例传入 compiler 对象。 插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称, 回调函数)监听到 Webpack 广播出来的事件。 并且可以通过 compiler 对象去操作 Webpack。

### Compiler 和 Compilation

在开发 Plugin 时最常用的两个对象就是 Compiler 和 Compilation，它们是 Plugin 和 Webpack 之间的桥梁。Compiler 和 Compilation 的含义如下：

Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

### 事件流

Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。
Webpack 通过 Tapable 来组织这条复杂的生产线。 Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 Webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。
Webpack 的事件流机制应用了观察者模式，和 Node.js 中的 EventEmitter 非常相似。Compiler 和 Compilation 都继承自 Tapable，可以直接在 Compiler 和 Compilation 对象上广播和监听事件，方法如下

```js
/**
 * 广播出事件
 * event-name 为事件名称，注意不要和现有的事件重名
 * params 为附带的参数
 */
compiler.apply('event-name', params);

/**
 * 监听名称为 event-name 的事件，当 event-name 事件发生时，函数就会被执行。
 * 同时函数中的 params 参数为广播事件时附带的参数。
 */
compiler.plugin('event-name', function (params) {});
```

同理，compilation.apply 和 compilation.plugin 使用方法和上面一致。
在开发插件时，你可能会不知道该如何下手，因为你不知道该监听哪个事件才能完成任务。
在开发插件时，还需要注意以下两点：

只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件，所以在新开发的插件中也能广播出事件，给其它插件监听使用。
传给每个插件的 Compiler 和 Compilation 对象都是同一个引用。也就是说在一个插件中修改了 Compiler 或 Compilation 对象上的属性，会影响到后面的插件。
有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知 Webpack，才会进入下一处理流程。例如：

```js
compiler.plugin('emit', function (compilation, callback) {
  // 支持处理逻辑
  // 处理完毕后执行 callback 以通知 Webpack
  // 如果不执行 callback，运行流程将会一直卡在这不往下执行
  callback();
});
```

### 常用 API

插件可以用来修改输出文件、增加输出文件、甚至可以提升 Webpack 性能、等等，总之插件通过调用 Webpack 提供的 API 能完成很多事情。 由于 Webpack 提供的 API 非常多，有很多 API 很少用的上，又加上篇幅有限，下面来介绍一些常用的 API。

读取输出资源、代码块、模块及其依赖
有些插件可能需要读取 Webpack 的处理结果，例如输出资源、代码块、模块及其依赖，以便做下一步处理。
在 emit 事件发生时，代表源文件的转换和组装已经完成，在这里可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容。 插件代码如下：

```js
class Plugin {
  apply(compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      // compilation.chunks 存放所有代码块，是一个数组
      compilation.chunks.forEach(function (chunk) {
        // chunk 代表一个代码块
        // 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块
        chunk.forEachModule(function (module) {
          // module 代表一个模块
          // module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组
          module.fileDependencies.forEach(function (filepath) {});
        });

        // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
        // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
        // 该 Chunk 就会生成 .js 和 .css 两个文件
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容
          let source = compilation.assets[filename].source();
        });
      });

      // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
      // 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
      callback();
    });
  }
}
```

### 监听文件变化

Webpack 会从配置的入口模块出发，依次找出所有的依赖模块，当入口模块或者其依赖的模块发生变化时， 就会触发一次新的 Compilation。
在开发插件时经常需要知道是哪个文件发生变化导致了新的 Compilation，为此可以使用如下代码：

```js
// 当依赖的文件发生变化时会触发 watch-run 事件
compiler.plugin('watch-run', (watching, callback) => {
  // 获取发生变化的文件列表
  const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
  // changedFiles 格式为键值对，键为发生变化的文件路径。
  if (changedFiles[filePath] !== undefined) {
    // filePath 对应的文件发生了变化
  }
  callback();
});
```

默认情况下 Webpack 只会监视入口和其依赖的模块是否发生变化，在有些情况下项目可能需要引入新的文件，例如引入一个 HTML 文件。 由于 JavaScript 文件不会去导入 HTML 文件，Webpack 就不会监听 HTML 文件的变化，编辑 HTML 文件时就不会重新触发新的 Compilation。 为了监听 HTML 文件的变化，我们需要把 HTML 文件加入到依赖列表中，为此可以使用如下代码：

```js
compiler.plugin('after-compile', (compilation, callback) => {
  // 把 HTML 文件添加到文件依赖列表，好让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译
  compilation.fileDependencies.push(filePath);
  callback();
});
```

### 修改输出资源

有些场景下插件需要修改、增加、删除输出的资源，要做到这点需要监听 emit 事件，因为发生 emit 事件时所有模块的转换和代码块对应的文件已经生成好， 需要输出的资源即将输出，因此 emit 事件是修改 Webpack 输出资源的最后时机。
所有需要输出的资源会存放在 compilation.assets 中，compilation.assets 是一个键值对，键为需要输出的文件名称，值为文件对应的内容。
设置 compilation.assets 的代码如下：

```js
compiler.plugin('emit', (compilation, callback) => {
  // 设置名称为 fileName 的输出资源
  compilation.assets[fileName] = {
    // 返回文件内容
    source: () => {
      // fileContent 既可以是代表文本文件的字符串，也可以是代表二进制文件的 Buffer
      return fileContent;
    },
    // 返回文件大小
    size: () => {
      return Buffer.byteLength(fileContent, 'utf8');
    },
  };
  callback();
});
```

读取 compilation.assets 的代码如下：

```js
compiler.plugin('emit', (compilation, callback) => {
  // 读取名称为 fileName 的输出资源
  const asset = compilation.assets[fileName];
  // 获取输出资源的内容
  asset.source();
  // 获取输出资源的文件大小
  asset.size();
  callback();
});
```

### 判断 Webpack 使用了哪些插件

在开发一个插件时可能需要根据当前配置是否使用了其它某个插件而做下一步决定，因此需要读取 Webpack 当前的插件配置情况。 以判断当前是否使用了 ExtractTextPlugin 为例，可以使用如下代码：

```js
// 判断当前配置使用使用了 ExtractTextPlugin，
// compiler 参数即为 Webpack 在 apply(compiler) 中传入的参数
function hasExtractTextPlugin(compiler) {
  // 当前配置所有使用的插件列表
  const plugins = compiler.options.plugins;
  // 去 plugins 中寻找有没有 ExtractTextPlugin 的实例
  return (
    plugins.find(
      (plugin) => plugin.__proto__.constructor === ExtractTextPlugin
    ) != null
  );
}
```

webpack 的 Hooks
Webpack 的 Compiler 对象主要有以下 Hooks：

entryOption
webpack 处理完 entry 配置项后触发，这是一个同步串行的 SyncBailHook 钩子，只要监听函数有一个函数的返回值不为 undefined，则直接跳过剩下逻辑

无参数

afterPlugins
处理完初始化插件后触发，这是一个同步的 SyncHook 钩子，不关心返回值

参数是 compiler 对象

afterResolvers
Resolve 安装完成后触发，这是一个同步的 SyncHook 钩子

参数是 compiler 对象

environment
environment 准备好后触发，这是一个 SyncHook 钩子

无参数

afterEnvironment
environment 安装完成后触发，这是一个 SyncHook 钩子

beforeRun
compiler.run 函数之前触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compiler

run
开始读取 records 之前触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compiler

watchRun
监听模式下，一个新的编译开始之前触发，这是一个异步串行的 AsyncSeriesHook 钩子

参数是 compiler

normalModuleFactory
normalModuleFactory 创建之后触发，这是一个同步 SyncHook 钩子

参数是 normalModuleFactory

contextModuleFactory
contextModuleFactory 创建之后触发，

参数是 contextModuleFactory

beforeCompile
编译参数创建之后触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compilationParams

compile
一个新的编译创建之后触发，这是一个同步 SyncHook 钩子

参数是 compilationParams

thisCompilation
触发 compilation 之前触发，这个是一个同步 SyncHook 钩子

参数是 compilation

compilation
编译创建之后执行，这是一个同步 SyncHook 钩子

参数是 compilation

make
这是一个异步并发 AsyncParallelBailHook 钩子

参数是 compilation

afterCompile
这是一个异步串行 �AsyncSeriesHook 钩子

参数是 compilation

shouldEmit
这是一个 SyncBailHook 钩子

参数是 compilation

emit
� 生成资源到 output 目录之前 � 触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compilation

afterEmit
生成资源到 output � 目录之后，这是一个异步串行 AsyncSeriesHook 钩子

参数是 compilation

done
编译完成后触发，这是一个异步串行 AsyncSeriesHook 钩子

参数是 stats

failed
编译失败触发，这是一个同步 SyncHook 钩子

参数是 error

invalid
监听模式下，编译无效时触发，这是一个同步 SyncHook 钩子

参数是 fileName，changeTime

�+ watchClose

监听模式停止，一个同步 SyncHook 钩子
