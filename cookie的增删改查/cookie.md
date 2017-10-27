1. ##### 什么是cookie

   - cookie后端技术，在服务器下运行的，用来记录匹配后端的sessionID，从而保证用户只要在当前浏览器访问页面，登录信息不会被丢失。
   - 前端使用一般用来数据存储（配合后端进行一些用户优化）
   - cookie的容量很小，每一个域名下，一般就几条

2. ##### cookie的增删改查

   - 设置：document.cookie = 'key = value'

   - 生命周期：默认的生命周期就是当前的浏览器彻底关闭，生命结束

     ​			生命周期可以设置

   - 获取cookie：document.cookie 

   - 删除cookie：setCookie(key,val,-1);

3. ##### 存储的数据为对象时的问题

   - *** 如果要存储对象类型的数据，那么浏览器默认会调用toString，返回 [object Object]
   - 因此要把对象转化为字符串模式 ：JSON.stringify();