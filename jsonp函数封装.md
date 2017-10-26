1. ##### jsonp

   - 跨域（不同源）：不同协议、端口、域名（ip）
   - jsonp的数据为：函数名+括号
   - ajax的数据为：对象形式的字符串
   - 必须在全局下定义一个函数来接收数据
   - 在需要数据的时候，创建一个script标签，引入接口
   - ajax的数据，jsonp只能看，拿不到(除非后台做处理)

   ```javascript
      //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=miao&json=1&p=3&sid=1451_21122_18559_20881&req=2&csor=4&pwd=mia&cb=jQuery110205764458768366003_1509019985253&_=1509019985257

       /*
       *
       *   1.url 和 jquery，callback都是后台定的
       *   2. fn不能重名，会发生函数覆盖
       *
       * */

       
       txt.onkeyup = function(){
           jsonp({
               url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
               data:{
                   wd:txt.value
               },
                callback:'cb',
               // fnName:'fn',
               success:function(obj){
                   console.log(obj);
   //                ul.innerHTML = '';
   //                obj.suggestKeycords.forEach((e,i)=>{
   //                    ul.innerHTML += `<li>${e}</li>`
   //                });
               },
               fail:function(){
                   alert('请检查网络');
               }
           })
       }




   function jsonp(obj){

       var opt = {
           url:'',
           data:{},
           callback:'callback',
           //设置fnName为了不让函数名重名
           fnName:('jquery'+new Date().getTime()+Math.random()).replace('.',''),
           success:function(){},
           fail:function(){}
       };

       for(var attr in obj){
           opt[attr] = obj[attr];
       }

       //{query:ss} -> {query:ss,cb:'fn'},方便一次性循环就拼接成最后的结果
       opt.data[opt.callback] = opt.fnName; 
       
       var arr = [];
       for(var attr in opt.data){
           arr.push(attr + '=' + opt.data[attr]);
       }

      var queryString =  arr.join('&'); //query=sdf&callback=fn

      //console.log(queryString) 
      //query=ss&xxx=hh

      var timer = null;
      timer = setTimeout(function(){
           opt.fail();
       },5000);

      window[opt.fnName] = function (obj){
           clearTimeout(timer);
           opt.success(obj);
      };

   //    console.log(opt.url + '?' + queryString + '&' + opt.callback + '=' +opt.fnName);

       var os = document.createElement('script');
       os.src = opt.url + '?' + queryString; //+ '&' + opt.callback + '=' +opt.fnName;
       document.getElementsByTagName('head')[0].append(os);
       os.remove();
   }
   ```

   ​

2. ##### 瀑布流

   ```javascript
       <style>
           body {
               background: skyblue;
           }

           * {
               margin: 0;
               padding: 0;
           }

           .pic {
               width: 10px;
               box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
               overflow: hidden;
               margin-top: 10px;
           }

           img {
               width: 180px;
               border: none;
               display: block;
           }

           ul {
               list-style: none;
               margin: 0 auto;
               /*border:1px solid #000;*/
               width: 1200px;
               overflow: hidden;
           }

           li {
               /*position: absolute;*/
               float: left;
               margin: 8px;
               width: 180px;
               box-shadow: 0 0 10px #000;
           }
           #load{
               height: 50px;
               width: 100%;
               position: fixed;
               left: 0;
               bottom: 0;
               background-color: #fff;
               text-align: center;
               display: none;
           }
           #load img{
               display: inline-block;
               height: 50px;
               width: 50px;
           }
       </style>
   </head>
   <body>
   <ul id="ul">
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
   </ul>

   <div id="load">
       <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509026020755&di=8bee09866b0762605cb0ad34a08768fd&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201606%2F18%2F20160618173902_VNsaQ.gif">
   </div>

   <script src="jsonp_1.0.js"></script>
   <script>
       /*
       *  瀑布流思路：
       *     1. 页面中有四个li，形成四列
       *     2. 每次加载时往高度最小的li里面放图片
       * */
       const ul = document.getElementById('ul');
       const lis = Array.from(document.getElementsByTagName('li')); // 类数组转数组

       var num = 0;

       var onOff = true; // 数据请求结束

       waterFall(num); // 调用函数 数据加载

       function waterFall(num){
           onOff = false; // 数据请求中
           load.style.display = 'block';
           jsonp({
               url: 'http://www.wookmark.com/api/json/popular', // 请求数据的地址
               data:{
                   page: num
               },
               // 接受数据成功后处理数据
               success:function (data){
                   // 循环数据data，将数据渲染在页面中
                   // 创建div和img存放图片数据
                   if(!data.length){ // 如果没有数据了，直接不走下面内容
                       load.style.display = 'none';
                       return;
                   }

                   data.forEach((e,i) => {
                       let div = document.createElement('div');
                       div.className = 'pic';
                       // n创建一个image标签
                       let img = new Image();
                       img.src = e.preview;

                       // 只有能显示的图片才能插入到 页面上
                       img.onload = function (){
                           div.appendChild(img);
                           // 获取高度最小的li
                           let minLi = findMin();
                           minLi.appendChild(div);
                       };
                   });

                   onOff = true; // 数据请求结束
                   load.style.display = 'none';
               }
           });
       }

       // 滚轮

       document.onscroll = function (){
           let minLi = findMin(); // 获取高度最小的li

           // 如果最小li的高度小于可视区高度，就请求下一页的 数据
           if(minLi.getBoundingClientRect().bottom <= window.innerHeight){
               // 当上一页的数据全部显示完之后，再请求下一页的数据
               if(onOff){
                   num++; // 请求下一页的数据
                   waterFall(num); // 调用函数 数据加载
               }
           }
       };




       // 找li中高度最小的值
       function findMin(){
           // 存放li的高度
           var arr = [];
           lis.forEach((e,i) =>{
               arr.push(e.scrollHeight);
           });
           // 找到li中高度最小的高度
           var min = Math.min.apply(null,arr);
   //        console.log(min);
           // 找到最小高度的li
           return lis[arr.findIndex((e,i) => e == min)]
       }

   ```

   ​

   ​

3. ##### 小知识

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
   ```

   ​