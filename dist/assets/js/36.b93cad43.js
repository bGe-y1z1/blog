(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{481:function(s,t,a){"use strict";a.r(t);var n=a(49),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"打包模式-mode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#打包模式-mode"}},[s._v("#")]),s._v(" 打包模式 mode")]),s._v(" "),a("p",[s._v("webpack 的 mode 配置用于提供模式配置选项告诉 webpack 相应地使用其内置的优化，mode 有以下三个可选值")]),s._v(" "),a("ul",[a("li",[s._v("development")]),s._v(" "),a("li",[s._v("production")]),s._v(" "),a("li",[s._v("none")])]),s._v(" "),a("p",[s._v("默认为 production")]),s._v(" "),a("h4",{attrs:{id:"配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[s._v("#")]),s._v(" 配置")]),s._v(" "),a("ol",[a("li",[s._v("直接写在 webpack.config.js 配置中")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  mode"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'production'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("作为 webpack 执行的参数"),a("div",{staticClass:"custom-block tip"},[a("p",[s._v("webpack --mode=production")])]),s._v("\n通过上面的配置，我们就可以在业务代码中通过 process.env.NODE_ENV 拿到环境变量值，这里的 process.env.NODE_ENV 要跟 node 的区分，这句等同于")])]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("webpack"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("DefinePlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"process.env.NODE_ENV"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"development"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])])]),a("h4",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[s._v("#")]),s._v(" 使用")]),s._v(" "),a("p",[s._v("在 package.json 中配置")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack-dev-server --mode=development --devtool inline-source-map --hot"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack --mode=production"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h4",{attrs:{id:"不同模式的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不同模式的区别"}},[s._v("#")]),s._v(" 不同模式的区别")]),s._v(" "),a("p",[s._v("production 生产环境模式，会开启一下配置")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("ul",[a("li",[a("p",[s._v("FlagDependencyUsagePlugin: 编译时标记依赖")])]),s._v(" "),a("li",[a("p",[s._v("FlagIncludedChunksPlugin:标记子 chunks，防子 chunks 多次加载")])]),s._v(" "),a("li",[a("p",[s._v("ModuleConcatenationPlugin:作用域提升(scope hosting),预编译功能,提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度")])]),s._v(" "),a("li",[a("p",[s._v("NoEmitOnErrorsPlugin:在输出阶段时，遇到编译错误跳过")])]),s._v(" "),a("li",[a("p",[s._v("OccurrenceOrderPlugin:给经常使用的 ids 更短的值")])]),s._v(" "),a("li",[a("p",[s._v("SideEffectsFlagPlugin:识别 package.json 或者 module.rules 的 sideEffects 标志（纯的 ES2015 模块)，安全地删除未用到的 export 导出")])]),s._v(" "),a("li",[a("p",[s._v("UglifyJsPlugin:删除未引用代码，并压缩")])])])]),s._v(" "),a("p",[s._v("development 开发环境模式，会开启一下配置")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("ul",[a("li",[a("p",[s._v("NamedChunksPlugin: 把 chunk id 变为一个字符串标识符。")])]),s._v(" "),a("li",[a("p",[s._v("NamedModulesPlugin:当开启 HMR 的时候使用该插件会显示模块的相对路径")])])])])])}),[],!1,null,null,null);t.default=e.exports}}]);