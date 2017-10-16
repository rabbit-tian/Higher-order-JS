1. ##### 正则表达式

   - 是检索(模糊范围)字符串的一种规则
   - 简写： //   里面不可以用变量
   - 全写：new RegExp(可以为字符串||正则,'i')    此处正则可以写变量

2. ##### 转义符

   | 写法    | 含义                  |
   | :---- | ------------------- |
   | \d    | 一个数字                |
   | \D    | 一个非数字               |
   | \w    | 一个字符(字母，数字，下划线)     |
   | \W    | 一个非空字符              |
   | \s    | 一个空格                |
   | \S    | 一个非空空格              |
   | \b    | 边界符                 |
   | .   点 | 任意字符（除了制表符(tab)和空格） |
   |       |                     |

3. ##### 修饰符

   | 写法         | 含义    |
   | ---------- | ----- |
   | i (ignore) | 忽略大小写 |
   | g (global) | 全局匹配  |

4. #####  量词

   | 写法          | 含义    |
   | ----------- | ----- |
   | +           | 一次或多次 |
   | ？/  {0,1}   | 0或1次  |
   | {start,end} | 数量的范围 |
   | * /  {0,}   | 任意次   |

   ​

5. #####  正则的常用方法

   | 方法名     | 语法                              | 返回值          |
   | :------ | ------------------------------- | ------------ |
   | test    | //.test(string)                 | true / false |
   | search  | string.search(//或字符串)           | 位置/-1        |
   | match   | string.match(//)                | 匹配到的数组/ null |
   | replace | string.replace(//或字符串,字符串或回调函数) | 替换好的内容       |

   举例说明：

   ```javascript
   1.test 测试是否存在
   // 查看正则是否匹配字符串，如果是返回true否则false
   // 检测字符串中是否夹着"数字"
   var s = 'abcdhsjadhsadhjsahdjksajdhskdd9';
   console.log(/\d/.test(s)); // true
   console.log(/x/.test(s)); // false

   2.search 查找位置
   //查找字符串指定字符的位置。 找到范围位置，没找到返回-1;
   var s = 'dshjdsdXak0jkadak';
   console.log(s.indexOf('x')); // -1  区分大小写
   console.log(s.search('x'));  // -1  区分大小写
   console.log(s.search(/\d/)); // 10
   console.log(s.search(/x/i)); // 7
   console.log(s.search(new RegExp('x','i'))); // 7

   3.match 匹配
   // 把正则匹配到的字符提取出来，放到数组中(返回值为数组),能匹配到就放在数组中，匹配不到返回null
   /*
   小细节:
        如果只匹配到了一个，那么数组中不只一个东西，
        但是**length为1
        第一个为匹配到的字符
        第二个为匹配字符的索引
        第三个整个字符串
        
   特性:
       贪婪:
           一直找
       懒惰:
           找到一次之后就不再找了（直接返回）
   */ 
   var str = 'dsd5637X2328236jdsdscxdxc37X83kljk54ls3x2xkd4rnej7';

   console.log(str.match(/\d+/g)); 
   // ["5637", "2328236", "37", "83", "54", "3", "2", "4", "7"]
   console.log(str.match(/x+/ig)); 
   // ["X", "x", "x", "X", "x", "x"]
   console.log(str.match(new RegExp('x+','ig'))); 
   // ["X", "x", "x", "X", "x", "x"]
   console.log(str.match(/z+/ig)); //null

   4.replace 替换
   // string.replace(字符串||正则,字符串||回调函数)
   /*
   替换匹配的字符串
   	第一个参数:
   		匹配的字符串
   	第二个参数:
   		替换的字符串

   返回值：
   	替换后的字符串。

   回调函数参数（默认情况）：
   	第一个参数：
   		找到匹配的字符
   	第二个参数:
   		索引
   	第三个参数:
   		整个字符串
   	第三个之后:
   		undefined    
   */

   // 例子：敏感词替换
   var str = '中国共产党总书记习近平说:“法轮功是邪教”';

   var s = str.replace(/共产党|习近平|法轮|邪教/g,function($0,$1,$2,$3){
     	// console.log($3);
     	var temp = ''; 
     	for(var i=0;i<$0.length;i++){
       	temp += '*';
     	}
     	return temp;
   });

   console.log(s); // 中国***总书记***说:“**功是**”

   ```

   ​

6. ##### 子项 （小括号）

   - 子项的特点：

     - () 从左往右去数
     - 提权 (1+1)*5
     - 每有一个子项，就对应回调函数中的参数（从第二个参数起），$0永远是本次匹配的整个字符

   - 小栗子 1，格式化日期

     ```javascript
     1. 要求：
     格式化日期:
         2017-10-13
         2017/10/13
         2017年10月13日
         2017.10.13
         2017-.--_10_-13
     把上面不规则的转成 2017年10月13日

     var s = '2017-10-13';
     s = s.replace(/(\d+)\D+(\d+)\D+(\d+)\D?/,function($0,$1,$2,$3,$4,$5,$6){
       // $1: (\d+) -> 2017
       // $2: (\d+) -> 10
       // $3: (\d+) -> 13
        return $1 + '年' + $2 + '月' + $3 + '日';
     });
     console.log(s); // 2017年10月13日
     ```

   - 小栗子2，将对应项替换

     ```javascript
     var obj = {
         name:'小明',
         age:23,
         sex:'男'
     };

     var str = '我的名字叫${name},今年${age}岁,性别${sex}';

     str = str.replace(/\${(\w+)}/g,function($0,$1){
         console.log($1); // 'name', 'age', 'sex'
         return obj[$1]; 
     }); 
     console.log(str); // '我的名字叫小明,今年23岁,性别男'
     ```

7. [] 中括号

   - 在中括号中，只选择任意一个

   - 小栗子，查找18-108中任意一个数字

     ```Javascript
     console.log(/1[89]|[2-9][0-9]|10[0-8]/.test('1008')); // true  没有上限 只要是18以上都可以

     解决方法： 加上 开头和结尾  ^ $
     console.log(/^1[89]$|^[2-9][0-9]$|^10[0-8]$/.test('108')); // true 18-108
     ```

8. 小尖尖  ^ 

   - 第一个意思： 开头，小栗子，查找精确范围

     ```Javascript
     // 要求：查找18-108中任意一个数字
     console.log(/^1[89]$|^[2-9][0-9]$|^10[0-8]$/.test('108')); // false 
     console.log(/1[89]|[2-9][0-9]|10[0-8]/.test('1008')); // true
     ```

     ​

   - 第二个意思 ：排除，见一下小栗子(如果小尖尖在中括号中，就是排除的意思。)

     ```javascript
     // 要求： 排除a2ca3c
     var str = 'a1ca22ca3cabcafcayc';
     console.log(str.match(/a[^23y]c/g)); //["a1c", "abc", "afc"];

     // 要求：匹配除了 a12c 的四位数
     console.log(str.match(/a[^1]2c/g));  // ["a22c"]
     ```

   - 第三个排除例子 ：过滤标签

     ```Javascript
     <body>
         <textarea name="" id="txt1" cols="30" rows="10">
             <div class="item">
                 <span>数据类型</span>
                 <em>03</em>
                 <div class="line"></div>
             </div>
         </textarea>
         <hr>
         <textarea name="" id="txt2" cols="30" rows="10"></textarea>
         <button id="btn">过滤标签</button>
     <script>
         btn.onclick = function(){
             var str = txt1.value.replace(/<[^>]+>/g,''); // 匹配 < 到除了>的内容 再合上>

             txt2.innerHTML = str.replace(/\s+/g,''); // 去除空格  ”数据类型03“
         }; 
     </script>    
     </body>
     ```

     ​

9. 面试题(计算字节)

   ```javascript
   // 要求：计算下面字符串中的字节总数是多少，假设一个汉字为2个字节，字母为1个字节
   // 注：中文的区间范围   [\u4e00-\u9fa5]

   var str = 'hello!欢迎大家来带妙味课程!';//27
   var num = 0;
   for(var i=0;i<str.length;i++){
     if(/[\u4e00-\u9fa5]/.test(str[i])){
       num += 2;
     }else{
       num ++;
     }
   }
   console.log(num); // 27
   ```

   ​

10. 边界符版 封装 兼容 className

  ```javascript
  /*
          重点：
              1.找规律
              2.使用new RegExp()
                  如果使用标准正则写法，那么第一个里面可以为字符串，
                  这个时候就可以使用变量，如果规则中使用转义符，记得
                  要转义。如 \\s   /|\都需要转换。
              var s = '123';
              /s/ -> 's'
              new RegExp(s,'g') -> '123'
  */

  <body>
      <ul>
          <li>1</li>
          <li class="li1     li">2</li>
          <li>3</li>
          <li class="li1 li2">4</li>
          <li>5</li>
      </ul>
  <script>
          function getByClass(sClass){
                  var s = sClass.charAt();
                  if(s === '#'){

                      return document.getElementById(sClass.substring(1))
                  }else if(s === '.'){
                      if(document.getElementsByClassName){
                          return document.getElementsByClassName(sClass.substring(1));
                      }else{
                          var arr = [];
                          var aEle = document.getElementsByTagName('*');
                          var re = new RegExp('\\b' + sClass.substring(1) + '\\b','g'); // \\b的含义: 转义\b
                          for(var i=0;i<aEle.length;i++){
                              if(re.test(aEle[i].className)){
                                  arr.push(aEle[i]);
                              }
                          }
                          return arr;
                      }
                  } 
          }
          
          console.log(getByClass('.li1').length); // 2
          
  </script>
  </body>
  ```

  ​

11. 重复子项

    ```javascript
    	/*
            重复子项:
                \ + num(第几个子项就写几) 从左往右数的

                比如:
                    (\d)\1   -> 7(\d) 7(\1)

                    ((\d)i)\1\2  -> 7i7i7

                    (((\d)i))

               *** 注意：
                    重复子项必须写到子项的后面，不然没效果。

            7i77i7i7i77i
    	*/

    举例说明：

        var str = 'ajjjjc a3674673c 7i7i77i   7i77i7i7i77i';

        console.log(str.match(/((((\d))i))\3\1\2\2\3\1/)); // 7i77i7i7i77i
        console.log(str.match(/\1((\d)i)\2\1/g)); //7i77i   重复子项不能放在前面
    ```

    ​

12. 重复子项的面试题

    ```javascript
    // 找出下列字符串中数量最多的是谁？有多少个？
    var str = 'sdfsdfmkkk33333333333333kdmmwwwwmm222222222222222948348594354444444000084884333333333';
    方法一：正则的方法
        var index = 0;
        var most = '';
        str = str.split('').sort().join(''); // 先将字符串进行排序
        str.replace(/(\d)\1+/g,function ($0,$1){ // 匹配重复出现的项，然后进行对比，找出长度最大的项
            if(index<$0.length){
                index = $0.length;
                most = $1;
            }
        });

        console.log('出现次数最多的字符'+most,'出现了'+index); // 出现次数最多的字符3 出现了9


     方法二：json的方法
    	var min = -Infinity; // 定义一个最小值
        var obj = ''; // 存放出现次数的 对象
        var json = { // 定义一个空对象 ，存放 出现的字符和其出现的次数

        };

        // 循环str，如果里面没有这个字符，就计次字符出现1次，如果出现过，次数++
        for (var i = 0; i < str.length; i++) {
            if(!json[str[i]]){
                json[str[i]] = 1;
            }else{
                json[str[i]]++;
            }
        }

        // 循环json里的键值 ，找出最大值和对应的键
        for(var attr in json){
            if(json[attr]>min){
                min = json[attr];
                obj = attr;
            }
        }

        console.log('出现次数最多的字符'+obj,'出现了'+min); // 出现次数最多的字符3 出现了9
    ```


13. 邮箱的验证

    ```javascript
    // 大概需要验证的邮箱
    /*
    23132132@qq.com          ^([1-9]\d{5,9})
    13888888888@139.com      ^(1[34578]\d{9})
    dsds_dsd@yeah.net
    dsds_dsd@163.com
    dsds@gmail.com
    zhipeng@miaov.com
    ndsd-dsdsd@hotmail.com   ^([A-Za-z][\w\-]{5,16})
    */

    var re = /^(1[34578]\d{9})|^([A-Za-z][\w\-]{5,16})|^([1-9]\d{5,9})@[A-Za-z0-9]{2,8}\.[A-Za-z]{2,3}$/;
    ```

14. 邮编和身份证验证

    ```javascript
    1. 邮编的验证
     6位都是数字
     /\d{6}/

    2. 身份证的验证
    例如：110281199308314310
    var re = /^[1-8][1-9][0-8]\d{3}((1[8-9][0-9][0-9])|(200[0-9])|(201[0-7]))(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(\d{4}$|\d{3}x$)/;
    ```

    ​