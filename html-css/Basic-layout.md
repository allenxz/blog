---
prev: /html-css/
next: 
---

# CSS常见布局

为了给用户带来良好的阅读体验，优秀的布局是必不可少的。总结自：[学习CSS布局](http://zh.learnlayout.com/display.html)

## display

display属性是CSS中用来控制布局的最基本也是最重要的属性。每一个元素的display属性都有一个默认的值，大多数的元素其默认值不是block就是inline。

值为block的我们称为块级元素。一个块级元素会新开始一行并且尽可能撑满容器。常用的块级元素包括`div`、 `p` 、 `form` 和HTML5中的新元素： `header` 、 `footer` 、 `section`等等。

值为inline的我们称为行内元素，一个行内元素可以在段落中 包裹一些文字而不会打乱段落的布局。 `a` 元素是最常用的行内元素，它可以被用作链接。

display还有一个常见值为none，常被javascript用来在不删除元素的情况下隐藏或显示元素。

此外，虽然大多数的元素都有默认的display值，但这个值是可以重写的，也就是说我们可以随时改造一个块级元素成行内元素，反则反之。例如：我们把`li`改成行内元素，制作出水平菜单。



## max-width

假设我们给一个id为main的div加上如下的CSS：

```css
#main {
  width: 600px;
  margin: 0 auto; 
}
```

表面上看好像没什么问题，但是如果当浏览器窗口比div的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。这样看起来就很不美观，阅读感受不好。

![1552400505275](/in-post/1552400505275.png)

这时候，我们就能用上max-width来改进布局

```css
#main {
  max-width: 600px;
  margin: 0 auto; 
}
```

![1552400623783](/in-post/1552400623783.png)

改进之后无论怎么改变浏览器窗口，显示的页面都是完整的。



## box-sizing

接触盒模型的都会知道，虽然你给两个div设置一样大的width，但是他们的padding和border不同，它们的实际宽度还是会不一样。因为padding和border会把元素撑大。

那怎么解决这个问题呢？首先，你可以自己算，设置时将width减去padding和border的宽度。不想算怎么办，我们可以用到一个叫`box-sizing`的属性。当你设置一个元素为 `box-sizing: border-box;`时，此元素的内边距和边框不再会增加它的宽度。但是因为这是个比较新的属性，所以得像下面一样，用的时候加上前缀

```css
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
```

## position

position有很多值，但是都很简单，这里只稍微介绍一下。详细的见[传送门](http://zh.learnlayout.com/position.html)

- static。默认值，表示元素不会被特殊定位
- relative。设置为relative之后，通过设置`top`、`bottom`、`left`、`right`，使元素偏离原来的正常位置
- fixed。固定定位，即便页面滚动，元素还是会停留在你设定的位置
- absolute。相对于最近一个被定位的祖先元素（即position值不为static）而发生偏移，如果没有，则相对于body进行偏移。



## float和clear

float很好理解，浮动。而clear是用于控制浮动的。

我们使用float的时候，有时候会发现浮动的元素跑到别的元素上面去了，如下图，看起来就很不美观。

![1552443357176](/in-post/1552443357176.png)

clear属性的含义是禁止一侧（left或者right）或者两侧（both）出现浮动元素，如果有，当前元素将排斥浮动元素独占一行呈现.

以上图为例，div加了`float:left`跑到了section上面，两人叠在了一起。我们只需要给section加上`clear:left`就能把他们分开。

此外使用float还可能会遇到这样的问题：

![1552443794195](/in-post/1552443794195.png)

我们可以通过***clearfix hack***来解决这个问题

```css
.clearfix {
  overflow: auto;
  zoom: 1;/* if in IE6 */
}
```

![1552443988125](/in-post/1552443988125.png)



## 媒体查询

”响应式设计（Responsive Design） 是一种让网站针对不同的浏览器和设备“呈现”不同显示效果的策略，这样可以让网站在任何情况下显示的很棒！“

而媒体查询则是进行响应式设计的利器。我们看下面的例子：

```css
@media screen and (min-width:600px) {
  nav {
    float: left;
    width: 25%;
  }
  section {
    margin-left: 25%;
  }
}
@media screen and (max-width:599px) {
  nav li {
    display: inline;
  }
}
```

![1552446462849](/in-post/1552446462849.png)



![1552446494507](/in-post/1552446494507.png)

当浏览器变窄到无法容纳侧边栏中的菜单时，把布局显示成一列。这样的布局在移动设备浏览器上显示得也会非常棒。

此外，使用meta viewport能使布局在移动浏览器上显示得更好。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```





## inline-block

如果我们想要创建一堆网格浏览器，我们可以用float来实现，但是需要注意的是，接在网格后面的元素得留心，要加上clear来清除浮动。

如果你觉得clear这一步稍显麻烦的话，我们可以用display属性的inline-block值来完成这个需求。

**float：**

![1552471149565](/in-post/1552471149565.png)

**inline-block：**

![1552471171761](/in-post/1552471171761.png)

但是使用inline-block得注意一下几点：

- `vertical-align` 属性会影响到 `inline-block` 元素，你可能会把它的值设置为 `top` 。
- 你需要设置每一列的宽度
- 如果HTML源代码中元素之间有空格，那么列与列之间会产生空隙



## column

column是新的CSS属性，可以帮助你很轻松的实现文字的多列布局。

- column-count：把元素中的文本划分为X列
- column-gap：每列之间的宽度

```css
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

![1552472313294](/in-post/1552472313294.png)



