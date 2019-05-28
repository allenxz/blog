---
prev: /JavaScript/
next: 
---

# 《红宝书》读书笔记


基础真的很重要，尤其是js。想想都觉得惭愧，说是要走前端方向，js基础一点都不牢固，只是会一些基本的使用而已，而且还很不熟练。所以今天开始把那几本出名的国外js教材认认真真的去啃一下。第一本就是《javascript高级程序语言设计》。这本书的pdf我晚点会放在资源板块那，有需要的话可以去下载。


## 第一章 JavaScript简介

### 1. JavaScript实现

主要的结构如下：

![1553431287471](/in-post/1553431287471.png)

- ECMAScript，简单来说就是ECMA协会召集各方程序员制定的一种脚本语言规范，提供核心语言功能。
- 文本对象模型（DOM，Document Object Model），将整个页面映射成一个多层节点结构，这样通过DOM提供的API，程序猿就能很容易地增删查改页面上任何一个节点。
- 浏览器对象模型（BOM，Browser Object Model），提供与浏览器交互的接口和方法。


## 第二章 在HTML中使用JavaScript

需要注意的地方比较少，主要是以下几点：

- 当使用`<script>`的src属性引入外部js文件的时候，不要在`<script>`和`</script>`之间嵌入其他js代码。如果嵌入了，这个标签只会下载并执行外部js文件，而嵌入的代码会被省略。
- `<script>`标签的src属性是可以跨域的。jsonp跨域就是利用了这个。
- `<script>`标签一般放在`<body>`元素中页面内容的后面。这样可以减少浏览器因为执行js代码而出现一片空白的时间，优化用户体验。


## 第三章 基本概念

### 1. 块级注释常用写法

```js
/*
 * 这是一个多行
 * （块级）注释
 */
```


### 2. 关键字和保留字

关键字：

```markdown
break      do        instanceof   typeof
case       else      new          var
catch      finally   return       void
continue   for       switch       while
debugger*  function  this with
default    if        throw
delete     in        try
```



保留字：

```markdown
abstract    enum        int         short
boolean     export      interface   static
byte        extends     long        super
char        final       native      synchronized
class       float       package     throws
const       goto        private     transient
debugger    implements  protected   volatile
double      import      public   
//ES5新增
let         yield
```



### 3. 变量

- var定义的是在其作用域的局部变量。而不加标识符，可以创建全局变量（不建议使用）。

- 可以用一条语句连续定义不同类型的变量

  ```javascript
  var str='hi',num=100,flag=true;
  ```


### 4.  数据类型

基本类型：Undefined、String、Number、Boolean、Null

复杂数据类型：Object



### 5. typeOf操作符

注意`typeOf(null)`返回的是`Object`。因为null逻辑上代表的是一个空对象指针。



### 6. Undefined类型

Undefined类型只有一个值--undefined，表示一个变量未初始化或者未定义。

var一个变量之后没赋值的话，它的值会默认取undefined。


### 7. Null类型

Null类型也只有一个值--null。null指的是空对象指针。如果我们定义的变量将来是打算用于保存对象的，那么最好将其初始化为null，这样就可以通过检测其值是否为null，来判断该变量是否已经保存了一个对象的引用。


### 8. Boolean类型

所有类型都能通过转型函数`Boolean()`转换成Boolean类型，下面是转换规则：

| 数据类型  | 转换成true的值           | 转换成false的值 |
| --------- | ------------------------ | --------------- |
| Boolean   | true                     | false           |
| String    | 任何非空字符串           | ""（空字符串）  |
| Number    | 任何非零值（包括无穷大） | 0和NaN          |
| Object    | 任何对象                 | null            |
| undefined | n/a(没有对应的值)        | undefined       |

流控制语句（如if语句）会自动执行相关的Boolean转换。


### 9. Number类型

- 整数

  Number类型的基本数值字面量是十进制，但是也能通过0或者0x开头，以八进制或者十六I进制作为字面量表示整数（在非严格模式下）。

- 科学记数法

  `var floatNum=3.125e7`。floatNum的实际值为31250000。

- `isFinite()`函数可以判断一个数是否有穷。

- NaN，即Not a Number，用于表示一个本应该返回数值的操作数未返回数值的情况。NaN有两个特性：①任何涉及到NaN的操作都会返回NaN。②NaN和任何值都不等，包括NaN本身。

- Number()函数转换规则

  - 如果是Boolean 值，true 和false 将分别被转换为1 和0。
  - 如果是数字值，只是简单的传入和返回。
  - 如果是null 值，返回0。
  - 如果是undefined，返回NaN。
  - 如果是字符串，遵循下列规则：
    - 如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即"1"
      会变成1，"123"会变成123，而"011"会变成11（注意：前导的零被忽略了）；
    - 如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽
      略前导零）；
    - 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整
      数值；
    - 如果字符串是空的（不包含任何字符），则将其转换为0；
    - 如果字符串中包含除上述格式之外的字符，则将其转换为NaN。
  - 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换
    的结果是NaN，则调用对象的toString()方法，然后再次依照前面的规则转换返回的字符
    串值。

- parseInt()函数

  parseInt()从第一个非空格字符串开始检测，如果第一个字符不是数字字符或者符号则返回NaN（也就是说parseInt("")=NaN）。然后一直解析到非数字字符为止。八进制和十六进制可以被识别，但是出于规范考虑我们统一使用`parseInt("0xAF",16)`，即用第二参数来表明基数。即使是十进制，我们也建议加上10作为第二参数。

- parseFloat()函数

  parseFloat()和parseInt差不多。不过它处理时，字符串里的第一个小数点是有效的，但是之后的就无效了。


### 10. String类型

String()函数遵循下列转换规则：

- 如果值有toString()方法，则调用该方法（没有参数）并返回相应的结果；
- 如果值是null，则返回"null"；
- 如果值是undefined，则返回"undefined"


### 11. Object类型

Object 的每个实例都具有下列属性和方法。

- constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数（constructor）
  就是Object()。
- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例
  的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例
  如：o.hasOwnProperty("name")）。
- isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型（第5 章将讨论原
  型）。
- propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in 语句
  （本章后面将会讨论）来枚举。与hasOwnProperty()方法一样，作为参数的属性名必须以字符
  串形式指定。
- toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。
- toString()：返回对象的字符串表示。
- valueOf()：返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值
  相同。