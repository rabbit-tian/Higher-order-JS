1. ##### 正则表达式

   - 是检索(模糊范围)字符串的一种规则
   - 简写： //
   - 全写：new RegExp(可以为字符串||正则,'i')

2. ##### 转义符

   | 写法   | 含义              |
   | :--- | --------------- |
   | \d   | 一个数字            |
   | \D   | 一个非数字           |
   | \w   | 一个字符(字母，数字，下划线) |
   | \s   | 一个空格            |
   |      |                 |

3. ##### 修饰符

   | 写法         | 含义    |
   | ---------- | ----- |
   | i (ignore) | 忽略大小写 |
   | g (global) | 全局匹配  |

4. #####  量词

   | 写法   | 含义    |
   | ---- | ----- |
   | +    | 一次或多次 |
   | ？    | 0或1次  |
   |      |       |

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

     ​