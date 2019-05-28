---
prev: /front-end/
next: /front-end/FE-coding-specification.md
---

# 常见浏览器兼容性问题


::: tip 前言
由于市场上浏览器种类众多，而不同浏览器其内核亦不尽相同，所以各个浏览器对网页的解析就有一定出入，这也是导致浏览器兼容问题出现的主要原因.
:::

### 兼容性分类

对浏览器兼容问题，一般分，HTML，Javascript兼容，CSS兼容。 其中html相关问题比较容易处理，无非是高版本浏览器用了低版本浏览器无法识别的元素，导致其不能解析，所以平时注意一点就是。下面我们主要说的是CSS兼容问题

### 问题&解决方案
::: warning  问题一
不同浏览器的标签默认的外补丁和内补丁不同
:::

问题症状：随便写几个标签，不加样式控制的情况下，各自的margin 和padding差异较大  
碰到频率:100%  
解决方案：css里 `*{margin:0;padding:0;}`  
备注：这个是最常见的也是最易解决的一个浏览器兼容性问题，几乎所有的css文件开头都会用通配符*来设置各个标签的内外补丁是0。

::: warning  问题二
块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大  
:::

问题症状:常见症状是ie6中后面的一块被顶到下一行  
碰到频率：90%（稍微复杂点的页面都会碰到，float布局最常见的浏览器兼容问题）  
解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性  
备注：我们最常用的就是div+css布局了，而div就是一个典型的块属性标签，横向布局的时候我们通常都是用div float实现的，横向的间距设置如果用margin实现，这就是一个必然会碰到的兼容性问题。  

::: warning  问题三
设置较小高度标签（一般小于10px），在ie6，ie7，遨游中高度超出自己设置高度 
:::

问题症状：ie6、7和遨游里这个标签的高度不受控制，超出自己设置的高度  
碰到频率：60%  
解决方案：给超出高度的标签设置`overflow:hidden;`或者设置行高`line-height `小于你设置的高度。  
备注：这种情况一般出现在我们设置小圆角背景的标签里。出现这个问题的原因是ie8之前的浏览器都会给标签一个最小默认的行高的高度。即使你的标签是空的，这个标签的高度还是会达到默认的行高。  

::: warning  问题四
行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，ie6间距bug（类似第二种）
:::

问题症状：ie6里的间距比超过设置的间距  
碰到几率：20%  
解决方案：在`display:block;`后面加入`display:inline;display:table; ` 
备注：行内属性标签，为了设置宽高，我们需要设置`display:block;`(除了input标签比较特殊)。在用float布局并有横向的margin后，在ie6下，他就具有了块属性float后的横向`margin`的bug。不过因为它本身就是行内属性标签，所以我们再加上`display:inline`的话，它的高宽就不可设了。这时候我们还需要在`display:inline`后面加入`display:talbe`。  

::: warning  问题五
图片默认有间距
:::

问题症状：几个img标签放在一起的时候，有些浏览器会有默认的间距，加上问题一中提到的通配符也不起作用。  
碰到几率：20%  
解决方案：使用float属性为img布局  
备注：因为img标签是行内属性标签，所以只要不超出容器宽度，img标签都会排在一行里，但是部分浏览器的img标签之间会有个间距。去掉这个间距使用float是正道  

::: warning  问题六
标签最低高度设置min-height不兼容
:::

问题症状：因为min-height本身就是一个不兼容的css属性，所以设置min-height时不能很好的被各个浏览器兼容  
碰到几率：5%  
解决方案：如果我们要设置一个标签的最小高度200px，需要进行的设置为：

``` css
{
     min-height:200px;
     height:auto !important; 
     height:200px; 
     overflow:visible;
}  
```

备注：在B/S系统前端开时，有很多情况下我们有这种需求。当内容小于一个值（如300px）时。容器的高度为300px；当内容高度大于这个值时，容器高度被撑高，而不是出现滚动条。这时候我们就会面临这个兼容性问题。  


