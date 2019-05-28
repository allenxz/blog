---
prev: /algorithm/
next: /algorithm/Algorithm-problem-map.md
---

# 算法题解-Map

## 什么是Map

Map其实很好懂，就是一种以键值对为组织形式的数据结构，而且键的取值在Map中是唯一的。举个例子在`{['tom',99],['jack',100],['will',98]}`这个Map中tom、jack、will这些字符串为键，而后面的99、100、98分别为上述键的值，而且在这个Map中只会有唯一的tom，其他以此类推。基于这个特性，它在数据处理尤其是查找中拥有着很高的处理效率。在某些题目中就会给我们提供极大的便利。



## 题目：[454. 四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)

**难度**：中等

**题目描述**：

给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 `(i, j, k, l)` ，使得 `A[i] + B[j] + C[k] + D[l] = 0`。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。

**例如**：

```markdown
输入:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

输出:
2

解释:
两个元组如下:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

**思路和代码**：

这道题其实很简单，如果暴力破解，我们需要4重循环才能解决这个问题，时间复杂度就不用说，肯定会爆炸。但是我们发现了一个有趣的数字，就是0。我们可以利用这个数字0，将原本需要4重循环的折半，用两个两重循环解决。这次我们用py写，因为用c++还得写迭代器什么的很烦，py大法好嘻嘻。

```python
class Solution:
  def fourSumCount(self, A: 'List[int]', B: 'List[int]', C: 'List[int]', D: 'List[int]') -> 'int':
      #建立一个Map，键值对形式为{a+b的值->该值出现次数}
      mapAB={};
      sum=0;
      
      for a in A:
          for b in B:
              sumAB=a+b
              #利用Map的唯一键特性
              if sumAB not in mapAB:
                  mapAB[sumAB]=1
              else:
                  mapAB[sumAB]+=1
                  
      for c in C:
          for d in D:
              #找c+d的相反数，如果在Map中有该数字，加上该相反数出现的次数
              if(-(c+d))in mapAB:
                  sum+=mapAB[-(c+d)];
              
      return sum
```





## 其他类似题目

- #### [171. Excel表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

- #### [380. 常数时间插入、删除和获取随机元素](https://leetcode-cn.com/problems/insert-delete-getrandom-o1/)

  

## 总结

关于要用到Map的题目，一般是算种类，计数相关的。我们前面也提及过，因为Map的特性，它的键值是唯一的，所以我们可以直接用`in`或者`not in`判断数据是否在Map中。这一类题目其实没什么的地方可以说的其实。你记住Map的特性，做题的时候多留意一下就行。还有需要注意的一点是，Map的键值对形式，你得考虑好用什么做键，什么做值。这一步尤其关键，这步弄清楚了，对你帮你理清楚整体解题的思路有极大的帮助。共勉。



