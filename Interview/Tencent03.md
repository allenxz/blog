---
prev: /Interview/
next: /Interview/JD.md
---

# 腾讯提前批笔试(三)

## 圆环取数

小Q有一个由n个整数组成的一个圆环，现在要从中取出m个数。因为未知的原因，当取走一个数字就不能取跟它相邻的数字。小Q想知道能取出的最大和是多少。

## 输入描述

第一行包含两个整数n、m

第二行为n个整数A<sub>i</sub>;表示圆环中的数

m<=n<=200000;-1000<=A<sub>i</sub><=1000

## 输出描述

输出一个整数，表示最大和。如果无解则输出“Error!”，不含引号。


## 示例

::: tip 输入
8 4

8 5 6 2 3 4 8 9
:::

::: tip 输出
25
:::

## 解题思路

要想取得的数字之和最大，我们很自然的就会想到每次取最大的。我们维护一个大根堆，每次取堆顶的元素（跳过无法取的）就行。

但是这样的取法是有弊端的，比如例子中的`8 9 8`，我们如果取了最大的9，旁边的两个8因为相邻的缘故，我们都取不到了，而显然8+8是大于9的。

怎么解决这个问题呢，我们可以每次取完堆顶元素之后，往堆中加入一个新元素，其值为 **堆顶两边元素之和-堆顶元素**。
这样操作的相当于在`8 9 8`中，将原本选择的9丢掉，选择8+8的组合。当这个新增元素在堆顶被选择的时候，代表**选择两侧元素优于选择中间元素**。

## 代码

```c
#include<iostream>
#include<queue>
#define N 400005
using namespace std;

struct node
{
	int index;//整数在圆环上的位置
	int value;//整数的值
};
//用于大根堆内部比较
bool operator <(const node a, const node b) {
	return a.value < b.value;
}

int main() {
	//三个数组分别是存放m个整数，每个数字左边的坐标，每个元素右边的坐标
	int a[N], l[N], r[N];
	//记录哪些数字无法使用
	bool used[N] = {0};
	//大根堆
	priority_queue<node> heap;
	//sum是最大和，cnt代表取出数字的个数
	int n, m, sum = 0, cnt = 1;
	cin >> n >> m;
	if (n < m * 2) {
		cout << "Error!";
		return 0;
	}
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
		l[i] = i - 1;
		r[i] = i + 1;
		if (i == 0) l[i] = n;
		if (i == n) r[i] = 1;
		heap.push(node{ i,a[i] });
	}
	while (cnt<=m) {
		int t = heap.top().index;
		heap.pop();
		if (used[t])
			continue;
        //将取出的元素和其相邻元素标记为不可用
		used[t] = used[l[t]] = used[r[t]] = true;
		sum += a[t];
        cnt++;
        //以下步骤为新增元素
		n++;
        //值=两侧元素和-中间元素
		a[n] = a[l[t]] + a[r[t]] - a[t];
        //设置新增元素的左右关系
		l[n] = l[l[t]]; 
		r[n] = r[r[t]];
		r[l[l[t]]] = n;
		l[r[r[t]]] = n;
		heap.push({ n,a[n] });
	}
	cout << sum;
	return 0;
}
```
## 总结

这道题的关键就是想到通过往堆中新增一个特殊元素来跳出局部最优的陷阱，这个确实很难想，只能通过多刷题累积经验才行。解题思路我也是看了别人的博客才知道的。智商压制Orz......加油吧！共勉。


## 参考

[https://blog.csdn.net/ArliaStark/article/details/81771412](https://blog.csdn.net/ArliaStark/article/details/81771412)

