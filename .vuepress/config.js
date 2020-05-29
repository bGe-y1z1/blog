module.exports = {
  base: '/',
  dest: './dist', //打包后的文件
  title: 'B格',
  description: ' 装B的起点',
  path: 'https://www.jhawx.com/',
  themeConfig: {
    logo: '/hero.png',
    sidebar: 'auto',
    sidebarDepth: 0,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'home', link: '/' },
      { text: 'webpack', link: '/pages/webpack/' },
      { text: 'ES6', link: '/pages/es6/letVarConst' },
      { text: 'vue', link: '/pages/vue/' },
      { text: 'react', link: '/pages/react/' },
      { text: 'node', link: '/pages/node/' },
      // { text: 'ts', link: '/pages/ts/' },
      // { text: 'wx', link: '/pages/wx/' },
      // { text: 'RN', link: '/pages/reactNative/' },
      // { text: 'flutter', link: '/pages/flutter/' },
      { text: 'blog', link: '/blog/' },
      { text: 'github', link: 'https://github.com/bGe-y1z1/blog' },
    ],
    sidebar: {
      '/pages/vue/': [],
      '/pages/react/': [],
      '/pages/node/': [
        {
          title: 'node',
          collapsable: true,
          sidebarDepth: 0,
          children: ['commonJS', 'path'],
        },
      ],
      '/pages/webpack/': [
        {
          title: 'webpack',
          path: '/pages/webpack/',
          collapsable: true,
          children: [
            {
              title: '基本配置',
              collapsable: true,
              children: [
                { title: '打包模式', path: '/pages/webpack/base/mode' },
                { title: '入口文件', path: '/pages/webpack/base/entry' },
                { title: '出口文件', path: '/pages/webpack/base/output' },
                { title: '模块配置', path: '/pages/webpack/base/module' },
                { title: '模块解析', path: '/pages/webpack/base/resolve' },
                { title: '本地服务', path: '/pages/webpack/base/devServer' },
                { title: '其他配置', path: '/pages/webpack/base/other' },
              ],
            },
            {
              title: 'loader',
              collapsable: true,
              children: [
                { title: '原理', path: '/pages/webpack/loader/base' },
                {
                  title: 'bableLoder',
                  path: '/pages/webpack/loader/babelLoader',
                },
                {
                  title: 'urlLoder',
                  path: '/pages/webpack/loader/urlLoader',
                },
              ],
            },
            {
              title: 'plugins',
              // path: '/pages/webpack/plugins/',
              collapsable: true,
              children: [
                { title: '原理', path: '/pages/webpack/plugins/base' },
                { title: 'fileList', path: '/pages/webpack/plugins/fileList' },
              ],
            },
            {
              title: '优化项',
              path: '/pages/webpack/optimization',
            },
            {
              title: '原理',
              path: '/pages/webpack/principle',
            },
            {
              title: 'tapable',
              path: '/pages/webpack/tapable',
            },
          ],
        },
      ],
      '/pages/es6/': [
        {
          title: 'es6',
          path: '/pages/es6/letVarConst',
          collapsable: true,
          children: [
            {
              title: 'let和const命令',
              path: '/pages/es6/letVarConst',
            },
            {
              title: '解构赋值',
              path: '/pages/es6/destructuring',
            },
            {
              title: '扩展',
              path: '/pages/es6/expand',
            },
          ],
        },
      ],
      '/pages/reactNative/': [],
      '/pages/wx/': [],
      '/pages/flutter/': [],
    },
  },
};
