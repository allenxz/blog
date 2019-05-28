---
prev: /Interview/
next: /Interview/ByteDance02.md
---

# 字节跳动2018校招前端方向笔试题(下)

书接上文，这篇记录的是一道设计题。设计一个TODO list小组件。

## 设计题

设计一个TODO List，页面结构如下图所示，要求：

1. 使用HTML与CSS完成界面开发
2. 实现添加功能：输入框中可输入任意字符，按回车后将输入字符串添加到下方列表的最后，并清空输入框
3. 实现删除功能：点击列表项后面的“X”号，可以删除该项
4. 实现模糊匹配：在输入框中输入字符后，将当前输入字符串与已添加的列表项进行模糊匹配，将匹配到的结果显示在输入框下方。如匹配不到任何列表项，列表显示空

**注：以上代码实现需要能在浏览器中正常显示与执行。**

![img](/in-post/300557_1504600345720_0731F532C5041A67ADDD38896EFDC6DD.png)

## 解题思路

我们分析一下需求：

- 设计页面（HTML+CSS）

  看上面的图片来设计就行

  - 首先是一个`<h>`---todos

  - 然后是一个`ul`,里面放两类`li`。一类是模糊匹配出来的元素，另外一类是添加到输入框下面的元素。

    注意，模糊匹配的元素和添加到输入框下面的元素样式不完全相同，差了个叉子；而且匹配到的元素在已经添加的元素上面。两类元素与输入值匹配的部分应为红色。

- JS

  - 实现添加

    添加功能比较简单，就是新建一个`li`往原本预留好的`ul`里面填就行

  - 模糊匹配

    模糊匹配的话则用正则表达式去匹配已经添加的元素，如果已添加的元素中含有输入框中的字符，就新建`li`,插到`ul`中去（注意是前插）

- 难点

  其实上面说的都比较容易实现，比较难一点的是一些元素的样式是动态的，得随着你在输入框键入的字符动态的发生变化，所以就得设置监听事件，在合适的地方将之前匹配的内容清除或者改变元素，然后再进行新一轮匹配。具体的看代码就行。


## 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>todolist</title>
</head>

<style>
* {
    margin: 0;
    padding: 0;
}

body {
    text-align: center;
}

.todo-list {
    margin-top: 20px;
}

input {
    width: 400px;
    height: 32px;
}

.list-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

#list {
    list-style: none;
    border: 1px solid rgba(0,0,0,0);
    width: 400px;
    min-height: 300px;
    max-height: 300px;
    overflow: auto;
}

ul li {
    text-align: left;
    margin: 2px;
    padding: 5px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(0,0,0,0);
}

ul li:hover {
    border: 1px solid black;
}

ul li .del{
    font-size: 1.4rem;
    line-height: 1.4rem;
    float: right;
    cursor: pointer;
}

ul li span:hover {
    zoom: 1.1;
}

</style>
<body>

    <div class="todo-list">
        <h1>todos</h1>
        <input id="input">
        <div class="list-container">
            <ul id="list"></ul>
        </div>
    </div>
</body>
<script>
    let inputElement = document.getElementById("input");
    let listElement = document.getElementById("list");

    inputElement.addEventListener('keyup', (evt) => {
        if (evt.keyCode === 13) {
            if (inputElement.value === '') {
                return;
            }
            addLi(listElement, inputElement.value);
            inputElement.value = '';
        }
        else{
            if (inputElement.value === '') {
                clearContent();
                return;
            }
            setTimeout(() => {
                search(inputElement.value);
            }, 130);
        }
    });


    function addLi(_parentNode,_text) {
        let liElement=document.createElement('li');
        _parentNode.appendChild(liElement);

        liElement.innerHTML=
            '<span class="list-content" data-record="'+_text+'">'+_text+'</span><span class="del">×</span>';
        bindClickRemove(liElement);
    }

    function bindClickRemove(_elem) {
        _elem.children[1].addEventListener('click', () => {
            _elem.remove();
        });
    }

    function clearContent() {
        let result=document.getElementsByClassName("match");
        for(let i=result.length-1;i>=0;i--){
            result[i].remove();
        }
        result=document.getElementsByClassName("list-content");
        for(let i=result.length-1;i>=0;i--){
            result[i].innerHTML=result[i].getAttribute("data-record");
        }
    }

    function search(_str) {
        let contents = document.getElementsByClassName('list-content');
        let ulElement=document.getElementById('list');

        clearContent();
        for (let i = 0; i < contents.length; i++) {
            let tempStr = contents[i].dataset.record;
            let reg=new RegExp("(" + _str + ")", "gm");
            if(tempStr.match(reg)){
                let result = tempStr.replace(reg, "<font color='red'>$1</font>");
                let liElement=document.createElement('li');
                liElement.setAttribute("class","match");
                ulElement.prepend(liElement);
                liElement.innerHTML=result;
                contents[i].innerHTML = result;
            }
        }
    }
</script>
</html>

```

代码示例的话我放在codepen上面了，想看一下效果的话这是[传送门](https://codepen.io/allenxz/pen/oVyQvM)。


## 总结

虽然看起来只是一个很小的组件，但是它里面有很多很多的小细节。分析需求真的很重要很重要，你得将人家想要的东西真正了解再动手，要不然你的代码逻辑会很乱，一旦遇到bug就很难发现问题。更严重的是，基于不完整的需求进行编写的代码结构可能是不符合最终要求的，你很容易就会进到死胡同，到头来很可能前功尽弃，只能忍痛重头写。That‘s all。共勉。