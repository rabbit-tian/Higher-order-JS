1. 什么是  vue

    vue是一套构建用户界面的**渐进式框架**

2. vue中两个核心

    - 响应式的数据 => 数据
    - 可组合的视图组件

3. 虚拟DOM 

    - 模板利用render函数生成标签(标签嵌套标签)，在vue是以对象形式存在(对象嵌套对象)

4. MVVM模式

    - M：model  js中对象
    - V： 视图
    - VM： 实例

5. 声明式渲染

    - 挂载点
    - 数据

6. 指令:

    写在标签上作为行间的自定义属性 以v-开头,是Vue提供的特殊属性，用来完成某项功能的

    1. v-bind

       - 动态绑定数据,简写为   :    
       - 语法： v-bind:属性名="data中的数据"

    2. v-for 做循环

       - 语法:

       ```javascript
       v-for="value,key in 数组"
       v-for="value in 数组"
       v-for="value,key of 数组"
       v-for="value of 数组"
       ```

    3. v-show  ---切换元素显示隐藏 v-show

       - 切换display为block还是none
       - 语法：v-show="表达式"
         - 表达式的值为true，元素显示
         - 表达式的值为false，元素不显示

    4. v-if — 数据没有就不渲染结构的 v-if

       - 语法：v-if="表达式"
         - 表达式的值为true，元素渲染
         - 表达式的值为false，元素不渲染

    5. v-on — 绑定事件     简写为@click

       - 语法：v-on:事件名 = '表达式|事件处理函数'
       - 把定义的事件处理函数放在一个地方 选项对象中的methods中

    6. 事件对象

       - 函数就是监听器
       - btn发布click事件，被监听器监听到了
       - 知道这次事件触发的细节   —  事件对象
       - 事件对象是内部在调用这个事件处理函数的时候，作为第一个参数传过去
       - 开发者所能做的就是通过一个形象接收
       - 在vue中，当函数传了参数，事件对象 通过 $event拿到

    7. 遍历

       - map   ：原数组有几项，返回的数组就有几项，map返回的新数组中的值是回调函数执行后的返回值

         举例

         ```javascript
         let arr = [1,2,3];
         let newArr = arr.map(function (item,index){
           console.log(item,index);
           return item+1;
         })
         console.log(newArr); [2,3,4]
         ```

       - filter: 过滤某个数组的，根据某个条件过滤

         ```javascript
         let arr = [1,2,3,4,5,6,7,8];
         let newArr = arr.filter(function (item,index){
           console.log(item,index);
           return item < 3; // 根据这个条件的真假，决定这一项是否放在新数组中
         });

         console.log(newArr); // [1,2]
         ```

       - reduce: 

         - 把数组每一项累加,上一次累加的结果作为下一个的初始值,回调函数的第一个参数，就是上一次函数执行后的返回值

         - 参数：第一个参数是函数,第二参数是初始值

         - ```javascript

           let arr = [1,2,3,4];
           let total = arr.reduce(function (item1,item2){
             console.log(item1,item2);
             return item1+item2
           },100)
           console.log(total);  // 110
           let arr2 = [{a:1,b:3},{a:2,b:4},{a:3,b:5}];
           let m = arr2.reduce(function (item1,item2){
             console.log(item1,item2);
             return {
               a: item1.a + item2.a,
               b: item1.b + item2.b
             }
           },{a:1000,b:1000})

           console.log(m);   {a: 1006, b: 1012}

           ```

       -  forEach

          - 拿到数组每一个值，以及值对应的下标

          - ```javascript
            let arr = [{
                age:30,
                name:'leo',
                weight: 100
                },{
                age:45,
                name:'leo',
                weight: 100
                }];

            // 计算这些人的年龄总和？以及体重的总和？

            let ages = 0;

            let weights = 0;

            arr.forEach(function (item){

              ages += item.age;

              weights += item.weight;

            })

            console.log(ages,weights);

            ```

            ​

    8. 双向数据绑定

       - 数据 -> 模板 -> 数据
       - 如果遇到的是input textarea 不需要手动的写input监听. =>.  v-model指令
       - 根据input的类型，把v-model转成不同的值
       - input为text，转成value
       - input为checkbox,radio, 转成checked

    9. MVVM模式

       - M model 数据
       - V view 视图
       - VM view-model 视图-模型

    10. input  留言板

      - 一上来把数据中message通过v-model绑定在input的value上
      - v-model会监控value的变化，立马更新message的值
      - 事件修饰符：语法： @事件名.修饰符 = '事件处理函数'

    11. 计算属性

       - 尽可能少的在模板中写业务逻辑，写的多，模板会很臃肿
       - 计算属性 就是一个属性 用来写关于data的一些逻辑的
       - 把处理data的逻辑放在计算属性中写    computed 计算
       - computed 中有  get(获取)   和  set(设置)
         - 计算属性中的值依赖于data中的值，如果data的值发生变化，那么计算属性就会重新计算
         - 这个计算属性的值，是函数的返回值
       - 使用Object.defineProperty(对象,key,描述)
         - 定义属性的时候，属性对应的值不能被改写

         - ```javascript
           存 取  描述
           存 会触发setter对应的函数set
           取 会触发getter对应的函数get
           Object.defineProperty(对象,属性,{
             get(){

             },
             set(){

             }
           })
           ```

    12. 函数的调用方式：

       - 直接调用 this => window
       - 事件触发调用 this => 触发事件的元素
       - new 调用 this => 通过函数创建实例
       - 定时器 this => window
       - call/apply this => call/apply的第一个参数
       - 作为对象的方法 this => 调用方法的对象
       - 函数中this的值不是定义函数的时候确定的，而是在调用的时候确定的
       - 箭头函数中this是在定义的时候绑定这个箭头函数所在作用域的this的值

    13. 异步和同步

       - 异步：不会立马得到结果，而是在未来的某个时刻得到结果
       - 同步：立马要得到结果,在进行之后的操作

    14. localStorage   数据 持久化  =>  全局的对象

       - setItem(key,value)     =>   存的是对象，都会转成字符串   用  JSON.stringify({num:a}) 转一下
       - getItem(key)   没有取到返回null
       - removeItem(key)