::: warning  问题七
透明度的兼容css设置
:::

方法是：每写一小段代码（布局中的一行或者一块）我们都要在不同的浏览器中看是否兼容，当然熟练到一定的程度就没这么麻烦了。建议经常会碰到兼容性问题的新手使用。很多兼容性问题都是因为浏览器对标签的默认属性解析不同造成的，只要我们稍加设置都能轻松地解决这些兼容问题。如果我们熟悉标签的默认属性的话，就能很好的理解为什么会出现兼容问题以及怎么去解决这些兼容问题。

### 技巧

::: tip  技巧一
css hack
:::

使用hacker 我可以把浏览器分为3类：ie6 ；ie7和遨游；其他（ie8 chrome ff safari opera等）

ie6认识的hacker 是下划线_ 和星号 *  
ie7 遨游认识的hacker是星号 * （包括上面问题6中的 !important也算是hack的一种。不过实用性较小。）  
比如这样一个css设置 `height:300px;*height:200px;_height:100px;  `
ie6浏览器在读到 `height:300px`的时候会认为高时300px；继续往下读，他也认识`*heihgt`， 所以当ie6读到 `*height:200px`的时候会覆盖掉前一条的相冲突设置，认为高度是200px。继续往下读，ie6还认识`_height`,所以他又会覆盖掉200px高的设置，把高度设置为100px；  
ie7和遨游也是一样的从高度300px的设置往下读。当它们读到`*height:200px`的时候就停下了，因为它们不认识`_height`。所以它们会把高度解析为200px；  
剩下的浏览器只认识第一个`height:300px`;所以他们会把高度解析为300px。  

``` css
//因为优先级相同且相冲突的属性设置后一个会覆盖掉前一个，所以书写的次序是很重要的。

/* CSS属性级Hack */ 
color:red; /* 所有浏览器可识别*/

_color:red; /* 仅IE6 识别 */

*color:red; / * IE6、IE7 识别 */

+color:red; /* IE6、IE7 识别 */

*+color:red; / * IE6、IE7 识别 */

[color:red; /* IE6、IE7 识别 */ 

color:red\9; /* IE6、IE7、IE8、IE9 识别 */

color:red\0; /* IE8、IE9 识别*/

color:red\9\0; /* 仅IE9识别 */

color:red \0; /* 仅IE9识别 */

color:red!important; /* IE6 不识别!important 有危险*/

/* CSS选择符级Hack */ 
*html #demo { color:red;} / * 仅IE6 识别 */

*+html #demo { color:red;} / * 仅IE7 识别 */

body:nth-of-type(1) #demo { color:red;} /* IE9+、FF3.5+、Chrome、Safari、Opera 可以识别 
*/ 
head:first-child+body #demo { color:red; } /* IE7+、FF、Chrome、Safari、Opera 可以识别 */

:root #demo { color:red\9; } : /* 仅IE9识别 */
```

tips:越少的浮动，就会越少的代码，会有更灵活的页面，会有扩展性更强的页面。这不多说，归结为到一定水平了，浮动会用的较少。另外，您也会避免使用浮动+margin的用法。所以，越后来越不易遇到这种bug。

::: tip  技巧二
padding，marign，height，width
:::

注意是技巧，不是方法： 写好标准头  
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”> http://www.w3.org/1999/xhtml”> 尽量用padding，慎用margin，height尽量补上100%，父级height有定值子级height不用100%，子级全为浮动时底部补个空clear:both的div宽尽量用margin，慎用padding，width算准实际要的减去padding

::: tip  技巧三
显示类（display:block,inline）
:::

display:block,inline 两个元素

``` css
display:block; //可以为内嵌元素模拟为块元素

display:inline; //实现同一行排列的的效果

display:table; //for FF,模拟table的效果
```

display:block块元素，元素的特点是： 总是在新行上开始；高度，行高以及顶和底边距都可控制；宽度缺省是它的容器的100%，除非设定一个宽度  

