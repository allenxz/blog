---
prev: /Interview/
next: /Interview/ByteDance-video-interview.md
---

# 面试常见概念整理

## 1. BFC

[参考](https://blog.csdn.net/jiaojsun/article/details/76408215)

- 基本概念

  BFC(Block Formatting Contexts)，即块级格式化上下文。个人理解这相当于一种特性，具有BFC特性的元素可被看作是一个独立隔离的容器，里面的元素布局不会影响到外部。此外BFC还具有一些其他的特性，后面细说。

- 触发条件

  只要元素满足以下任一一个条件即可触发BFC特性

  - body 根元素
  - 浮动元素：float 除 none 以外的值
  - 绝对定位元素：position (absolute、fixed)
  - display 为 inline-block、table-cells、flex
  - overflow 为除了 visible 以外的值 (hidden、auto、scroll)

  我们一般使用`overflow:hidden;`来触发BFC特性，因为所有的方法都会产生一定的副作用，但是`overflow:hidden;`的副作用是相对来说比较小的（溢出元素会被隐藏掉）。不过具体通过什么方式进行触发还是得看具体的需求。

- BFC特性及应用

  - 同一个 BFC 下外边距会发生折叠
  - BFC 可以包含浮动的元素（清除浮动）
  - BFC 可以阻止元素被浮动元素覆盖


## 2. Ajax

[参考](https://juejin.im/post/5b1cebece51d4506ae71addf)

- 什么是Ajax

  Ajax是一种异步请求数据的Web开发技术，可以在网页不刷新页面的情况下，异步请求加载后台数据并展示在网页上。提高用户体验，减少网络数据的传输量。

- Ajax原理

  Ajax功能的实现主要依赖的是浏览器提供的XHR（XMLHttpRequest）对象。通俗的来说XHR在浏览器和服务器之间充当了“秘书”的角色，浏览器通知XHR去问服务器取数据，然后就做自己的事情去了。直到XHR把数据从服务器取回来，浏览器再用其渲染页面。

![img](/in-post/167bd023855c0bf7)


## 3. cookie、sessionStorage和localStorage

[参考](https://segmentfault.com/a/1190000012478396)

- cookie

  由于http协议是无状态的，每次客户端和服务器端数据交换完之后就会断掉链接。服务器无法保存这种链接的状态，如果再需要请求数据的话就重新连接。整个交互过程就一直在不断的链接，断链接，就需要cookie来做身份认证，再次请求的时候服务器会根据cookie来进行用户判断。应用的话经典的就是用于判断用户是否已经登录网站，或者购物车的相关处理上。

  但是需要注意几点：

  - cookie不能跨域，它会根据域名判断与哪个服务器进行连接。
  - cookie是很容易通过浏览器获取的，一些个人信息很容易泄露，所以尽量别存一些隐私信息，如果硬是要存，应该对其进行加密。

- sessionStorage

  sessionStorage是本地储存的方式之一。其生存周期为从用户打开会话窗到关闭会话窗，关闭之后里面存的数据就会被删除。

- localStorage是本地储存的另外的一个方式。数据会一直存在浏览器中，除非手动删除。

三者的异同

- 相同点：三者都存在客户端而且同源（同协议、同域名、同端口）
- 不同点：cookie会在http请求中携带，会在服务器和客户端间传递，所以cookie会有大小限制，不能超过4k，而且存在在设定的path下；sessionStorage和localStorage只会存在本地，大小要比cookie大，其中sessionStorage是仅在当前的会话窗口有效，不是所有窗口都可以共享数据的。其它两个是整个浏览器都可以数据共享。



## 4. 跨域

跨域是指一个域下的文档或脚本试图去请求另一个域下的资源。

- 同源策略/SOP（Same Origin Policy）

  同源策略主要限制以下几种行为：

  - Cookie、LocalStorage 和 IndexDB 无法读取
  - DOM 和 Js对象无法获得
  - AJAX 请求不能发送

- 跨域解决方案（详细的见[传送门](https://segmentfault.com/a/1190000011145364)）

  - 通过jsonp跨域
  - document.domain + iframe跨域
  - location.hash + iframe
  - window.name + iframe跨域
  - postMessage跨域
  - 跨域资源共享（CORS）
  - nginx代理跨域
  - nodejs中间件代理跨域
  - WebSocket协议跨域


## 5. CSRF

[参考](https://segmentfault.com/a/1190000008505616)

CSRF（Cross-site request forgery，中文为**跨站请求伪造**）是一种利用网站可信用户的权限去执行未授权的命令的一种恶意攻击。通过**伪装可信用户的请求来利用信任该用户的网站**。


- 产生原理

  要完成一个CSRF攻击，必须具备以下几个条件：

  - 受害者已经登录到了目标网站（你的网站）并且没有退出
  - 受害者有意或者无意的访问了攻击者发布的页面或者链接地址

- 如何防范

  防范CSRF攻击，其实本质就是要求网站**能够识别出哪些请求是非正常用户主动发起的**。这就要求我们**在请求中嵌入一些额外的授权数据，让网站服务器能够区分出这些未授权的请求**。

  主要是通过令牌同步模式（Synchronizer token pattern，简称STP），在用户请求的页面中的所有表单中嵌入一个token，在服务端验证这个token。token可以是任意的内容，但是一定要保证无法被攻击者猜测到或者查询到。攻击者在请求中无法使用正确的token，因此可以判断出未授权的请求。


## 6. 闭包

闭包这个概念真的是重要又难懂。每次接触都会有新的收获，但是总是似懂非懂的感觉。今天一定要把它啃下来，弄清楚弄明白。参考阮一峰大神的[博客](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)。

在js中，函数内部是可以读取全局变量，但是在函数外部是无法访问函数内的局部变量的。这个是由js的“链式作用域”结构决定的。在这个结构中，子元素会一级一级的往上寻找所有父对象的变量，父元素的所有变量对于子元素来说都是可见的，但是子元素内的变量父元素是不可见的。

当我们需要访问函数内部的变量时，怎么解决呢？

```javascript
function f1(){

	var n=999;

	function f2(){
		alert(n); 
	}

	return f2;

}
var result=f1();

result(); // 999
```

解决方法是在函数内部在定义一个函数。拿上面的代码为例，f2()作为f1()的子元素，f2是可以访问到f1中的局部变量。既然f2可以读取到f1()内的局部变量，那么把f2()当作返回值返回，在f1()外面也能访问f1()内部局部变量了。

而上面例子中的f2()，就是闭包。

闭包简单的说，就是沟通函数内外部的一座桥梁，使得函数内部的数据能被访问。实现类似getter的功能。

至于闭包的用途，主要有两个方面：一是为读取函数内部局部变量提供可能；二就是让这些局部变量的值继续储存在内存中。我们结合一段代码去理解这句话。

```javascript
function f1(){

	var n=999;
	
    nAdd=function(){n+=1}

	function f2(){
		alert(n);
	}

	return f2;
	}

var result=f1();

result(); // 999

nAdd();

result(); // 1000
```

result运行了两次，一次输出的值为999，一次输出的值为1000。说明f1中的局部变量n一直存在内存中，没有被回收。因为f2被赋值给了一个全局变量，它会一直在内存中。而f1是f2的父函数，f2的存在是依赖于f1的，所以n会一直呆在内存中。


## 7. this

this指的是函数运行时的环境。

直白点说：**this 指向最后一个调用它的对象，如果没有谁调用这个函数，this 指向 window** 。

而在js中有`call`、`apply`和`bind`三种方法，可以改变this的指向。

摘抄自[https://blog.csdn.net/wulex/article/details/81774494](https://blog.csdn.net/wulex/article/details/81774494)

- `call 、bind 、 apply` 这三个函数的第一个参数都是 `this` 的指向对象，第二个参数差别就来了：
- `call`的参数是直接放进去的，第二第三第`n`个参数全都用逗号分隔，直接放到后面 `obj.myFun.call(db,'成都', ... ,'string' )；`
- `apply`的所有参数都必须放在一个数组里面传进去 `obj.myFun.apply(db,['成都', ..., 'string' ]);`
- `bind`除了返回是函数以外，它 的参数和`call` 一样。


## 8. new

new一个对象，这其中发生了什么？

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
3. 执行构造函数中的代码（为这个新对象添加属性） ；
4. 返回新对象。

更加详细的过程见[传送门](https://zhuanlan.zhihu.com/p/23987456)



## 9. JS原型链

[「每日一题」什么是 JS 原型链？](https://zhuanlan.zhihu.com/p/23090041?refer=study-fe)

原型链主要是用来进行继承。我们如果想让一个对象继承另外一个对象的属性，就可以利用原型链，将新建对象的`_proto_`指向你想要继承对象的`prototype`就行。

因为js里对象的「读」操作是沿着原型链进行搜索的，新对象中没有的属性，js引擎会顺着原型链一级一级的往前找，直到找到该属性或者`_proto_==null`。所以这样能实现继承。


## 10. Event Loop

摘自：[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

Event Loop（事件循环），js是一种单线程的语言，也就意味着js里面的任务得排着队一件一件的完成，为了提高工作的效率，模拟异步操作，event loop应运而生。

程序猿将林林总总的任务分成来两类：

- 同步任务
- 异步任务

![img](/in-post/15fdd88994142347)

也就是说任务进到执行栈之后，会根据其类型去到不同的地方。同步任务会进入主线程，而异步任务则会去到Event Table，并注册回调函数。等异步任务完成自己的事情的时候，Event Table会把它刚注册的回调函数送到Event Queue中。而主线程里面的任务全都完成后，就会检查Event Queue里面读取函数，调到主线程中执行。

但实际上除了同步异步之分，我们对任务还有更加精细的定义：

- 宏任务（macro-task）：包括整体代码script，setTimeout，setInterval
- 微任务（micro-task）：Promise，process.nextTick

不同类型的任务会进入对应且不同的Event Queue。

![img](/in-post/15fdcea13361a1ec)


## 11. 如何理解HTML语义化

一开始我也觉得很奇怪，明明div+命名准确的class或者id，也能完成类似语义化标签的功能。为什么要这么麻烦的新加这么一个概念呢？直到我看了《HTML5和CSS3基础教程（第8版）》，才知道自己的想法是多么的肤浅。

对于前端开发人员来说，使用语义化标签主要有以下优点：

1. 代码格式优雅，页面结构会更加清晰，容易阅读和理解。
2. 在团队开发中，便于维护开发。大家遵循同一套标准去开发，可以减少代码之间的差异性，提高开发效率，有利于模块化开发。
3. 有利于SEO。语义化标签使得网页容易被爬虫解析，和搜索引擎建立良好的沟通，提高网站的访问量。
4. 方便其他设备解析，如屏幕阅读器、移动设备等。

如何使用语义化标签？

摘自：[https://www.cnblogs.com/limengjie0104/p/9077352.html](https://www.cnblogs.com/limengjie0104/p/9077352.html)

![img](/in-post/1316138-20180523160059784-788183187-1553268156194.png)



## 12. meta viewpoint

手机浏览器把页面放在一个虚拟的窗口中进行展示，而这个虚拟的窗口就是viewpoint。通常这个虚拟的窗口会比手机屏幕要宽，因为移动设备的分辨率相对电脑桌面来说一般是较小的，这样的设置可以只显示网页的其中一部分且保持其在电脑上的浏览效果，用户通过平移或者缩放来浏览全部网页。

常用用法如下：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />
```

| 属性名        | 备注                                                         |
| ------------- | ------------------------------------------------------------ |
| width         | 设置layout viewport 的宽度，为一个正整数，使用字符串”width-device”表示设备宽度 |
| initial-scale | 设置页面的初始缩放值，为一个数字，可以带小数                 |
| minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数                 |
| maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数                 |



## 13. CSS盒式模型

CSS中的盒式模型主要有两种：W3C的标准盒式模型和IE的盒式模型

![img](/in-post/20180324150509906.jpg)

**在标准的盒子模型中，width指content部分的宽度**

![img](/in-post/20180324150533356.jpg)

**在IE盒子模型中，width表示content+padding+border这三个部分的宽度**

我们在实际开发的时候可以通过`box-sizing`切换要用的盒式模型

`box-sizing: content-box` 是W3C盒子模型 (box-sizing 默认属性为content-box)

`box-sizing: border-box` 是IE盒子模型



## 14. 如何垂直居中

```css
.vertical-center {
  height:200px;
  width:20px;
  position:relative;
  top:50%;
  left:50%;
  margin-top:-100px;
  margin-left:-100px;
}
```

## 15. flex布局及常用属性

[传送门](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

**基本概念：**

![](/in-post/1552478974772.png)

| 容器的属性：    |                                                              |
| :-------------- | :----------------------------------------------------------- |
| flex-direction  | 决定主轴的方向，就是项目的排列方向。值为`row|row-reverse|column|column-reverse` |
| flex-wrap       | 定义项目在一条轴线上排列不下时的换行方式。值为`nowrap|wrap|wrap-reverse` |
| flex-flow       | flex-direction+flex-wrap的缩写形式。默认值为`row wrap`       |
| justify-content | 定义项目在主轴上的对齐方式。值为`flex-start|flex-end|center|space-between|space-around` |
| align-items     | 定义项目在交叉轴上的对齐方式。值为`flex-start|flex-end|center|baseline|stretch` |
| align-content   | 定义多条轴线的排列方式。值为`flex-start|flex-end|center|stretch|space-between|space-around` |



| 项目的属性  |                                                              |
| ----------- | ------------------------------------------------------------ |
| order       | 定义项目在容器内的排列顺序。数值越小，排得越靠前，默认为0。  |
| flex-grow   | 定义项目的放大比例，默认为0，即如果有剩余空间，也不放大。    |
| flex-shrink | 定义项目的缩小比例，默认为1，即如果没有剩余空间，项目将会缩小。 |
| flex-basis  | 定义了在分配剩余空间之前，项目占据的主轴空间。浏览器根据这个属性计算主轴是否有空余的空间。默认为auto，即项目原本的大小。 |
| flex        | flex-grow+flex-shrink+flex-basis的简写形式，默认值为`0 1  auto`，有两个快捷值：`auto（1 1 auto）`和`none（0 0 auto）`。 |
| align-self  | 允许单个项目有和其他项目不同的对齐方式，可覆盖`align-items`属性。默认值为auto，即继承父元素的`align-items`属性。 |


  