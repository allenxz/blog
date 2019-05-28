---
prev: /Interview/
next: /Interview/ByteDance02.md
---

# 字节跳动2018校招前端方向笔试题(上)

这是字节跳动2018校招前端方向（第二批）的笔试题，一共四道题：两道编程题，一道程序改错题和一道设计题。前面的编程题难度不高，就没记录，有兴趣的这里有[传送门](https://www.nowcoder.com/)可以去看一下。今天我们主要讲的是后面两道题。



## 程序改错题

### 题目

以下函数使用二分查找搜索一个增序的数组，当有多个元素值与目标元素相等时，返回最后一个元素的下标，目标元素不存在时返回-1。请指出程序代码中错误或不符最佳实践的地方（问题不止一处，请尽量找出所有你认为有问题的地方）

```c
int BinarySearchMax(const std::vector<int>& data, int target)
{
   int left = 0;
   int right = data.size();
   
   while (left < right) {
       int mid = (left + right) / 2;
       if (data[mid] <= target)
           left = mid + 1;
       else
           right = mid - 1;
   }

   if (data[right] == target)
       return right;

   return -1;
}
```

### 解析

这种题型有点意思，他让你找错，主要考察的是你的代码阅读能力和逻辑推演能力。我们先开始找碴，然后再写一下自己思路。

至于怎么找碴，其实很简单，我们推演一下代码，看看能不能解决问题，或者说在哪一步遇到bug就行。关键技巧就是设计合适的测试用例。我设了data为`{1,2,3,4,5,5,6}`，测试用例和结果如下：

![1552743254699](/in-post/1552743254699.png)

从上图我们很容易发现，当target=2,4,6的时候输出是出现问题的，取6的时候访问还越界了。

- 这里的问题主要是出在了` if (data[right] == target) return right;`上：

  之所以当data[mid]==target的时候依旧执行left=mid+1，是因为他想继续往右寻找，找到最后一个匹配的元素。但是数组中只存在唯一一个target的时候，跳出while的时候，right等于left等于target对应的坐标加一，data[right]自然不会等于target，所以返回了-1。

  而且因为一开始right取的是`data.size()`，target处于数组最右端的时候，data[right]会访问越界。

- 最后有一个小点是求mid的时候用的`(left + right) / 2;`，在数据比较大的时候，left+right会溢出，我们应该用`left + (right - left) / 2;`。

  

### 代码

将错的地方修改之后结果如下：

```c
int BinarySearchMax(const std::vector<int>& data, int target)
{
	int left = 0;
	int right = data.size() - 1;
	while (left <= right) {
		int mid = left + (right - left) / 2;
		if (data[mid] <= target) 
          	  left = mid + 1;
		else
         	  right = mid - 1;
	}
	if (right >= 0 && data[right] == target)
             return right;
	else
             return -1;
}
```

### 运行结果

![1552745936616](/in-post/1552745936616.png)



### 镜像问题

其他条件一样，不过当有多个元素值与目标元素相等时，返回第一个元素的下标。思路差不多，和上面的相互对照就好。

```c
int BinarySearchMin(const std::vector<int>& data, int target)
{
	int left = 0;
	int right = data.size() - 1;
	while (left <= right) {
		int mid = left + (right - left) / 2;
		if (data[mid] >= target)
                 right = mid - 1;
		else
                 left = mid + 1;
	}
	if (left < data.size() && data[left] == target)
             return left;
	else
             return -1;
}
```

## 总结

这两个题目的关键在于：

找最后一个元素就将`data[mid] == target`放在大于的情况中，一直更新left的值，直到最后一轮循环，最后一个循环的开始`left==right==目标坐标的下一位`，再通过else分支中的`right=mid-1`修正坐标。反则反之。

本来想把最后的设计题也整理了，但是这一篇的篇幅太长了，就拆成两篇了。

参考：

[https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/comments/](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/comments/)