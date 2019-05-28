---
prev: /front-end/
next: 
---

# 前端设计模式(中)

书接上文。

## 4. 工厂模式

**概念：**

工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建自己的对象类型（抽象工厂）。常用在创建对象的流程赋值。

**作用：**

1. 应对对象的构建十分复杂时的情景
2. 需要依赖具体的环境创建不同的实例
3. 处理大量具有相同相同属性的小对象

**注意事项：**

不能滥用工厂，有时候只会给代码增加复杂度

**代码：**

```javascript
//简单工厂模式
let XMLHttpFactory=function () {

};
XMLHttpFactory.createXMLHttp=function () {
  let XMLHttp=null;
  if(window.XMLHttpRequest){
    XMLHttp=new XMLHttpRequest();
  }
  else if(window.ActiveXObject){
    XMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return XMLHttp;
};
let AjaxHander=function () {
  let XMLHttp=XMLHttpFactory.createXMLHttp();
  return XMLHttp;
};

//抽象工厂模式
let XMLHttpFactory=function () {

};
//提供一个抽象类
XMLHttpFactory.prototype={
  createFactory:function () {
    throw new Error('This is an abstract class');
  }
};
//继承原来的抽象类
let XHRHandler=function () {
  XMLHttpFactory.call(this);
};
XHRHandler.prototype=new XMLHttpFactory();
XHRHandler.prototype.constructor=XHRHandler;
//重新定义createFactory方法
XHRHandler.prototype.createFactory=function () {
  let XMLHttp=null;
  if(window.XMLHttpRequest){
    XMLHttp=new XMLHttpRequest();
  }
  else if(window.ActiveXObject){
    XMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return XMLHttp;
};
let AjaxHander=function () {
  let XMLHttp=XMLHttpFactory.createXMLHttp();
  return XMLHttp;
};

```



## 5. 代理模式

**概念：**

为其他对象提供一种代理以控制对这个对象的访问。顾名思义就是帮助别人做事。代理模式使得代理对象控制具体对象的引用。

**作用：**

1. 远程代理（一个对象将不同空间的对象进行局部代理）
2. 虚拟代理（根据需要创建开销很大的对象如渲染网页暂时用占位代替真图）
3. 安全代理（控制真实对象的访问权限）
4. 智能指引（调用对象代理处理另外一些事情如垃圾回收机制）

**注意事项：**

不能滥用设计模式，有时候只会给代码增加复杂度

**代码：**

```javascript
//代理模式
function seller(buyer) {
  this.buyerName=buyer.name;
  this.sell=function (money) {
    console.log("收到了来自【"+this.buyerName+"】的"+money+"人民币");
  }
}
function buyer() {
  this.name='tom';
}
function agent() {

}
agent.prototype.sell=function () {
  new seller(new buyer()).sell("20元");
};

(new agent).sell();
```



## 6. 命令模式

**概念：**

命令模式用来对方法调用进行参数化处理和传送，经过这样处理过的方法调用可以在任何需要的时候执行。也就是说该模式旨在将函数的调用、请求和操作封装成一个单一的对象，然后对这个对象进行一系列的处理。它可以消除调用操作的对象和实现操作的对象之间的耦合。为各种具体的类的更换带来了极大的灵活性。

**作用：**

1. 将函数的封装、请求、调用结合为一体
2. 调用具体的函数解耦命令对象和接收对象
3. 提高程序模块化的灵活性

**注意事项：**

不需要接口一致，直接调用函数即可，以免造成浪费

**代码：**

```javascript
//命令模式
let army={};
army.cavalry=function (num) {
  console.log("出动"+num+"骑兵");
};
army.infantry=function (num) {
  console.log("出动"+num+"步兵");
};
army.leader=function (order) {
  army[order.type](order.num);
};
army.leader({
  type:'cavalry',
  num:100
});
army.leader({
  type:'infantry',
  num:50
});
```

