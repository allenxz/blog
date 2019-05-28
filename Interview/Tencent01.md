---
prev: /Interview/
next: /Interview/Tencent02.md
---

# 腾讯提前批笔试(一)

下午的时候正好小班喊我去北门吃饭了，回来又得给挂科的小班家长打电话，所以看到鹅场邮件的时候已经是九点多了。很尴尬，所以我就只能上去把题目拍了下来，然后再继续做了。这笔试一共五道题，但是由于最近我得写个Vue的小项目，花在算法上面的时间不是特别多，所以我得分成五篇博客写。代码言归正传，上题。


## 圆桌会议


有n个人围坐在一个圆桌周围进行一场圆桌会议。会议开始前从第s个人开始报数，数到第m的人就出列退出会议，然后从出列的下一个人重新开始报数，数到m的人又出列，...，如此重复直到所有人全部出列为止，现在希望你求出，按退出会议次序得到的人员的序号序列。

## 输入描述

三个正整数n，s，m（n，s，m < 10000）

## 输出描述

退出会议次序序号，一行一个

## 示例

::: tip 输入
3  1  2
:::

::: tip 输出
2

1

3
:::

## 解题思路

这个应该很熟悉了，似李，约瑟夫环。比较简单的一道题，也正是因为由于题目比较简单我会用多几种方法解。主要参考我之前刚接触到的时候看的几篇博客：

- [https://blog.csdn.net/weixin_38214171/article/details/80352921](https://blog.csdn.net/weixin_38214171/article/details/80352921)
- [约瑟夫环-百度百科](https://baike.baidu.com/item/%E7%BA%A6%E7%91%9F%E5%A4%AB%E7%8E%AF/348830?fr=aladdin)
- [https://blog.csdn.net/weixin_42659809/article/details/82596676](https://blog.csdn.net/weixin_42659809/article/details/82596676)
- [https://blog.csdn.net/tingyun_say/article/details/52343897](https://blog.csdn.net/tingyun_say/article/details/52343897)


## 解法一：用数组解

无论是用数组还是链表，本质上其实也就是模拟，这个我之前也说过了。我们直接看代码，关键的地方我会写注释。因为在C++用链表好麻烦，所以我用了数组。

这个解法是最容易懂的，很清楚明了，但是复杂度有点高，有很多地方可以优化。

### 代码

``` c
void roundTable(int n,int s,int m){
	int rest = n;   //桌上还剩下的人数
	int number = 0; //报数，当number==m时淘汰
	int index = s-1;  //循环数组的下标，从第s位开始报数（减1是因为数组）
	int *circle = NULL;
    
	//申请一个数组，利用index求余模拟循环数组，注意calloc申请得到的空间每一位自动初始化为0
    //在数组中，0代表该人还在圆桌上，1代表被淘汰；数组的下标加1代表他们的原始编号
	circle = (int *)calloc(sizeof(int), n);

    //当桌子上还剩下人
	while (rest > 0) {
        //报数，如果当前位置的人被淘汰就加0,相当于没报；反则反之
		number += 1 - circle[index];
        //报数报到第m位时，进行淘汰
		if (number == m) {
            //输出被淘汰者的序号
			printf("%d\n", index + 1);
            //更改该位置上人的状态
			circle[index] = 1;
            //桌上剩下人数减1
			rest--;
            //重新报数
			number = 0;
		}
        //模拟循环数组
		index = (index + 1) % n;
	}
	free(circle);
}
```

### 运行结果

![1552214862054](/in-post/1552214862054.png)



## 解法二：用链表解

```java
public static void main(String[] args){
    int n=3,s=1,m=2;
    List<Integer> roundTable = new ArrayList<Integer>();
    //新建一个ArrayList，链表里面存1...n
    for(int i = 1;i <= n; i++) {
      roundTable.add(i);
  }
  //通过s定义起始点
    int index = s-1;
  int length = roundTable.size();
    for(int i = 0;i < length; i++) {
        //直接找到该淘汰的人
        index = (index+m-1) % roundTable.size();
        //不同于解法一，这里是真正的淘汰
        System.out.println(roundTable.remove(index));
    }
}
```

### 运行结果

![1552230535998](/in-post/1552230535998.png)



# 总结

这题其实没什么好说的，很标准的约瑟夫问题。笔试好像很喜欢考，见到的频率比较高。其实约瑟夫问题可以通过迭代解决，有一条迭代公式`f(n)=(f(n-1)+m)%n`，代表的是n个人围成的一圈中，报数到m淘汰，最后剩下的人编号为f(n)。具体的证明和推导，前面的链接里面有。That's all , bye.