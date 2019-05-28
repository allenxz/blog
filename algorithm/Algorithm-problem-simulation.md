---
prev: /algorithm/
next: /algorithm/Algorithm-problem-queue.md
---


# 算法题解-模拟


什么是模拟？简单来说就是用代码将题目描述的过程重演一遍，得出所需的答案。题目怎么描述，程序就怎么运行。话不多说，上题。


## 题目【134】[加油站](https://leetcode-cn.com/problems/gas-station/)

难度：中等

```markdown
在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。
你从其中的一个加油站出发，开始时油箱为空。

如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。

说明: 

如果题目有解，该答案即为唯一答案。
输入数组均为非空数组，且长度相同。
输入数组中的元素均为非负数。

示例 1:

输入: 
gas  = [1,2,3,4,5]
cost = [3,4,5,1,2]

输出: 3

解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。
此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。

示例 2:

输入: 
gas  = [2,3,4]
cost = [3,4,3]

输出: -1

解释:
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。
```

## 题解

### 基本思路

  我们首先用最简单最直接的方法去解，就是按照题目描述的意思，用代码去还原整个描述的过程，穷举出最终的答案。虽然很蠢复杂度肯定很高，但是对于这题目来说简单快捷。像是这种比较简单的五六分钟就能解决。上代码。

  ```c
  int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
      //获得数组的长度，因为加油站是环状首尾相连的，要加一取余处理
      int len=gas.size();
      for(int i=0;i<len;i++){
          //先遍历数组，找一个可以开始的起点索引
          if(gas[i]>=cost[i]){
              //fuel代表油箱里有多少油
              int fuel=gas[i];
              //从i号加油站出发模拟，j代表当前所在的加油站
              int j=i;
              //用个永真循环模拟绕圈过程
              while(1){
                  //如果油箱里的油大于等于前往下一个加油站的油，说明能够成功到达
                  if(fuel>=cost[j]){
                      //已到达下一加油站，往油箱加油
                      fuel=fuel-cost[j]+gas[(j+1)%len];
                      //判断是否绕完了一圈，是的话说明这个起始索引可行，直接返回i的值
                      if((j+1)%len==i)
                          return i;
                      //更新所在加油站的编号
                      j=(j+1)%len;   
                  }else{
                      //车无法前往下一个加油站，说明以当前i无法完成绕行
                      break;
                  }
              }
          }
      }
      //所有都遍历完了都找不到一个可行起点，返回-1
      return -1;
  }
  ```

  看，是不是简单粗暴。就是相当于做翻译，将题目翻译成代码就行。但是算法就显得很丑，这样面试官就会觉得你很平庸。这种解法在leetcode上只超过2.59%的C++解决方案。

  ![运行时间](/20190216/runtime_01.png "runtime_01.png")

  这样子肯定是不行的，面试官肯定希望你用一些花里胡哨的操作去征服他们，下面我们就来优化一下

### 优化思路

  首先我们容易判断怎样的给定gas和cost会无法完成绕行，就是他们`gas-cost`累加和小于0，说明这个环形加油站里面的油根本无法满足车子。那剩下我们需要考虑的就是该选哪个加油站作为出发的起点。我们仔细想想，在整个过程中`gas-cost`的总量一直在上下浮动的，我们只要找到`gas-cos`变化过程的最小值所代表的k号加油站，然后将k+1作为起点就行。为什么呢，我们拿示例1中的数据举例。

  ![analyze.png](/20190216/analyze.png "analyze.png")

  为什么将起点作为k+1就能完成绕行，大家试想，`gas-cos`也就是fuel代表着什么，不就是车子油箱里的剩余油量么，那fuel的值在减少说明什么，说明对于车子来说，油是入不敷出的，而fuel的最低值代表着车子的入不敷出的程度到达了极致，所以不能选择k之前的点作为起点，所以得选k+1。这有点像中国的一句成语，否极泰来。哈哈，上代码。

  ``` c
  class Solution {
  public:
      int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
          int lowest = INT_MAX,n=gas.size(),fuel=0,begin;
          for(int i=0;i<n;i++){
              fuel=fuel+gas[i]-cost[i];
              if(fuel<lowest){
                  lowest=fuel;
                  begin=i+1;
              }
          }
          return (fuel<0)?-1:(begin%n);
      }
  };
  ```

  但是有点尴尬的是，就算如此也只是超过了一半的用户而已...

  ![运行时间](/20190216/runtime_02.png "runtime_02.png")

  不管了脑子转不动了，如果你们有更好的解决方案，可以在下面给我留言。

  
## 更多的模拟类算法题

- #### [202. 快乐数](https://leetcode-cn.com/problems/happy-number/)

- #### [412. Fizz Buzz](https://leetcode-cn.com/problems/fizz-buzz/)

- #### [371. 两整数之和](https://leetcode-cn.com/problems/sum-of-two-integers/)

- #### [289. 生命游戏](https://leetcode-cn.com/problems/game-of-life/)

- #### [146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)

我是按照难度排列的，从三道简单，一道中等，一道困难。有兴趣的可以戳进去做一下。



## 总结

总而言之，模拟算是这几个专题里面比较简单的，但是要想在面试的时候答得漂亮还真的不是特别简单的事情。一般这类题目，读几遍题就有基本思路了，然后就可以继续细读一下，看看问题能够抽象成怎样的数学思维（一般较优解都和数学脱不了关系），实在想不出来就“翻译”吧。共勉。