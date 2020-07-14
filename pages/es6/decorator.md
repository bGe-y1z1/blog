## 修饰器

### 类的修饰器

修饰器（Decorator）是一个函数，用来修改类的行为。这是 ES7 的一个提案，目前 Babel 转码器已经支持。

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。

```js
function testable(target) {
  target.isTestable = true;
}

@testable
class MyTestableClass {}

console.log(MyTestableClass.isTestable); // true
```

### 方法的修饰器

```js
class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}
```

#### core-decorators.js

- @autobind 修饰器使得方法中的 this 对象，绑定原始对象
- @readonly 修饰器使得属性或方法不可写。
- @override 修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错
- @deprecate (别名@deprecated) 修饰器在控制台显示一条警告，表示该方法将废除
- @suppressWarnings

### Mixin

```js
let Mixin1 = (superclass) =>
  class extends superclass {
    foo() {
      console.log("foo from Mixin1");
      if (super.foo) super.foo();
    }
  };

let Mixin2 = (superclass) =>
  class extends superclass {
    foo() {
      console.log("foo from Mixin2");
      if (super.foo) super.foo();
    }
  };

class S {
  foo() {
    console.log("foo from S");
  }
}

class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log("foo from C");
    super.foo();
  }
}
```

### Trait

Trait 也是一种修饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等

#### 同名混入

```js
import { traits, excludes } from "traits-decorator";

class TFoo {
  foo() {
    console.log("foo");
  }
}

const TBar = {
  bar() {
    console.log("bar");
  },
  foo() {
    console.log("foo");
  },
};

@traits(TFoo, TBar::excludes("foo"))
class MyClass {}

let obj = new MyClass();
obj.foo(); // foo
obj.bar(); // bar
```

#### 别名

```js
import { traits, alias } from "traits-decorator";

class TFoo {
  foo() {
    console.log("foo");
  }
}

const TBar = {
  bar() {
    console.log("bar");
  },
  foo() {
    console.log("foo");
  },
};

@traits(TFoo, TBar::alias({ foo: "aliasFoo" }))
class MyClass {}

let obj = new MyClass();
obj.foo(); // foo
obj.aliasFoo(); // foo
obj.bar(); // bar
```

```js
@traits(TExample::excludes("foo", "bar")::alias({ baz: "exampleBaz" }))
class MyClass {}
```
