module.exports = {
  base: "/",
  dest: "./dist", //打包后的文件
  title: "B格",
  description: " 装B的起点",
  path: "https://www.jhawx.com/",
  themeConfig: {
    logo: "/hero.png",
    sidebar: "auto",
    sidebarDepth: 0,
    lastUpdated: "Last Updated",
    nav: [
      { text: "home", link: "/" },
      { text: "webpack", link: "/pages/webpack/" },
      { text: "ES6", link: "/pages/es6/letVarConst" },
      { text: "vue", link: "/pages/vue/" },
      { text: "react", link: "/pages/react/" },
      { text: "node", link: "/pages/node/" },
      // { text: 'ts', link: '/pages/ts/' },
      // { text: 'wx', link: '/pages/wx/' },
      // { text: 'RN', link: '/pages/reactNative/' },
      // { text: 'flutter', link: '/pages/flutter/' },
      { text: "blog", link: "/blog/" },
      { text: "github", link: "https://github.com/bGe-y1z1/blog" },
    ],
    sidebar: {
      "/pages/vue/": [
        {
          title: "vue",
          path: "/pages/vue/",
          collapsable: true,
          children: [
            {
              title: "基础",
              collapsable: true,
              children: [
                {
                  title: "指令",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "生命周期",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "函数式组件",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "虚拟DOM",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "模版语法",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "JSX",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "组件",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "计算属性",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "侦听器",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "provide/inject",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "双向绑定",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "模块化css",
                  path: "/pages/vue/base/todo",
                },
              ],
            },
            {
              title: "vueRouter",
              path: "/pages/vue/base/todo",
            },
            {
              title: "vuex",
              collapsable: true,
              children: [
                {
                  title: "state",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "getter",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "mutation",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "action",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "module",
                  path: "/pages/vue/base/todo",
                },
              ],
            },
            {
              title: "同构",
              collapsable: true,
              children: [
                {
                  title: "ssr",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "nuxt",
                  path: "/pages/vue/base/todo",
                },
                {
                  title: "spa",
                  path: "/pages/vue/base/todo",
                },
              ],
            },
            {
              title: "cli",
              path: "/pages/vue/base/todo",
            },
          ],
        },
      ],
      "/pages/react/": [],
      "/pages/node/": [
        {
          title: "node",
          collapsable: true,
          sidebarDepth: 0,
          children: ["commonJS", "path"],
        },
      ],
      "/pages/webpack/": [
        {
          title: "webpack",
          path: "/pages/webpack/",
          collapsable: true,
          children: [
            {
              title: "基本配置",
              collapsable: true,
              children: [
                { title: "打包模式", path: "/pages/webpack/base/mode" },
                { title: "入口文件", path: "/pages/webpack/base/entry" },
                { title: "出口文件", path: "/pages/webpack/base/output" },
                { title: "模块配置", path: "/pages/webpack/base/module" },
                { title: "模块解析", path: "/pages/webpack/base/resolve" },
                { title: "本地服务", path: "/pages/webpack/base/devServer" },
                { title: "其他配置", path: "/pages/webpack/base/other" },
              ],
            },
            {
              title: "loader",
              collapsable: true,
              children: [
                { title: "原理", path: "/pages/webpack/loader/base" },
                {
                  title: "bableLoder",
                  path: "/pages/webpack/loader/babelLoader",
                },
                {
                  title: "urlLoder",
                  path: "/pages/webpack/loader/urlLoader",
                },
              ],
            },
            {
              title: "plugins",
              // path: '/pages/webpack/plugins/',
              collapsable: true,
              children: [
                { title: "原理", path: "/pages/webpack/plugins/base" },
                { title: "fileList", path: "/pages/webpack/plugins/fileList" },
              ],
            },
            {
              title: "优化项",
              path: "/pages/webpack/optimization",
            },
            {
              title: "原理",
              path: "/pages/webpack/principle",
            },
            {
              title: "tapable",
              path: "/pages/webpack/tapable",
            },
          ],
        },
      ],
      "/pages/es6/": [
        {
          title: "es6",
          path: "/pages/es6/letVarConst",
          collapsable: true,
          children: [
            {
              title: "let和const命令",
              path: "/pages/es6/letVarConst",
            },
            {
              title: "解构赋值",
              path: "/pages/es6/destructuring",
            },
            {
              title: "扩展",
              path: "/pages/es6/expand",
            },
            {
              title: "数据结构",
              path: "/pages/es6/set_map",
            },
            {
              title: "symbol",
              path: "/pages/es6/symbol",
            },
            {
              title: "proxy",
              path: "/pages/es6/proxy",
            },
            {
              title: "Genertor",
              path: "/pages/es6/generator",
            },
            {
              title: "promise",
              path: "/pages/es6/promise",
            },
            {
              title: "class",
              path: "/pages/es6/class",
            },
            {
              title: "decorator",
              path: "/pages/es6/decorator",
            },
          ],
        },
      ],
      "/pages/reactNative/": [],
      "/pages/wx/": [],
      "/pages/flutter/": [],
    },
  },
};
