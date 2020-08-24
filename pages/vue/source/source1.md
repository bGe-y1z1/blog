# vue 源码阅读

## 入口文件

从 packjson 中查看脚本命令

```js
 "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
```

通过`rollup` 执行配置文件 `scripts/config.js` 中的 `web-full-dev`

```js
 // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'), // 入口文件
    dest: resolve('dist/vue.js'), // 出口文件
    format: 'umd', // 打包模式 umd
    env: 'development', // 打包环境
    alias: { he: './entity-decoder' }, // 设置别名
    banner // 文件头部增加banner说明
  },
```

查看入口文件 src --> platforms --> web --> entry-runtime-with-compiler

引入`vue` 暂存了`mount`对象，并在 vue 原型上挂载了 `$mount` 方法.`$mount`方法对初始化的根元素进行不同情况的判断和获取 DOM。 返回 vue 对象

```js
import Vue from "./runtime/index"; // 引入vue
// 定义mount
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el); // 判断挂载的根元素是否存在并返回根元素的DOM
  // 判断el 是否为body
  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== "production" &&
      warn(
        `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
      );
    return this;
  }
  return mount.call(this, el, hydrating);
};
```

查看引入的 vue src --> platforms --> web --> runtime --> index

引入 vue 继承指令和组件的属性和方法

core -->index

```js
import Vue from "./instance/index";
import { initGlobalAPI } from "./global-api/index";
import { isServerRendering } from "core/util/env";
import { FunctionalRenderContext } from "core/vdom/create-functional-component";

initGlobalAPI(Vue); // 初始化Vue全局api

// 服务端数据劫持
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering,
});
// 服务端数据劫持
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  },
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext,
});

Vue.version = "__VERSION__";

export default Vue;
```

instance -- > index

```js
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

// vue 的初始化方式
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

initMixin(Vue); // 初始化
stateMixin(Vue); // 这是函数主要是用来对“props”、"methods"、“data”等参数的处理
eventsMixin(Vue); // 这个函数就对vue赋值了“_events”、“_hasHookEvent”属性,代码如下：
lifecycleMixin(Vue); // 这个函数主要是做一些生命周期的初始化标识工作
renderMixin(Vue); // 这个函数主要是对渲染做一个初始化的挂载处理，使用“defineReactive”函数对“$attrs”、“$listeners”属性进行一个拦截操作。

export default Vue;
```
