## promise

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```js
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

## 手写 promise

- Promise 构造函数接收一个 executor 函数，executor 函数执行完同步或异步操作后，调用它的两个参数 resolve 和 reject
- 状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected ，且状态改变之后不会在发生变化，会一直保持这个状态。
- then 方法必须返回一个新的 promise 对象 支持链式调用

then 方法可以被同一个 promise 对象调用多次

- 当 promise 成功状态时，所有 onFulfilled 需按照其注册顺序依次回调
- 当 promise 失败状态时，所有 onRejected 需按照其注册顺序依次回调
- 当 resolve 或 reject 方法执行时，我们依次提取成功或失败任务队列当中的函数开始执行，并清空队列，从而实现 then 方法的多次调用

then onFulfilled

- then promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值
- 在 promise 状态改变前其不可被调用
- 其调用次数不可超过一次

then onRejected

- 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值
- 在 promise 状态改变前其不可被调用
- 其调用次数不可超过一次

1、如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)

若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的 onFulfilled 或者 onRejected 函数的参数.
若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。

```js
// 判断变量否为function
const isFunction = (variable) => typeof variable === "function";
// 定义Promise的三种状态常量
const PENDING = "PENDING"; // 进行中
const FULFILLED = "FULFILLED"; // 成功
const REJECTED = "REJECTED"; // 失败
// 添加成功回调函数队列 then方法支持多次回调
this._fulfilledQueues = [];
// 添加失败回调函数队列 then方法支持多次回调
this._rejectedQueues = [];
// MyPromise 类
class MyPromise {
  // 接收一个函数作为参数 handler handler包含两个函数参数 resolve reject
  constructor(handler) {
    if (!isFunction(handler)) {
      throw "MyPromise 必须接受一个函数作为参数";
    }
    // 添加状态
    this._status = PENDING;
    // 赋值
    this._val = undefined;
    // 执行handler 错误断言
    try {
      handler(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  /**
   * 添加 resolve 方法
   */
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return;
      this._status = FULFILLED;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value);
        }
      };
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while ((cb = this._rejectedQueues.shift())) {
          cb(error);
        }
      };
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
      当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
    */
      if (val instanceof MyPromise) {
        val.then(
          (value) => {
            this._val = value;
            runFulfilled(value);
          },
          (err) => {
            this._val = err;
            runRejected(err);
          }
        );
      } else {
        this._val = val;
        runFulfilled(val);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  /**
   * 添加 reject 方法
   */
  _reject(err) {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED;
      this._val = err;
      let cb;
      while ((cb = this._rejectedQueues.shift())) {
        cb(err);
      }
    };
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  /**
   *
   * @param {*} onFulfilled
   * 当 promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值
   * 在 promise 状态改变前其不可被调用
   * 其调用次数不可超过一次
   * @param {*} onRejected
   * 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值
   * 在 promise 状态改变前其不可被调用
   * 其调用次数不可超过一次
   * @description
   * then 方法可以被同一个 promise 对象调用多次
   * 当 promise 成功状态时，所有 onFulfilled 需按照其注册顺序依次回调
   * 当 promise 失败状态时，所有 onRejected 需按照其注册顺序依次回调
   */
  then(onFulfilled, onRejected) {
    const { _status, _val } = this;
    // 返回新的 promise
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 成功时执行的行数
      let fulfilled = (value) => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
      // 封装一个失败时执行的函数
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      };
    });
    switch (_status) {
      // 当状态为pending时，将then方法回调函数加入执行队列等待执行
      case PENDING:
        this._fulfilledQueues.push(onFulfilled);
        this._rejectedQueues.push(onFulfilled);
        break;
      // 当状态已经改变时，立即执行对应的回调函数
      case FULFLLED:
        fulfilled(_val);
        break;
      case REJECTED:
        rejected(_val);
        break;
    }
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(
          (res) => {
            values[i] = res;
            count++;
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values);
          },
          (err) => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err);
          }
        );
      }
    });
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) =>
        MyPromise.resolve(cb()).then(() => {
          throw reason;
        })
    );
  }
  cancel() {
    return new Promise(function () {});
  }
}
```

:::tip
promise 值的透传
在 then 的返回 res.then(onFulfilledNext(val), onRejectedNext(err));
:::

:::tip
不同 Promise 的交互
判断 then 返回的是否为 Promise 对象
:::

:::tip
终止 promise
返回一个一直处于 PENDING 的 promise
return new Promise(function () {});
:::
