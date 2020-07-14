## proxy 代理

用于修改某些操作的默认行为，等同于在语言层面上做修改，

`proxy` 可以理解成 在目标对象之前架设一层拦截，外界对该对象的访问必须经过这层拦截，因此提供了一种机制，对外界的访问进行过滤和拦截

```js
var proxy = new Proxy(target, handler);
```

`Proxy` 对象的所有用法，都是上面这种形式，不同的只是 `handler` 参数的写法。其中，`new Proxy()`表示生成一个 `Proxy` 实例，`target` 参数表示所要拦截的目标对象，`handler` 参数也是一个对象，用来定制拦截行为。

### hander 拦截行为

#### get(target, propKey, receiver)

`get` 方法用于拦截某个属性的读取操作

:::tip

- 可继承
- 可以链式调用

:::

#### set(target, propKey, value, receiver)

`set` 方法用来拦截某个属性的赋值操作。

#### has(target, propKey)

拦截 propKey in proxy 的操作，以及对象的 hasOwnProperty 方法，返回一个布尔值。

:::danger
另外，虽然 for...in 循环也用到了 in 运算符，但是 has 拦截对 for...in 循环不生效。
:::

#### apply(target, object, args)

拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

```js
var handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments);
  },
};
```

apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

#### construct(target, args)

拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

:::danger
construct 方法返回的必须是一个对象，否则会报错。
:::

#### deleteProperty(target, propKey)

拦截 delete proxy[propKey]的操作，返回一个布尔值。

#### ownKeys(target)

拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而 Object.keys()仅返回对象可遍历的属性。

#### getOwnPropertyDescriptor(target, propKey)

拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

#### defineProperty(target, propKey, propDesc)

拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

#### preventExtensions(target)

拦截 Object.preventExtensions(proxy)，返回一个布尔值。

#### getPrototypeOf(target)

拦截 Object.getPrototypeOf(proxy)，返回一个对象。

#### isExtensible(target)

拦截 Object.isExtensible(proxy)，返回一个布尔值。

#### setPrototypeOf(target, proto)

拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。

如果目标对象是函数，那么还有两种额外操作可以拦截。

#### this 问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

Reflect 概述
Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect 对象的设计目的有这样几个。

（1） 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。

（2） 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。
