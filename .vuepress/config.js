module.exports = {
  base: '/',
  dest: './dist', //打包后的文件
  title: 'B格',
  description: ' 装B的起点',
  path: 'https://www.jhawx.com/',
  themeConfig: {
    logo: '/hero.png',
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'home', link: '/' },
      { text: 'vue', link: '/pages/vue/'},
      { text: 'react',link: '/pages/react/'},
      { text: 'node', link: '/pages/node/'},
      { text: 'webpack', link: '/pages/webpack/'},
      { text: 'wx',link: '/pages/wx/'},
      { text: 'RN',link: '/pages/reactNative/'},
      { text: 'flutter',link: '/pages/flutter/'},
      { text: 'blog', link: '/blog/' },
      { text: 'github', link: 'https://github.com/bGe-y1z1/blog' },
    ],
    sidebar: {
      '/pages/vue/': [
        
      ],
      '/pages/react/': [
      
      ],
      '/pages/node/': [
       
      ],
      '/pages/webpack/': [
        
      ],
      '/pages/reactNative/': [
       
      ],
      '/pages/wx/': [
       
      ],
      '/pages/flutter/': [
      
      ],
      '/pages/blog/': [
        '',     /* /foo/ */
      ],

    }
  }
}
