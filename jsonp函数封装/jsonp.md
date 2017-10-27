1. ##### jsonp

   - 跨域（不同源）：不同协议、端口、域名（ip）

   - ##### jsonp的数据为：函数名+括号

   - ajax的数据为：对象形式的字符串

   - ##### 必须在全局下定义一个函数来接收数据

   - 在需要数据的时候，创建一个script标签，引入接口

   - ajax的数据，jsonp只能看，拿不到(除非后台做处理)

   - ##### Jsonp只有get请求方式，因为是靠url传输数据的

2. ##### 小知识


```javascript
1. 找arr[1，2，3，4,0]中最小的值
var min =  Math.min.apply(null,arr);  // 0

2. 找对应值得索引
arr.findIndex((e,i) {
     e = min           
})
// 4

3. new Data().getTime()  ===  +new Data

4.将obj内容给opt
	for(var attr in obj){
        opt[attr] = obj[attr];
   }

  Object.assign(opt,obj);

5. 清空数组的方法
	arr.length = 0;  // 这个方法比较好，直接在本数组下让数组为空，不用再用【】值覆盖数组
	arr = [];

6. 查看数组中是否有这个值
[1，2，3，4].includes(4); // true 代表有这个值

7. 过滤
[1，2，3].filter(e => e != 2); // [1,3]  过滤掉不的值
```

​