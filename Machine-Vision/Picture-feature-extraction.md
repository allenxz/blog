---
prev: /Machine-Vision/
next: /Machine-Vision/Image-preprocessing.md
---

# 图像的特征提取

## 视频笔记

### 1. SURF

Speeded Up Robust Features

- 速度比SIFT更快
- 亮度变化下效果好
- 模糊方面更优
- 尺度不变上面不如SIFT
- 旋转不变上差很多

尽管SURF优化了，比SIFT快了3倍，但是计算依旧是繁杂的，难以用于实时特征检测，所以就有了ORB



### 2. ORB

Oriented FAST and Rotated BRIEF

#### 2.1. BRIEF

在特征点附近选取一个patch，在patch中随机的选择若干点对，根据点对之间像素值的大小关系生成一个二进制串

#### 2.2. ORB对BRIEF的改进

找出形心（把每个点的像素值作为质量进行计算的得出），连接形心和关键点就是主方向（即作为x轴建立坐标系）。

优点是快，计算简便



### 3. LBP

即局部二值模式

1. 将每个像素点与周围点进行比较
2. 大小量化为1或者0
3. 将量化结果串成一个二进制数，再根据得到的二进制大小绘制直方图（从哪一位开始组成二进制串有讲究，“按位旋转”）

LBP特征具有灰度不变性和旋转不变性的优点。



### 4. GABOR

三角函数+高斯滤波

特点：

- 多频率
- 多尺度
- 多方向




------



## 代码笔记

### 1. Harris Corner

我们一般使用opencv中的cv2.cornerHarris()来进行角点检测。参数如下：

| cv2.cornerHarris() |                                                       |
| :----------------- | ----------------------------------------------------- |
| img                | 数据类型为float32的输入图像                           |
| blockSize          | 角点检测中需要考虑的邻域大小                          |
| ksize              | Sobel求导中使用的窗口大小                             |
| k                  | Harris角点检测方程中的自由参数，取值参数为[0.04,0.06] |

**示例代码：**

``` python
import numpy as np
import cv2 as cv
filename = 'data/chessboard.png'
img = cv.imread(filename)
gray = cv.cvtColor(img,cv.COLOR_BGR2GRAY)
gray = np.float32(gray)
dst = cv.cornerHarris(gray,2,3,0.04)
#膨胀，提高角点标注的清晰度，可有可无
dst = cv.dilate(dst,None)
# 设置阈值筛选出角点，取值取决于图像本身
img[dst>0.01*dst.max()]=[0,0,255]
cv.imshow('dst',img)
if cv.waitKey(0) & 0xff == 27:
    cv.destroyAllWindows()
```

**运行结果：**

![1551186856132](/in-post/1551186856132.png)



### 2. SIFT

