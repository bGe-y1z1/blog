# zq-mfe 架构

## 主应用和子应用的构建

主应用和子应用全使用 vue-cli 快速搭建。

### 主应用

创建应用管理器 main 通过 qiankun 管理和注册子应用

```js
// 安装 @vue/cli
npm install -g @vue/cli
// 创建主应用
vue create master
// 安装依赖
cd main
npm install
// 启动
npm run serve
```

### 子应用

- vue 类子应用和主应用的构建方式一样

不同点：
1、需要将打包文件输出为 umd(同一个代码模块在使用 CommonJs、CMD 甚至是 AMD 的项目中运行)

```js
const path = require("path");
const { name } = require("./package");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8081; // dev port

module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

2、需要修改入口 main.js

- 初始化 vue 实例 需区分运行环境挂载在不同的根元素
- 初始化 router 实例 需区分运行环境是指根路径
- 接受参数
- 执行生命周期函数

```js
// 加载依赖
import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";
import store from "./store";

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/app1" : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
```

## 注册子应用

采用市场上的脚手架 qiankun

- registerMicroApps
  注册子应用 entry 子应用的入口就是子应用的服务地址，container 子应用的挂载元素 activeRule 子应用的匹配路由
- setDefaultMountApp
  默认使用那个子应用
- initGlobalState
  初始化全局状态
- start
  启动

```js
// 安装
npm install qiankun
// 在主应用的入口文件注册子应用
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState,
} from "qiankun";

/**
 * 主应用 **可以使用ue技术栈**
 */
import render from "./render/VueRender";

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: "app1",
      entry: "//localhost:8081",
      container: "#subapp-viewport",
      loader,
      activeRule: "/app1",
    },
    {
      name: "purehtml",
      entry: "//localhost:8200",
      container: "#subapp-viewport",
      loader,
      activeRule: "/purehtml",
    },
    {
      name: "vue",
      entry: "//localhost:8210",
      container: "#subapp-viewport",
      loader,
      activeRule: "/vue",
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
      },
    ],
  }
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: "qiankun",
});

onGlobalStateChange((value, prev) =>
  console.log("[onGlobalStateChange - master]:", value, prev)
);

setGlobalState({
  ignore: "master",
  user: {
    name: "master",
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp("/purehtml");

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});
:::tip
可以通过配置文件后者接口返回权限子应用
:::
```

## 主应用路由

通过 history 库实现跨应用的路由跳转。子应用内部实例化自己的路由

```html
<div id="subapp-container">
  <h4 v-if="loading" class="subapp-loading">Loading...</h4>
  <ul class="mainapp-sidemenu">
    <li @click="push('/app1')">app_one</li>
    <li @click="push('/purehtml')">purehtml</li>
    <li @click="push('/vue')">vue</li>
    <li @click="push('/vue/home')">vue</li>
    <li @click="push('/app1/about')">app_one</li>
  </ul>
  <div id="subapp-viewport"></div>
</div>
```

```js
 push(subapp) {
   window.history.pushState(null, subapp, subapp);
  },
```

## 打包&部署

通过 jenkins 集成代码规范检查、打包和部署

### 打包

- 构建 node 项目
- 安装 node 环境
- 拉取 git 代码
- 执行规范检测命令 npm run eslint
- 执行打包命令 npm run build
- 压缩打包后的文件
- 发送到服务器项目目录解压

### 部署

通过 nginx 监听端口访问项目的主文件，端口为注册子应用的的端口，配置好跨域范围和日志文件

## 聚合现有架构

现有的架构是 PHP 渲染模式，通过替换主应用的子应用渲染区的元素来实现

### 注册现有架构

```js
{
     name: "purehtml",
     entry: "//localhost:8200", // 入口服务 如果有多个可以分别注册 或者nginx代理
     container: "#subapp-viewport", // 子应用渲染区
     loader,
     activeRule: "/purehtml", // 现有架构的路由标示
   },
```

### 入口代理

入口服务通过 nginx 代理到 PHP 服务，根据现有的模块分别代理

## 公用资源管理

通过搭建 zqnpm 私有库的方式引入公共类或者业务组件

## 服务构建

如果考虑通过 node 服务代理接口、模块请求的封装、前端访问数据库、管理 session 可以使用 thinkjs 框架

### 服务端构建

安装 think-cli thinkjs 框架脚手架

```js
// 安装
npm install -g think-cli

thinkjs new zq-mfe
// 进入项目目录
cd zq-mfe
// 安装项目依赖
npm install
// 启动项目
npm start
// 访问项目
http://127.0.0.1:8360
```

## 阶段开发

- 主应用和子应用的框架搭建
- 主应用页面和业务功能开发
- 子应用页面和业务开发
- 聚合现有架构
- 主应用和子应用 nginx 部署
- jenkins 构建

## 配合项

- 权限路由菜单
- nginx 项目部署
- jenkins 构建
- 新应用的业务设计
- 新应用的 UI 设计

## 不可预测的问题

- 聚合现有架构
- 项目部署方式是整个子应用打包部署

## 可以带来的好处

- 解决老系统迁移问题
- 聚合不同技术栈
- 子应用单独打包部署
