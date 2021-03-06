---
prev: /algorithm/
next: 
---

# 算法题解-队列

## 关于队列

至于队列，也没什么好说的，无非就是先进先出的特性。但是我们这次讲的是一种特殊的队列，双端队列（deque），是指允许两端都可以进行入队和出队操作的队列，它具有栈和队列的特点，队列的两端分别称为前端和后端，两端都可以入队和出队。我们通过一道题看看deque的具体应用。


## 题目：[239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

**难度**：困难

**题目描述**：

给定一个数组 *nums*，有一个大小为 *k* 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 *k* 内的数字。滑动窗口每次只向右移动一位。

返回滑动窗口最大值。

**举例**：

```markdown
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值
---------------                 -----
[1  3  -1] -3  5  3  6  7         3
 1 [3  -1  -3] 5  3  6  7         3
 1  3 [-1  -3  5] 3  6  7         5
 1  3  -1 [-3  5  3] 6  7         5
 1  3  -1  -3 [5  3  6] 7         6
 1  3  -1  -3  5 [3  6  7]        7
```

**思路**：

用例子里的数据来说，整体的思路分成3步：

1. 我们先求出第一个窗口的最大值，显而易见是3；

2. 然后窗口右移，判断新加入的数字（窗口最右边的数字）和之前窗口最大值的关系，-3<3，所以第二个窗的最大值还是3；

3. 第三个窗口的时候，原本前两个窗的最大值3，已经处于窗口之外了，所以我们得重新求当前窗的最大值，再次显而易见是5，这时候你就会发现我们又回到了步骤一的操作了。这很好，说明我们已经找到了一个可闭环求解的解题思路。

   打个比方，我们首先得找出一个“**老大**”，如果后面的人打不过老大，老大的地位就一直持续到他“**退位**”，退位后我们再重新选出另外一个老大，继续新一轮武林争霸。

**和deque的关系**：

然后我们再回头去看整个解题过程，还记得我们上一篇博客说的么。关于数据结构的题，关键是明确你要用什么数据结构去模拟题目中的什么要素。这里我们就用deque用模拟记录“当前窗口的最大值”。每个时刻的deque的队头代表的就是“当前窗口的最大值”。再结合上面说的思路，我们发现整个过程对deque的操作主要有三类：

1. 当前处理的值比原本队尾的值要大，数据后端（即右端，队尾）出队；
2. 数据入队，没什么要说的；
3. 原本的最大值已不在当前窗口内，数据从前端（即左端）出队，淘汰最早入队的元素。

弄清楚之后代码就容易了，我们这次还是用py。但是实际是在代码里我用deque模拟的其实是“当前窗口的最大值的索引”，但是前面如果加上的话看起来就很拗口，所以简化了一下。不过逻辑是一样的，前面如果不是很理解的，再看一下代码，联系一下武林争霸应该就懂了。

**代码**：

```python
class Solution:
  def maxSlidingWindow(self, nums: 'List[int]', k: 'int') -> 'List[int]':
      #虽然题目里说nums不会为空，但是测试用例里还是有，如果你不加这个，耗时200ms，超过50%用户；加了就减到136ms，超过95%用户。。。
      if not nums:return []
      res,win=[],[]
      for i,x in enumerate(nums):
          #对应操作3，淘汰不在当前窗口的最大值（老大退位）
          if i>=k and win[0]<=i-k:
              win.pop(0)
          #对应操作1，确保队伍中第二位的值一定是队里第二大的，这样当队首元素被淘汰的时候，它能成功上位（pk打擂，选一个继承人）
          while win and nums[win[-1]]<=x:
              win.pop()
          #对应操作2,添加新数据，给下一轮循环中的操作1处理（新秀加入争霸）
          win.append(i)
          if i>=k-1:
              res.append(nums[win[0]])
      return res
```

## 总结

对于大多数的算法题，无非是两点，第一是总结出一个可以循环的解题思路，第二就是根据你总结出来的思路选用具有合适特性的数据结构，其实第二步不是必备的操作，它更像是锦上添花的一笔，能减少你的代码量，降低算法的时间复杂度，面试时人家也会觉得你更牛13一点。反正多刷就完事了。共勉。