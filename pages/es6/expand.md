# ES6 扩展

## 字符串扩展

###  for...of
ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o
```
:::tip
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
:::

### includes(), startsWith(), endsWith()
传统的js 只有indexof可以查看字符串中是否包含某个字符

- includes() 返回布尔值 表示是否找到了参数字符串
- startsWith() 返回布尔值 表示参数字符串是否在原字符串的头部
- endsWith() 返回布尔值 表示参数字符串是否在原字符串的尾部

> 这三个方法接受第二个参数 查找的位置 endsWith和其他两个不同表示前几个字符

### repeat()

返回一个新字符串，表示将原字符重复n次
###  模板字符串
原理
```js
let name = '张三'; let age = '18';
let desc = '${name} 今年  ${age}  岁了';
function replace (desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function (mathed, key, c, d) {
    console.log(mathed, key, c, d);
    // ${name} name 0 ${name} 今年  ${age}  岁了
    // ${age} age 12 ${name} 今年  ${age}  岁了
    // replace中 mathed 为匹配到的字符串，key为对应替换的字符串，c为替换的位置，d为整个要替换的字符串。
    return eval(key);
    // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。这里的eval会将原本的name和age改成成张三和18
  });
}
replace(desc)
```
### 标签模板
通过${}将模板字符串的内容分成静态部分和动态部分，将静态部分以数组的方式存入到myTag函数形参的第一位，动态的部分以形参的形式接着传入函数
```js
var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```
使用场景
- 过滤HTML字符串，防止用户输入恶意内容。
```js
// html 转化
var sender = '<script>alert("abc")</script>'; // 恶意代码
var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;
console.log('恶意代码转化',message) 
// 恶意代码转化 <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```
- 多语言转换（国际化处理）
```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"
```

## 正则

### RegExp构造函数
如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符
```js
new RegExp(/abc/ig, 'i').flags
// "i"
```
### 字符串的正则方法
字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。

## 数值

### Number.isFinite(), Number.isNaN()

- Number.isFinite()用来检查一个数值是否为有限的（finite）
- Number.isNaN()用来检查一个值是否为NaN。
:::tip
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
:::

### Number.parseInt(), Number.parseFloat()
ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
:::tip
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
:::

### Number.EPSILON
 ES6在Number对象上面，新增一个极小的常量Number.EPSILON。
 Number.EPSILON的实质是一个可以接受的误差范围。

### Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。

### Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零
- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为0，返回0；
- 参数为-0，返回-0;
- 其他值，返回NaN。