display:inline就是将元素显示为行内元素，元素的特点是：和其他元素都在一行上；高，行高及顶和底边距不可改变；宽度就是它的文字或图片的宽度，不可改变。span，a，label，input，img，strong和em是 inline 元素的例子  

::: tip  技巧四
怎样使一个div层居中于浏览器中？
:::

(1)

``` html
<style type="text/css">

    div{
        position:absolute;
        top:50%;
        left:50%;
        margin:-100px 0 0 -100px;
        width:200px;
        height:200px;
        border:1px solid red; 
    }
</style>
```

(2)div里的内容，IE默认为居中，而FF默认为左对齐，可以尝试增加代码margin: 0 auto;

::: tip  技巧五
float的div闭合;清除浮动;自适应高度
:::

① 例如：＜div id="floatA">＜div id="floatB">＜div id="NOTfloatC">   

这里的NOTfloatC并不希望继续平移，而是希望往下排。(其中floatA、floatB的属性已经设置为float:left;)  
这段代码在IE中毫无问题，问题出在FF。原因是NOTfloatC并非float标签，必须将float标签闭合。在`＜divclass="floatB">` `＜div class="NOTfloatC">`之间加上`＜div class="clear">`这个div一定要注意位置，而且必须与两个具有float属性的div同级，之间不能存在嵌套关系，否则会产生异常。并且将clear这种样式定义为为如下即可：`.clear{clear:both;} ` 
②作为外部 wrapper 的 div 不要定死高度,为了让高度能自适应，要在wrapper里面加上`overflow:hidden; `当包含float的box的时候，高度自适应在IE下无效，这时候应该触发IE的layout私有属性(万恶的IE啊！)用`zoom:1;`可以做到，这样就达到了兼容。   
例如某一个wrapper如下定义：  

``` javascript
.colwrapper{overflow:hidden; zoom:1; margin:5px auto;}  
```

③对于排版,我们用得最多的css描述可能就是float:left.有的时候我们需要在n栏的float div后面做一个统一的背景,譬如:  

``` html
<div id="page">  
    <div id="left"></div>  
    <div id="center"></div>  
    <div id="right"></div>  
</div>
```

比如我们要将page的背景设置成蓝色,以达到所有三栏的背景颜色是蓝色的目的,但是我们会发现随着left centerright的向下拉长,而page居然保存高度不变,问题来了,原因在于page不是float属性,而我们的page由于要居中,不能设置成float,所以我们应该这样解决：

``` html
<div id="page">  
    <div id="bg" style="float:left;width:100%">  
        <div id="left"></div>
        <div id="center"></div>  
        <div id="right"></div>  
    </div>  
</div>
```

再嵌入一个float left而宽度是100%的DIV解决之。

④万能float 闭合(非常重要!)  

关于 clear float 的原理可参见 [How To ClearFloats Without Structural Markup],将以下代码加入Global CSS 中,给需要闭合的div加上class=”clearfix”即可,屡试不爽。

``` css
/* Clear Fix */ 
.clearfix:after { content:"."; display:block; height:0; clear:both;visibility:hidden; } 
.clearfix { display:inline-block; } 
/* Hide from IE Mac */ 
.clearfix {display:block;} 
/* End hide from IE Mac */ 
/* end of clearfix */
```

或者这样设置：`.hackbox{display:table; //将对象作为块元素级的表格显示}  `

::: tip  技巧六
div嵌套时 y轴上 padding和 marign的问题
:::


FF里 y 轴上 子div 到 父div 的距离为 父padding + 子marign  
IE里 y 轴上 子div 到 父div 的距离为 父padding 和 子marign 里大的一个  
FF里 y 轴上 父padding=0 且 border=0 时，子div 到 父div 的距离为0，子marign 作用到 父div 外面  

------

转自：[https://blog.csdn.net/xustart7720/article/details/73604651/](https://blog.csdn.net/xustart7720/article/details/73604651/)