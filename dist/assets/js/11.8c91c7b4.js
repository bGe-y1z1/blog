(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{459:function(t,s,a){"use strict";a.r(s);var n=a(49),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"尾递归"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#尾递归"}},[t._v("#")]),t._v(" 尾递归")]),t._v(" "),a("h4",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),a("p",[t._v("前端技术评审会中，文静同学在项目优化方面提出了尾递归这个词，我们就来说说什么是尾递归，和尾递归的好处")]),t._v(" "),a("h4",{attrs:{id:"递归"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#递归"}},[t._v("#")]),t._v(" 递归")]),t._v(" "),a("p",[t._v("关于递归的概念，我们都不陌生。简单的来说递归就是一个函数直接或间接地调用自身，是为直接或间接递归。一般来说，递归需要有边界条件递归前进段和递归返回段。当边界条件不满足时，递归前进；当边界条件满足时，递归返回。")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",[t._v("用递归需要注意以下两点："),a("br"),t._v("\n(1) 递归就是在过程或函数里调用自身。")]),t._v(" "),a("p",[t._v("(2) 在使用递归策略时，必须有一个明确的递归结束条件，称为递归出口。")])]),t._v(" "),a("p",[t._v("递归的缺点：")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",[t._v("递归解题相对常用的算法如普通循环等，运行效率较低。因此，应该尽量避免使用递归，除非没有更好的算法或者某种特定情况，递归更为适合的时候。")]),t._v(" "),a("p",[t._v("在递归调用的过程当中系统为每一层的返回点、局部量等开辟了栈来存储，因此递归次数过多容易造成栈溢出。")])]),t._v(" "),a("p",[t._v("普通递归：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n          \n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 120")]),t._v("\n")])])]),a("p",[t._v("这是个阶乘。但是占用内存，因为：")]),t._v(" "),a("p",[t._v("fac(5)")]),t._v(" "),a("p",[t._v("(5*fac(4))")]),t._v(" "),a("p",[t._v("(5*(4*fac(3)))")]),t._v(" "),a("p",[t._v("(5*(4*(3*fac(2))))")]),t._v(" "),a("p",[t._v("(5*(4*(3*(2*fac(1)))))")]),t._v(" "),a("p",[t._v("(5*(4*(3*2)))")]),t._v(" "),a("p",[t._v("(5*(4*(6)))")]),t._v(" "),a("p",[t._v("(5*24)")]),t._v(" "),a("p",[t._v("120")]),t._v(" "),a("p",[t._v("这里需要讲明的是： 函数调用会产生“调用记录（存储着函数的相关信息）”存放在栈中，当有函数返回，对应的调用记录才会消失，")]),t._v(" "),a("p",[t._v("上述用普通递归实现的阶乘的执行过程中，不断的调用自身，导致一直没有返回，这样也就不断的在栈中存储调用记录")]),t._v(" "),a("p",[t._v("而当调用自身的次数过多后，就会产生我们常说的“栈溢出”")]),t._v(" "),a("h4",{attrs:{id:"尾递归-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#尾递归-2"}},[t._v("#")]),t._v(" 尾递归")]),t._v(" "),a("p",[t._v("函数调用自身，称为递归。如果尾调用自身，就称为尾递归。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" total")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" total"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" total"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n   \n   "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 120")]),t._v("\n\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ES6 默认值")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" total "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" total"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" total"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n   \n   "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fac")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 120")]),t._v("\n")])])]),a("p",[t._v("执行过程如下：")]),t._v(" "),a("p",[t._v("fac(5,1)")]),t._v(" "),a("p",[t._v("fac(4,5)")]),t._v(" "),a("p",[t._v("fac(3,20)")]),t._v(" "),a("p",[t._v("fac(2,60)")]),t._v(" "),a("p",[t._v("fac(1,120)")]),t._v(" "),a("p",[t._v("说明：永远只有一个调用记录，调用函数产生一个调用记录，最后一步操作 return fac(n - 1, n * total)")]),t._v(" "),a("p",[t._v("把当前函数的计算结果当做参数传递给了下一个自身调用，这样第一个函数调用产生的调用记录就消失了，因为它执行完了")]),t._v(" "),a("p",[t._v("依次类推，就不会溢出，相对节省内存。")]),t._v(" "),a("p",[t._v("尾递归：函数的最后一步是执行一个函数")]),t._v(" "),a("p",[t._v("注意点：")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",[t._v("ES6的尾调用优化只在严格模式下开启，正常模式是无效的。")]),t._v(" "),a("p",[t._v("这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。")])]),t._v(" "),a("div",{staticClass:"custom-block danger"},[a("ul",[a("li",[t._v("arguments：返回调用时函数的参数。")]),t._v(" "),a("li",[t._v("func.caller：返回调用当前函数的那个函数。")])])]),t._v(" "),a("h4",{attrs:{id:"参考链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[t._v("#")]),t._v(" 参考链接")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2015/04/tail-call.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰 尾调用优化"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);