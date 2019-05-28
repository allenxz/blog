---
prev: /Machine-Vision/
next: /Machine-Vision/Image-preprocessing.md
---

# 运动目标检测之帧差法

::: tip 概念
运动目标检测是指在指定图像中把运动的物体从背景图像中提取出来。
:::


## 常用方法

一般检测的图像来源都是摄像头，根据摄像头是否固定，运动检测可以分为静态背景和动态背景。而大多数情况下摄像头都是静止的，所以静态背景下的运动目标检测算法使用频率更高。常用方法有帧差法、光流法、背景减除法等。这次我们先来聊聊帧差法。

## 基本原理

通俗的来说，如果一个物体移动了，它在相邻的两帧或者三帧中在的位置肯定不同，帧差法利用的就是这简单的原理。  
首先，将相邻帧的图像对应的像素值相减得到差分图像；  
然后对这个差分图像进行二值化；  
在环境亮度变化不大的情况下，如果相邻帧图像对应像素值变化小于先前定好的阈值，就可以认为这处为背景图像；如果变化超过定下的阈值，说明此处像素值变化很大，可以认为这是图像中的运动物体引起的，将这些区域标记为前景图像。

## 优点&缺点

优点：  
由于相邻的两帧时间间隔非常短，用前一帧图像作为当前帧的背景具有非常好的实时性。且其背景数据不堆积、更新速度快、算法简单、计算量小。  
缺点：  
对环境噪声比较敏感，所以先前定下的阈值就成为整个算法的关键：太低无法抑制环境中的噪声；太高了就无法识别出图像中像素的有效变化。对于比较大的、颜色比较一致的物体，甚至有可能在目标内部产生空洞，无法完整地提取运动目标。

## 实例源代码

``` c
//使用帧差法进行运动物体检测  
//Created by Allen Tan in 2018-12-17  
//refer to https://blog.csdn.net/xiao__run/article/details/76849908  
//   
#include "opencv2/opencv.hpp"  
#include <opencv2/highgui/highgui.hpp>  
#include <opencv2/core/core.hpp>  
#include <opencv2/imgproc/imgproc.hpp>  
#include <iostream>  
using namespace cv;  
using namespace std;  
//运动物体检测函数声明  
Mat MoveDetect(Mat temp, Mat frame);  

int main()  
{  
//使用视频  
//VideoCapture video("C:\\Users\\13226\\Desktop\\vision_industrille\\exp6\\exp6\\videoTest.avi");  
//使用笔记本摄像头  
VideoCapture video(0);  
if(!video.isOpened())  
    return -1;  
   while(1)  
    {  
        //读取视频时会用到  
        //int frameCount = 				 video.get(CV_CAP_PROP_FRAME_COUNT);//获取帧数  
        //double FPS = video.get(CV_CAP_PROP_FPS);//获取FPS  
        Mat frame;//存储帧  
        Mat temp;//存储前一帧图像  
        Mat result;//存储结果图像  
        //读取视频时用：  
        //for( (int i = 0; i<frameCount; i++))  
        for (int i = 0; 1; i++)  
        {  

            video >> frame;//读帧进frame  
            imshow("frame", frame);  
            if (frame.empty())//对帧进行异常检测  
            {  
                cout << "frame is empty!" << endl;  
                break;  
            }  
            if (i == 0)//如果为第一帧（temp还为空）  
            {  
                //调用MoveDetect()进行运动物体检测，返回值存入result  
                result = MoveDetect(frame, frame);  
            }  
            else//若不是第一帧（temp有值了）  
            {  
                //调用MoveDetect()进行运动物体检测，返回值存入result  
                result = MoveDetect(temp, frame);  

            }  
            imshow("result", result);  
            //读取视频时用：  
            //if (waitKey(1000.0/FPS) == 27)  
            if (waitKey(1000.0/40) == 27)//按原FPS显示  
            {  
                cout << "ESC退出!" << endl;  
                break;  
            }  
            temp = frame.clone();  
        }  
    }  
	return 0;  
}  
Mat MoveDetect(Mat temp, Mat frame)  
{  
    Mat result = frame.clone();  
    //1.将background和frame转为灰度图  
    Mat gray1, gray2;  
    cvtColor(temp, gray1, CV_BGR2GRAY);  
    cvtColor(frame, gray2, CV_BGR2GRAY);  
    //2.将background和frame做差  
    Mat diff;  
    absdiff(gray1, gray2, diff);  
    imshow("diff", diff);  
    //3.对差值图diff_thresh进行阈值化处理  
    Mat diff_thresh;  
    //阈值直接决定检测效果  
    threshold(diff, diff_thresh, 17, 255, CV_THRESH_BINARY);  
    imshow("diff_thresh", diff_thresh);  
    //4.腐蚀  
    Mat kernel_erode = getStructuringElement(MORPH_RECT, Size(3, 3));  
    Mat kernel_dilate = getStructuringElement(MORPH_RECT, Size(18, 18));  
    erode(diff_thresh, diff_thresh, kernel_erode);  
    imshow("erode", diff_thresh);  
    //5.膨胀  
    dilate(diff_thresh, diff_thresh, kernel_dilate);  
    imshow("dilate", diff_thresh);  
    //6.查找轮廓并绘制轮廓  
    vector<vector<Point> > contours;  
    findContours(diff_thresh, contours, CV_RETR_EXTERNAL, CV_CHAIN_APPROX_NONE);  
    drawContours(result, contours, -1, Scalar(0, 0, 255), 2);//在result上绘制轮廓  
    //7.查找正外接矩形  
    vector<Rect> boundRect(contours.size());  
    for (int i = 0; i < contours.size(); i++)  
    {  
        boundRect[i] = boundingRect(contours[i]);  
        rectangle(result, boundRect[i], Scalar(0, 255, 0), 2);//在result上绘制正外接矩形  
    }  
    return result;//返回result  
}  
```
<br/>

## 参考链接
[帧差法](https://blog.csdn.net/xiao__run/article/details/76849908)


