## class

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的“类”改写，就是下面这样。

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
```

### constructor 方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

```js
constructor() {}
```

constructor 方法默认返回实例对象（即 this），完全可以指定返回另外一个对象。

:::tip

- 没有变量提升
- 私有方法移出模块。
- this 它默认指向类的实例。单独使用该方法，很可能报错。
  :::

## Class 的继承

```js
class ColorPoint extends Point {}
```

:::danger
另一个需要注意的地方是，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有 super 方法才能返回父类实例。
:::

### 类的 prototype 属性和**proto**属性

大多数浏览器的 ES5 实现之中，每一个对象都有**proto**属性，指向对应的构造函数的 prototype 属性。Class 作为构造函数的语法糖，同时有 prototype 属性和**proto**属性，因此同时存在两条继承链。

（1）子类的**proto**属性，表示构造函数的继承，总是指向父类。

（2）子类 prototype 属性的**proto**属性，表示方法的继承，总是指向父类的 prototype 属性。

```js
class A {}

class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true
```

## Mixin 模式的实现

Mixin 模式指的是，将多个类的接口“混入”（mix in）另一个类。它在 ES6 的实现如下。

```js
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的 mix 函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```js
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```
