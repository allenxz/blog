---
prev: /front-end/
next: /front-end/FE-design-mode02.md
---

# 前端设计模式(上)

这一周都在写项目，博客没怎么写。今天整理一下前端项目里常见的设计模式。

## 什么是设计模式

所谓的设计模式，就是程序猿在开发时遇到问题时一般的解决方案。通俗的说，把各种需求比作是数学题，设计模式就是某类数学题的通解，比如解鸡兔同笼的时候我们用的抬脚法，解方程的时候用的因式分解。而且设计模式是经过长期重复实践得到的针对某个情况的最佳方案，通过这种设计模式来实现需求，能够使系统代码**可重用**、**可扩展**、**可解耦**、**可容易被人理解**且**保证代码可靠性**。



## 设计原则

设计模式存在的根本原因是为了代码复用，增加可维护性。而其中有如下原则：

- 【开闭原则】对扩展开放，对修改关闭
- 【里式转换原则】子类继承父类，单独调用完全可以运行
- 【依赖倒转原则】引用一个对象，如果这个对象有底层类型，直接引用底层
- 【接口隔离原则】每一个接口应该是一种角色
- 【合成/聚合复用原则】创建新的对象时应使用一些已有的对象，使其成为新对象的一个部分
- 【迪米特原则】一个对象应该对其他对象尽可能少的了解



## js中的设计模式

### 1.单例模式

**概念：**

单例就是保证一个类只有一个实例。实现方法一般是先判断实例是否存在，如果存在，直接返回存在的实例；如果不存在就创建了再返回。

**作用：**

1. 模块间通信
2. 保证系统中某个类的对象只有一个
3. 保护自己的属性和方法

**注意事项：**

1. 注意this的使用
2. 闭包容易造成内存泄露，不需要的要尽快处理掉
3. 注意new的成本（继承）

**代码：**

```javascript
//基于概念的代码示例
let a=(function(argument){
  let init=function(msg){
    this.content=msg;
  }
  let instance;
  let info={
    sendMessage:function(msg){
      if(!instance){
        instance=new init(msg);
      }
      return instance;
    }
  };
  return info;
})();

let b={
  callA:function(msg){
    let _a=a.sendMessage(msg);
    console.log(_a.content);
    _a=null;//等待垃圾回收
  }
};

b.callA('Hello!');

//实际应用下的代码示例
let top={
  init:function () {
    this.render();
    this.bind();
  },
  a:4,
  render:function () {
    let me=this;
    me.btnA=$('#a');
  },
  bind:function () {
    let me=this;
    me.btnA.click(function () {
      me.test();
    });
  },
  test:function () {
    a=3;
  }
};
```



### 2.构造函数模式

 **概念：**

构造函数用于创建特定类型的对象——不仅声明了使用的对象，构造函数还可以接受参数以便第一次创建对象的时候设置对象的成员值。也可以自定义自己的构造函数，然后在里面声明自定义类型对象的属性和方法。

**作用：**

1. 用于创建特定类型的对象
2. 第一次声明的时候给对象赋值
3. 自己声明构造函数，赋予属性和方法

**注意事项：**

1. 声明函数的时候处理业务逻辑
2. 区分和单例的区别，配合单例实现初始化
3. 构造函数建议首字母大写
4. 注意new的成本（继承），将一些公用部分放在原型链上，节约成本

**代码：**

```javascript
//构造函数模式
function Person(name,sex) {
  if(!(this instanceof Person)){
    return new Person();
  }
  let _name='无名';
  let _sex='未知';
  if(name){
    _name=name;
  }
  if(sex){
    _sex=sex;
  }
  this.name=_name;
  this.sex=_sex;
  this.show=function () {
    return "【名字】"+this.name+"【性别】"+this.sex;
  }
}
let wuMing=new Person();
console.log(wuMing.show());
let zhangSan=new Person('张三','男');
console.log(zhangSan.show());
```



### 3.建造者模式

**概念：**

建造者模式可以将一个复杂对象的构建与其表示相分离，使得相同的构建过程可以创建不同的表示。也就是说如果我们使用了建造者模式，那么用户只需要指定需要建造的类型就能得到对象，而具体的建造过程和细节就不需要知道了。

建造者模式主要用于“分步骤构建一个复杂的对象”，在这其中“分步骤”是一个稳定的算法，而复杂对象的各个部分则经常变化。关键概念是：“各司其职，拆解流程”。

**作用：**

1. 分步创建一个复杂的对象
2. 解耦封装过程和具体创建的组件
3. 无需关心组件如何组装

**注意事项：**

1. 一定要一个稳定的算法进行支持
2. 加工工艺是暴露的

**代码：**

其实jq的很多方法，像是`$.ajax`就是建造者模式。不过我们还是用原生的js来实现一下

```javascript
//建造者模式
function House() {
  this.bedroom='';
  this.bathroom='';
  this.livingroom='';
}
function Builder() {
  this.buildHouse=function (worker) {
    worker.buildBedroom();
    worker.buildBathroom();
    worker.buildLivingroom();
  }
}
function Worker() {
  this.buildBedroom=function () {
    console.log('卧室盖好了');
  };
  this.buildBathroom=function () {
    console.log('浴室盖好了');
  };
  this.buildLivingroom=function () {
    console.log('客厅建好了');
  };
  this.finish=function () {
    let _house=new House();
    _house.bedroom='finished';
    _house.bathroom='finished';
    _house.livingroom='finished';
    return _house;
  }
}
let worker=new Worker();
let builder=new Builder();
builder.buildHouse(worker);
let myHouse=worker.finish();
console.log(myHouse);
```

后面还有几个模式，由于篇幅缘故就放在下一篇博客了。共勉。

