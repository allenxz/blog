---
prev: /Interview/
next: /Interview/ByteDance01.md
---

# 京东2019校招笔试前端开发工程师笔试题

## 题目相关

时长是两个小时，题量则是50道，全是选择题，没有编程大题。但是题目有点问题，错字漏字的情况很多，体验一般。

主要涵盖了下面的知识点大类：

- 软件过程模型
- 数据结构及编程语言基础
- 计算机网络
- 操作系统
- HTML+CSS
- Javascript
- 浏览器



## 软件过程模型

主要接触的模型有以下几种：（具体区别和特点见 -> [软件过程模型-博客](https://blog.csdn.net/mmd0308/article/details/77853086))

- 瀑布模型（V模型）
- 增量模型（这次考的）
- 螺旋模型
- 演化模型
- 喷泉模型
- ......





## 数据结构及编程语言基础

数据结构考了挺多的，看来是得好好花一下时间回头系统复习一下了

1. 值类型和引用类型变量的区别

2. 避免死锁的方法

3. 运算符的优先级

4. 确定一棵二叉树（前序+中序 or 后序+中序）

5. 小根堆

6. 子串公式`（n*(n+1)）/2 + 1`，注意去重

7. 二叉树性质

   - 叶子节点=n~0~=n~2~-1
   - 总节点=n~0~+n~1~+n~2~
   - ......

8. 排序算法

9. 哈夫曼树与带权路径长度

   
## 计算机网络

1. 五层模型

   ![img](/in-post/781959989_1551233814592_77727363D090E976EA6BE4BBFD1A0B67.png)

2. 各层的主要设备

   物理层主要设备：中继器、集线器；

   数据链路层主要设备：二层交换机、网桥；

   网络层主要设备：路由器。

3. 数据传输方式

   电路交换：通信的双方在通信过程中会一直占用信道

   分组交换：将报文进行分组，采用存储转发技术

4. TCP/IP

5. Ddos预防

6. DHCP（**动态主机设置协议**（英语：**Dynamic Host Configuration Protocol，DHCP**）是一个[局域网](https://baike.baidu.com/item/%E5%B1%80%E5%9F%9F%E7%BD%91)的[网络协议](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE)，使用[UDP](https://baike.baidu.com/item/UDP)协议工作，主要有两个用途：用于内部网或网络服务供应商自动分配[IP](https://baike.baidu.com/item/IP)地址；给用户用于内部网管理员作为对所有计算机作中央管理的手段。）

7. 常见协议的标准端口 
   21 FTP 
   80 HTTP 
   443 HTTPS 
   8080 闲置

8. http状态码

   [More Details](https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660?fr=aladdin)

9. post和get的区别

   [More Details](https://www.cnblogs.com/logsharing/p/8448446.html)





## 操作系统

1. Linux命令

   mount---挂载Linux系统外的文件

   ifconfig---用于获取本地ip地址.

   top---用于获取本机cpu使用率.

   uptime---命令能够打印系统总共运行了多长时间和系统的平均负载.

   netstat---命令用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况.

   export---设置环境变量    #export PATH=$PATH:/opt/au1200_rm/build_tools/bin

   cat---查看文件内容，创建文件，文件合并，追加文件内容

   echo---显示一段文字

   env---查询环境变量

2. 软连接

   硬链接就是同一个文件使用了多个别名，特点：

   - 文件有相同的 inode 及 data block；
   - 只能对已存在的文件进行创建；
   - 不能交叉文件系统进行硬链接的创建；
   - 不能对目录进行创建，只可对文件创建；
   - 删除一个硬链接文件并不影响其他有相同 inode 号的文件。

   软链接与硬链接不同，若文件用户数据块中存放的内容是另一文件的路径名的指向，则该文件就是软连接。软链接就是一个普通文件，只是数据块内容有点特殊。特点：

   - 软链接有自己的文件属性及权限等；
   - 可对不存在的文件或目录创建软链接；
   - 软链接可交叉文件系统；
   - 软链接可对文件或目录创建；
   - 创建软链接时，链接计数 i_nlink 不会增加；
   - 删除软链接并不影响被指向的文件，但若被指向的原文件被删除，则相关软连接被称为死链接（即 dangling link，若被指向路径文件被重新创建，死链接可恢复为正常的软链接）。

   摘自：[理解 Linux 的硬链接与软链接](https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/index.html)

3. 文件系统及其特征

   

## Javascript

1. 字符串比较

   纯字符串比较，转换成ASCII码在进行比较；

   纯数字和数字字符串相比较，则将字符串数字隐式转换成数字再进行比较；

   纯数字和非数字字符串比较，都返回false；

2. 正则表达式

   [More Details](https://www.cnblogs.com/fozero/p/7868687.html)

3. push pop（在尾部操作）

   unshift shift（在头部操作）

4. toString 和valueOf

![1552367591593](/in-post/1552367591593.png)

![1552367606694](/in-post/1552367606694.png)

摘自：[https://www.cnblogs.com/diantao/p/6214203.html](https://www.cnblogs.com/diantao/p/6214203.html)

5. 判等用==，js没有equals方法

6. charAt和indexOf的区别



## HTML/CSS

1. 页面样式和布局 

2. 标签

3. canvas和SVG

   [More Details](https://www.jianshu.com/p/942d219b86d0)

4. flex布局

5. z-index



## 浏览器

浏览器对象（BOM）的层次关系 

![img](/in-post/800.jpg)

摘自：[https://baike.sogou.com/v250768.htm?fromTitle=BOM](https://baike.sogou.com/v250768.htm?fromTitle=BOM)