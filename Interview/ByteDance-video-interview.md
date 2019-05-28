---
prev: /Interview/
next: /Interview/ByteDance-video-interview.md
---

# 字节跳动视频一面总结


面试官是个小哥哥，人挺好的，也很亲切。过程中就算卡壳也给了我很多时间，还偶尔会提醒我，引导我的思路，整体的体验很好。一共面了50分钟左右，题目感觉都不是特别难。就是自己太菜了哈哈，很多知识虽然都懂但是问深了就被问倒了，继续学习吧。主要的问题是基础太薄弱了，js方面的很多细节没有深入的去看。红宝书要开始看了。按照原定的节奏来吧，everything will be better.


## 1. 开始

开始面试官问了学习前端遇到什么问题，然后有没有做过一些项目，说一下项目内容和你主要负责的部分。

随便巴拉巴拉的说了一些，说了js上面很多小概念，对很多原理不是很清楚，语法掌握的不是很透彻；项目说了博客，但是实在没什么好说的...边说的时候就边在想，得把尽快写几个小项目才行。


## 2. JS基本数据类型

String Number Boolean null undefined Symbol


## 3. ==  和 === 的区别

`==`在判断前会进行类型转换，在转换后再进行值的比较。`===`的判断会更加严格，如果类型不等就会返回false。

然后面试官问了几个`==`的隐式转换:

```js
  [] == false // true
  {} == false // false
  [0] == false // true
  [1] == [1]  // fasle
```

主要是以下规则：

摘自：

