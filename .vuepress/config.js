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
      { text: 'vue', link: '/pages/vue/' },
      { text: 'react', link: '/pages/react/' },
      { text: 'node', link: '/pages/node/' },
      { text: 'webpack', link: '/pages/webpack/' },
      { text: 'wx', link: '/pages/wx/' },
      { text: 'RN', link: '/pages/reactNative/' },
      { text: 'flutter', link: '/pages/flutter/' },
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
          children: ['commonJS'],
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
              // path: '/pages/webpack/base/',
              collapsable: true,
              children: [
                { title: '打包模式', path: '/pages/webpack/base/mode' },
                { title: '入口文件', path: '/pages/webpack/base/entry' },
                { title: '出口文件', path: '/pages/webpack/base/output' },
              ],
            },
            {
              title: '手写loader',
              // path: '/pages/webpack/loader/',
              collapsable: true,
              children: [{ title: '原理', path: '/pages/webpack/loader/base' }],
            },
            {
              title: '手写plugins',
              // path: '/pages/webpack/plugins/',
              collapsable: true,
              children: [
                { title: '原理', path: '/pages/webpack/plugins/base' },
              ],
            },
            'optimization',
          ],
        },
      ],
      '/pages/reactNative/': [],
      '/pages/wx/': [],
      '/pages/flutter/': [],
      '/pages/blog/': ['' /* /foo/ */],
    },
  },
};
