
## Blob

   Blod 对象表示一个不可变、原始数据的类文件对象。Blob表示的不一定是JaveScript原生格式的数据。
File 接口基于Blob,继承了blob的功能并将扩展使其支持用户系统上的文件

##### 起因 

   在文件下载是后台返回的不是文件链接而是流文件，此时js无法直接使用href进行下载操作

##### 分析

   File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。
比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

##### 使用示例

参考下面的代码

 ``` js{3}
        var typedArray = GetTheTypedArraySomehow();
        var blob = new Blob([typedArray.buffer], {type: 'application/octet-stream'}); // 传入一个合适的 MIME 类型
        var url = URL.createObjectURL(blob);
        // 会产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
        // 你可以像使用普通 URL 那样使用它，比如用在 img.src 上。
 ```
::: tip
URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
相当于这个方法创建了一个传入对象的内存引用地址
:::
项目中的应用

```js{4}

export function getDownLoadData ( url,name ){
  return fetch(url, {
    headers: {
      'token' : getAuthToken(),
      'Content-Type' : 'application/json'
    },
    method: 'get',
  })
    .then((res) => {
      if(!!res && res.status === 200){
        // 创建Blob 对象并返回
        return res.blob();
      }
    })
     .then((blob) => {
      if(!!blob){
        // 通过 URL.createObjectURL方法 
        // 生成一个类似 blob:http://localhost:8000/58e1bcea-01a5-449d-9c3f-a32eec3902f1 这样的一个字符串
        // 可以像使用普通的URL 那样使用它， 
        // href="blob:http://localhost:8000/58e1bcea-01a5-449d-9c3f-a32eec3902f1"
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = name
        a.href = url
        document.body.appendChild(a)
        console.log(a)
        a.click()
        a.remove()
      }
    })
    .catch(e => {});
}
```

##### Blob

###### 构造函数

::: tip

Blob(blobParts[,options]) 

返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
:::

###### 属性

::: tip
Blob.size  对象中所包含数据（字节）的大小

blob.type  一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。
:::

###### 方法 
::: tip

blob.slice(start, end, contentType);  通过开始字节、结束字节、 mime类型返回新的blob

blob.text(); 获取 blob中的文本
:::

[参考链接 MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Blob/type)