[https://www.cnblogs.com/nanchen/p/7905528.html](https://www.cnblogs.com/nanchen/p/7905528.html)

[https://blog.csdn.net/qq_37016928/article/details/79882179](https://blog.csdn.net/qq_37016928/article/details/79882179)

- 首先看双等号前后有没有NaN，如果存在NaN，一律返回false。
- 再看双等号前后有没有布尔，有布尔就将布尔转换为数字。（false是0，true是1）
- 接着看双等号前后有没有字符串, 有三种情况：
  - 对方是对象，对象使用toString()或者valueOf()进行转换；
  - 对方是数字，字符串转数字；
  - 对方是字符串，直接比较；
  - 其他返回false
- 如果是数字，对方是对象，对象取valueOf()或者toString()进行比较, 其他一律返回false
- null, undefined不会进行类型转换, 但它们俩相等

![1553345993718](/in-post/1553345993718.png)

所以：

- `[]==false`

  先是false=>0；然后对象[]=>'''；然后""=>0；0==0；所以true

- ` {} == false`

  false=>0 ;{}=>"[object Object]"=>NaN；所以false

- `[0] == false`

  false=>0；[0]=>0；0==0；所以true

- `[1]==[1]`

  两个引用类型的话比较的是地址，两个变量的地址不等，所以false

## 4. this指向

```js
window.name = 'ByteDance'; 
function A () {
   this.name = 123;
}
A.prototype.getA = function(){
    console.log(this);
    return this.name + 1;
} 
let a = new A(); 
let funcA = a.getA;
funcA.name = 'AAA';
funcA();//window
this.funcA;//undefined
```

this的指向问题，我上一篇博客说过了。总结来说，直接通过函数名来调用函数，this指向全局变量window；通过对象.函数名调用函数，this指向该对象。


## 5. 编程题

// getSum([1, '2', [3, [4, 5]]])
// => 13

就是求数组里面所有数字的和

```js
function getSum(arr) {
    let sum=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i] instanceof Array)
            sum=sum+getSum(arr[i]);
        else if(typeof (arr[i])==='string')
            continue;
        else
            sum=sum+parseInt(arr[i]);
    }
    return sum;
}
```

## 6. HTTP 常见 method

问到的是这几个：GET POST DELETE PUT OPTIONS

OPTIONS真的是一脸懵逼，没听过...

其实一共15个method，详情见传送门

[https://blog.csdn.net/biglxl/article/details/79620074](https://blog.csdn.net/biglxl/article/details/79620074)


## 7. 编程题

给定无序、不重复的数组 data，取出n个数，使其相加和为sum?

这个我查了一下是一道经典的js算法，下面是完整的实现。因为太长了，这里就先留个坑，回头再填。

```js
function getCombBySum(array,sum,tolerance,targetCount){
  /*
  array： 数据源数组，必选；
  sum： 相加的和，必选；
  tolerance： 容差，如果不指定此参数，则相加的和必须等于sum参数，指定此参数可以使结果在容差范围内浮动，可选；
  targetCount： 操作数数量，如果不指定此参数，则结果包含所有可能的情况，指定此参数可以筛选出固定数量的数相加，假如指定为3，那么结果只包含三个数相加的情况，可选；
  返回值： 返回的是数组套数组结构，内层数组中的元素是操作数，外层数组中的元素是所有可能的结果；
  */
  var util = {
    /*
      get combination from array
      arr: target array
      num: combination item length
      return: one array that contain combination arrays
    */
    /*获取所有的可能组合
    如果是[1,2,3,4,5]取出3个，那么可能性就有10种 C(5,3)= C(5,2)
    公式： 
    全排列  P(n,m)=n!/(n-m)!
    组合排列 P(n,m)=n!/m!/(n-m)!
    C(5,2)=5!/2!*3!=5*4*3*2*1/[(2*1)*(3*2*1)]=10
    这是使用了循环加递归做出了组合排序
    */
    getCombination: function(arr, num) {  //  索引数组 操作数数量
      var r=[];
      (function f(t,a,n){
          if (n == 0) return r.push(t);
          for (var i=0,l=a.length; i<=l-n; i++) {
              f(t.concat(a[i]), a.slice(i+1), n-1);
        }
      })([],arr,num);
      return r;
    },
    // 获取数组的索引
    getArrayIndex: function(array) {
      var i = 0,
        r = [];
      for(i = 0;i<array.length;i++){
        r.push(i);
      }
      
      return r;
    }
  },logic = {
    //  对数组进行排序
    //  获取数组中比sum小的数
    init: function(array,sum) {  //初始化去除不可能的元素
      // clone array
      var _array = array.concat(),
      r = [],
      i = 0;
      // sort by asc
      _array.sort(function(a,b){
        return a - b;
      });
      // 当它小于或等于总和时获得所有数字
      for(i = 0;i<_array.length;i++){
        if(_array[i]<=sum){
          r.push(_array[i]);
        }else{
          break;
        }
      }
      console.log('初始化后的数据源:', r);
      return r;
    },
    // important function
    core: function(array,sum,arrayIndex,count,r){
      var i = 0,
        k = 0,
        combArray = [],
        _sum = 0,
        _cca = [],
        _cache = [];
      
      if(count == _returnMark){
        return;
      }
      // 获取当前的计数总和
      // 这里排序的不是原来的数组,而是求的索引后的数组
      combArray = util.getCombination(arrayIndex,count);
      console.log('getCombination返回的值：', combArray);
      for(i = 0;i<combArray.length;i++){
        _cca = combArray[i];
        _sum = 0;
        _cache = [];
        // calculate the sum from combination
        for(k = 0;k<_cca.length;k++){
          _sum += array[_cca[k]];
          _cache.push(array[_cca[k]]);
        }
        if(Math.abs(_sum-sum) <= _tolerance){
          r.push(_cache);
        }      
      }

      logic.core(array,sum,arrayIndex,count-1,r);
    }
  },
    r = [],
    _array = [],
    _targetCount = 0,
    _tolerance = 0,
    _returnMark = 0;
    
    // check data
  _targetCount = targetCount || _targetCount;
  _tolerance = tolerance || _tolerance;
  
  _array = logic.init(array,sum);
  if(_targetCount){
      _returnMark = _targetCount-1;
  }
  console.log('_targetCount的值:', _targetCount);
  console.log('_returnMark的值:', _returnMark);

  logic.core(_array,sum,util.getArrayIndex(_array),(_targetCount || _array.length),r);

  return r;
}
```

## 8. margin 塌陷

在文档流中，父元素的高度默认是被子元素撑开的。也就是说 子元素有多高，父元素就有多高。但是当子元素设置浮动之后，子元素会完全脱离文档流。此时将会导致子元素无法撑开父元素的高度，导致父元素高塌陷。

解决方法：

- 触发父元素的BFC
- 给父元素加上边框，如果不希望看到颜色，就把边框背景设成透明。


## 9. 变量提升

理解变量提升，关键要明确以下2点：

- javascript代码并不是一行一行往下执行的；
- javascript执行分为2个步骤: 编译(词法解释/预解释)和执行

```js
var name = 'A';
function log() {
    console.log(name);
		name='B';
}
log();
```

输出A，这个很简单，函数内部是可以访问函数外部变量的。

```js
var name = 'A';
function log() {
    console.log(name);
		var name='B';
}
log();

//编译后：
function log() {
  	var name;
    console.log(name);
		name='B';
}
var name = 'A';
log();
```

输出undefined。注意的是这里的函数声明也进行了提升。


```js
var name = 'A';
function log() {
    console.log(name);
  	let name='B';
}
log();
```

会报错。let存在一个暂时性死区，在初始化之前无法访问。至于let会不会变量提升，暂时好像是没有定论的。


```js
var name = 'A';
function name() {}
function log() {
    console.log(name);
}
log();
```

输出A。 因为当出现同名的函数声明，变量声明的时候， 变量声明与函数声明都会提升**。**函数声明会覆盖变量声明，但不会覆盖变量赋值，即：如果声明变量的同时初始化或赋值那么变量优先级高于函数。