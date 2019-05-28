---
prev: /Interview/
next: /Interview/Tencent03.md
---

# 腾讯提前批笔试(二)

## 魔法序列

小Q拥有一个只储存了整数的数列叫魔法序列。一开始序列为空，小Q会执行以下两种操作：

- add（x）：表示往序列里添加一个值为x的整数

- get（y）：表示在第y次add操作之后，取出序列中第k小的数，并将其输出，其中k的初始值为1，每执行一次get操作，k的值会加一

  

## 输入描述

第一行两个整数n和m（0<=n,m<=30000），分别表示add和get的操作次数

第二行n个空格间隔的整数，表示每次add操作往数列中添加的数字

第三行m个空格间隔的整数yi（1 <= yi <= n）,其中第i个数表示在执行yi次add操作后，执行一次get操作



## 输出描述

m行，每行一个整数，表示对应get操作输出的值



## 示例

::: tip 输入
 7  4

 3  1  -4  2  8  -1000  2

 1  2  6  6
:::

::: tip 输入
3

1

1

2
:::

## 解题思路

这题我们用到的数据结构是大根堆和小根堆。一开始，我们往大根堆中放`get[k]`个数字，然后从大根堆的堆顶不断取出数字放进小根堆，直到大根堆中只剩下`k-1`个数。

因为大根堆的性质，取数的顺序是从大到小的，所以大根堆此时还剩的数就是**第1小的数~第k-1小的数**，那么自然的小根堆的堆顶就是第k小的数了。

我们通过几幅图来加深理解。

为了方便理解，图里分析的是一次性加入add数组中的前6位，然后找6个数中的第3小的数。（大概模拟`get[3]`即`k=3`时的情景）。

- 第一步我们往里面塞数，直到塞够6个

![1552659625310](/in-post/1552659625310.png)

- 从big中取数出来放进small中，直到big中剩下2（k-1）个数。显然此时small的堆顶`1`就是第3（k）小的数

![1552659680783](/in-post/1552659680783.png)

## 代码

```c
#include<iostream>
#include<queue>
using namespace std;

int main() {
	int i, k, n, m;
	int add[30001] = { 0 }, get[30001] = {0.};
    //small为小根堆；big为大根堆 
	priority_queue<int> big;
	priority_queue<int, vector<int>, greater<int> >small;
    
	cin >> n >> m;
	for (i = 1; i <= n; i++)
		cin >> add[i];
	for (i = 1; i <= m; i++)
		cin >> get[i];
    
	for (k = 1; k <= m; k++) {
		//执行get[k]次add的操作，往big中加数字
		for (i = get[k - 1] + 1; i <= get[k]; i++)
			big.push(add[i]);
		//把big中的数字从大到小往small中倒
		//最后在big中剩下k-1个数字，small的堆顶就是第k小的数字
		while (big.size() >= k) { 
			small.push(big.top());
			big.pop();
		}
		big.push(small.top());
		small.pop();
		cout << big.top() << endl;
	}
}
```

## 参考

[https://www.jianshu.com/p/07d9c81ec008](https://www.jianshu.com/p/07d9c81ec008)

[https://blog.csdn.net/INCINCIBLE/article/details/50846523](https://blog.csdn.net/INCINCIBLE/article/details/50846523)