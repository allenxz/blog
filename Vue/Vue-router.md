---
prev: /Vue/
next: 
---
# Vue-router

::: tip 前言
vue-router作为前端路由，基本原理是通过锚点值的改变，替换innerHTML的值，使得页面局部刷新。而不需要重新加载整个页面，优化用户体验
:::

## vue-router基本使用步骤

1.引入vue-router(核心插件)对象 

2.安装插件 

3.创建一个路由对象 

4.配置路由对象 

5.指定路由改变局部位置 

6.将配置好的路由对象关联到vue实例中

## 嵌套路由

用途:原本需要局部刷新的区域中还包含着需要局部刷新的区域是需要用到。  

步骤： 

1.router-view中包含router-view 

2.路由规则中包含子路由

## 前端实现权限控制

需要： 

1.路由meta元数据 
<small>meta是对路由规则是否需要验证权限的配置</small> 

2.路由钩子 
<small>权限控制的函数执行</small> 

```JavaScript
router.beforeEach(function(to,from,next){...})  
--to:到哪个页面去  
--from:从哪个页面来  
--next：直接放行 or 重定向 or 取消用户导航行为
```


