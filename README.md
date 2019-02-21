
# 个人博客项目


#### 经历1个月左右的时间，第一个blog项目已经基本结束，首先写一下对这个blog的基本认识及项目的基本思路及功能和技术。

- 博客离不开用户，而用户使用博客目的是分享自己的日常生活、所知所想、以及现阶段的心情。
所以项目中离不开的就是用户信息，在此次项目中主要采用的是mongodb数据库，也是项目能够根本跑起来的依赖吧！
下面用一张思维脑图来说明一下个人blog系统。
  
  ![avator](./个人博客系统.xmind)
  
 - 看起来挺简单，但是对于我们新手来说难点可真不少，从一开始只会画页面开始，到后面自己改东西，优化代码，添加功能，这就是进步吧！
 - 该个人博客项目采用b/s架构，后端采用node.js-express框架，前端，html/css/js /jquery /layui/ bootstrap/ semantic，采用MVC 编程模式（Model View Controller 模型-视图-控制器）。
 - 连接mongodb数据库，首先建立数据模型molde（uses，article，category），使用ejs模版引擎渲染html，用户通过浏览器页面对数据库进行增、删、改、查，浏览器的每一个点击事件通过路由（routes），将请求发送到控制器中（controllers），控制器接收request对象，并且做出响应response对象，如下：
 #### （1）req 处理请求的对象
 +		req.query.name	Get参数
 +		req.body.name	Post参数
 +		req.params.name	路由参数
 #### （2）res 处理响应的对象
 +		res.send（） 发送至字符串
 +		res.json（） 发送json
 +		res.render（） 渲染模板
 			
 #### （3）next 调用下一个中间件
 
 #### （4）在控制器中有些常用的方法：
- find 查询所有 数组
 +	findOne 查询一条对象
 +	where 增加条件
 +	skip limit 分页
 +	count 查询数量
 +	sort 排序
 +	populate 模型关联（Query.populate(path, [select], [model], [match], [options])）
 
 #### （5）还用了jquery  ajax进行前后台交互
 +	$.get(url,function(data){})
 +	$.post(url,{},function(data){})
 +Data里是控制器里返回来的数据，通过赋值操作将数据填充到页面中。
 #### （6）在项目中有自定义的中间件 例如auth.js和locals，auth用在路由中进行必要操作的登陆验证，同时使用到了session闪存和connect-flash，session是客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。而connect-flash，是 session 中一个用于存储信息的特殊区域。消息写入到 flash 中，在跳转目标页中显示该消息。flash 用于一次性的消息提示，注册，登录页面，当你再次刷新时，flash就没有提示消息了。还有文件上传 multer、html字符串分割 trim-html等等新的东西。
 
 
 #### 项目启动需要在本地启动mongodb服务，在项目根目录运行`npm run start` 详情配置信息参考bin文件夹和bootstrap文件夹