这里需要注意的是，SIFT和SURF在opencv3.4.3以后申请了专利，所以你的版本如果高于3.4的话，程序会报错。解决方案是先pip uninstall opencv-contrib-python，然后pip install opencv-contrib-python==3.4.1.15，如果pip install 的时候报ReadTimeoutError的错误，可以戳这个[链接](https://blog.csdn.net/abcabc77777/article/details/53456453)换个源，下载就会快很多。



**需要注意的函数及其参数：**

| cv2.drawKeyPoints() |                                                  |
| ------------------- | ------------------------------------------------ |
| image               | 原始图像，可以使用单通道或三通道图像             |
| keypoints           | 特征点向量，向量内每一个元素是一个KeyPoint对象   |
| outImage            | 特征点绘制的画布图像，可以为空，即在原图像上绘制 |
| color               | 绘制的颜色                                       |
| flags               | 特征点的绘制模式（详情见下表）                   |



------



| 绘制模式                | 其实就是设置特征点的那些信息需要绘制，那些不需要绘制         |
| ----------------------- | ------------------------------------------------------------ |
| DEFAULT:                | 只绘制特征点的坐标点,显示在图像上就是一个个小圆点,每个小圆点的圆心坐标都是特征点的坐标 |
| DRAW_OVER_OUTIMG:       | 函数不创建输出的图像,而是直接在输出图像变量空间绘制,要求本身输出图像变量就 是一个初始化好了的，size与type都是已经初始化好的变量 |
| NOT_DRAW_SINGLE_POINTS: | 单点的特征点不被绘制                                         |
| DRAW_RICH_KEYPOINTS:    | 绘制特征点的时候绘制的是一个个带有方向的圆,这种方法同时显示图像的坐标，size和方向,是最能显示特征的一种绘制方式 |



**示例代码：**（ps：所有的示例都是转成灰度图像处理，这样就不用处理多次，方便一点）

``` python
import cv2 as cv
img = cv.imread('data/home.jpg')
gray= cv.cvtColor(img,cv.COLOR_BGR2GRAY)

sift = cv.xfeatures2d.SIFT_create()
kp = sift.detect(gray,None)
img=cv.drawKeypoints(gray,kp,img)

cv.imshow("SIFT", img)
cv.imwrite('sift_keypoints.jpg',img)
cv.waitKey(0)
cv.destroyAllWindows()
```

**原图：**

![1551189299609](/in-post/1551189299609.png)

**运行结果：**

![1551189268614](/in-post/1551189268614.png)



### 3. SURF

SURF是SIFT的改进版，也是检测特征点的算法。



**示例代码：**

``` python
import cv2 as cv
img = cv.imread('data/butterfly.jpg',0)

#创建一个SURF对象，并初始其Hessian阈值为400
surf = cv.xfeatures2d.SURF_create(400)
#des即descriptors，是对keypoints 进一步处理的结果。通常它具有更低的维度，从而使得图像块能够在另一幅不同的图像中被更快地识别。
kp, des = surf.detectAndCompute(img,None)
#但是设置阈值为400,获取关键点经测试足足有1330个，太多了，我们设置一个更大的阈值
#阈值越大，识别的特征点越少
surf.setHessianThreshold(50000)
kp, des = surf.detectAndCompute(img,None)
img2 = cv.drawKeypoints(img,kp,None,(255,0,0),4)
cv.imshow('surf',img2)

cv.waitKey(0)
cv.destroyAllWindows()
```



**运行结果：**
![1551229748764](/in-post/1551229748764.png)

从结果上看，SURF像是一个斑点检测器。将蝴蝶翅膀上的白斑几乎都识别出来了。



### 4. ORB

ORB 基本是 FAST 关键点检测和 BRIEF 关键点描述器的结合体，并通过很多修改增强了性能。下面的例子是ORB检测然后进行BF（Brute-Force）特征匹配。



**需要注意的函数及其参数：**

| cv2.BFMatcher() | 创建BFMatcher对象                                            |
| --------------- | ------------------------------------------------------------ |
| normType        | 用来指定要使用的距离测试类型。默认值为 cv2.Norm_L2。这很适合 SIFT 和 SURF 等。对于使用二进制描述符的 ORB，BRIEF，BRISK算法等，要使用 cv2.NORM_HAMMING，这样就会返回两个测试对象之间的汉明距离。 |
| crossCheck      | 默认值为 False。如果设置为True，匹配条件就会更加严格，只有到 A 中的第 i 个特征点与 B 中的第 j 个特征点距离最近，并且 B 中的第 j 个特征点到 A 中的第 i 个特征点也是最近（A 中没有其他点到 j 的距离更近）时才会返回最佳匹配（i，j）。也就是这两个特征点要互相匹配才行。 |

BFMatcher 对象具有两个方法，BFMatcher.match() 和 BFMatcher.knnMatch()。
第一个方法会返回最佳匹配；

第二个方法为每个关键点返回 k 个最佳匹配（降序排列之后取前 k 个），其中 k 是由用户设定的。如果除了匹配之外还要做其他事情的话可能会用上（比如进行比值测试）。

使用cv2.drawMatches() 来绘制匹配的点。它会将这两幅图像先水平排列，然后在最佳匹配的点之间绘制直线（从原图像到目标图像）。如果前面使用的是 BFMatcher.knnMatch()，现在我们可以使用函数 cv2.drawMatchsKnn为每个关键点和它的 k 个最佳匹配点绘制匹配线。如果 k 等于 2，就会为每个关键点绘制两条最佳匹配直线。

**示例代码：**

```python
import cv2 as cv
import matplotlib.pyplot as plt
img1 = cv.imread('data/box.png',0)          # queryImage
img2 = cv.imread('data/box_in_scene.png',0) # trainImage
# 初始化一个ORB检测器
orb = cv.ORB_create()
# 通过ORB算法找出关键点和描述符
kp1, des1 = orb.detectAndCompute(img1,None)
kp2, des2 = orb.detectAndCompute(img2,None)
# 创建一个BF匹配对象
bf = cv.BFMatcher(cv.NORM_HAMMING, crossCheck=True)
# 将前面检测出来的描述符进行匹配
matches = bf.match(des1,des2)
# 将匹配结果按特征点之间的距离进行降序排列，这样最佳匹配就会排在前面了
matches = sorted(matches, key = lambda x:x.distance)
# 将最佳的前10个匹配结果绘制出来
img3 = cv.drawMatches(img1,kp1,img2,kp2,matches[:20],None,flags=2)
plt.imshow(img3),plt.show()
```



**运行结果：**
![1551269658735](/in-post/1551269658735.png)



------

## 参考

[OpenCV-Python Tutorials](https://docs.opencv.org/3.0-beta/doc/py_tutorials/py_tutorials.html)

[OpenCV官方教程中文版（For Python）](http://www.cnblogs.com/Undo-self-blog/p/8423851.html)

