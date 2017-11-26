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

    15. vue的组件

       - 语法： Vue.component(组件名字,组件的选项)

       - 组件的名字命名规则

         - 不能使用html规定的标签名  如：div   span等

         - 可使用烤串命名法（new-list）驼峰命名法  （newList）

         - 但是在模板中使用时，必须使用烤串命名法

         - ```javascript
           // 模板

           <div id="app">
               <news-list></news-list> // 烤串命名法
           	<news-list></news-list>
           	<custom-hello-miaov></custom-hello-miaov>
           </div>

           // js

           // 子组件一：
           Vue.component('custom-hello-miaov', {
             template: `<div>hello</div>`
           })

           // 子组件二：
           Vue.component('newsList', {
             template: `<div>
                         <h2>新闻</h2>
                         <ul>
                         <li>天气很好</li>
                         <li>雾霾很少</li>
                         <li>可以畅呼吸</li>
                         </ul>
                         </div>`
           })

           // 根实例   父级组件
           new Vue({
             el: '#app'
           })   
           ```

    16. vue组件的嵌套

       ```javascript
           Vue.component('custom-hello-miaov', {
                      template: `<div>hello</div>`
                    })
                    Vue.component('newsList', {
                      template: `<div>
                                <h2>新闻</h2>
                                <ul>
                                <li>天气很好</li>
                                <li>雾霾很少</li>
                                <li>可以畅呼吸</li>
                                </ul>
                                	// 此处，直接在子组件的 模板中具体的位置插入
                                <custom-hello-miaov></custom-hello-miaov>
                                </div>`
                    })

                    new Vue({
                      el: '#app'
                    })
       ```

    17. 定制组件的数据   props

       - 使用props传递数据
       - 父组件的数据需要通过 **prop** 才能下发到子组件中

       ```javascript
         <div id="app">
            	// 通过v-bind 绑定自定义属性title ，将数据传递到  自定义属性 title上，再通过props传递给子组件，供子组件使用
                <news-list :title = 'newsTilte' :list ="newsList"></news-list>
            </div>

            Vue.component('newsList', {
              props:['title','list'],  //显式的写出要接收的key的名字
              template: `<div>
                        <h2>{{title}}</h2>
                        <ul>
                        <li v-for="item in list">{{item}}</li>
                        </ul>	
                        </div>`
            })

            let newsTilte = '新闻';
            let newsList = ['1',2,3,4,5,6]

            // 根实例
            new Vue({
              el: '#app',
              data:{
                newsTilte,
                newsList
              }
            })
       ```

    18. 子组件和父组件的通信    通过  emit  和  props

       - props ：  父组件把数据传给 子组件
       - emit：子组件通过  emit 发给父组件，父组件再进行监听



```javascript

     举例说明：

     /*
     				定义一些 props
     					title 弹框标题     必填项
     					okValue 确定文案
     					cancleValue 取消文案
     				父组件 -> 子组件 props
     				子组件 -> 父组件 custom-event
     				每一个组件都是独立的
     */
     
     

     /*
     	1. 父组件通过  props  将数据传给 子组件，并且定义一些规则
     	2. 子组件通过emit 将信息传递出去  ，父组件再进行监听
     */
     
     
     
       // html结构
         <div id="app">
         <custom-dialog
           title='登录'
           ok-value="登录"

           @ok="parentOk"
         ></custom-dialog>

         <div v-show="isLogin">我是登录的用户名：tian</div>
     </div>

     // 具体的js实现

     Vue.component('custom-dialog', {
       //props: ['title','okValue', 'cancleValue']
       props: {
         title: { 
           type: String,   // 类型为字符串
           required: true  // 必填项
         },
         okValue: {
           type: String,
           default: '确定'   // 选填项
         },
         cancleValue: {
           type: String,
           default: '取消'
         }
       },
       
       template: `
               <div class="dialog">
               <h2>{{title}}</h2>
               <div class="content">
               这是内容
               </div>
               <div class="footer">
               <button @click="okHandle">{{okValue}}</button>
               <button>{{cancleValue}}</button>
               </div>
               </div>
       `,
       
       methods: {
         okHandle (){
           // 子组件发布一个事件
           //console.log(this);  // 当前所在组件的实例
           this.$emit('ok'); // 内部发布事件
         }
       }
     })

     // 根实例
     new Vue({
       el: '#app',
       data:{
         isLogin: false,
         isLogin123: true
       },
       methods: { // 父组件对子组件的  发布  做出具体的响应
         parentOk () {
           console.log('触发了这个事件处理函数');
           this.isLogin = true
         }
       }
     })
       
```



19. 插槽

    - 单插槽：<slot> 插口   最初在 <slot> 标签中的任何内容都被视为备用内容，当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身
    - 多插槽：要使用 name  
      -  子组件模板中： 放在标签h2中   <slot name="h2"> {{title}} </slot>
      -  父组件的结构中：加一个em标签  <em slot="h2">我才是标题</em>
    - 作用域插槽：用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素
      - 改变footer里的内容
      - 把要改变的内容  用<slot name="footer"></slot> 包起来
      - 再把要替换的内容用<template slot="footer"></template>包起来
      - template标签在结构上不会被显示
    - 当定制内容的时候，作用域是父组件的，但是定制的内容需要渲染子组件中的数据，需要用slot标签传到定制的内容上，定制内容使用slot-scope来接受
      - <slot :title="title"><span>{{title}}</span></slot>
      - <template slot-scope="abc">{{abc.title}}</template>

20. 编写组件
    - 在编写组件时，最好考虑好以后是否要进行复用。一次性组件间有紧密的耦合没关系，但是可复用组件应当定义一个清晰的公开接口，同时也不要对其使用的外层数据作出任何假设。
    - Vue 组件的 API 来自三部分——prop、事件和插槽：
      - Prop 允许外部环境传递数据给组件；
      - 事件允许从组件内触发外部环境的副作用；
      - 插槽允许外部环境将额外的内容组合在组件中。

21. Vue-cli
    - 安装过程
      - 工具：npm i vue-cli -g
      - 命令行中 vue -v   出现版本号安装成功
      - vue init webpack project(项目名称)
      - cd进入project
      - 先安装模块 npm i
      - 启动项目 npm run dev
    - 项目介绍
      - main.js :    入口文件
      - App.vue:    根组件  
      - components:  在里面创建   子组件
      - assets：在里面放 css文件，在入口文件main.js里面引入  css文件

22. vuex

    - 状态管理器

    - 具体使用步骤

      - 安装vuex     npm i vue -S

      - 引入vuex    import Vuex from 'vuex'

      - 使用vuex     Vue.use(Vuex)   ： 在每个子组件中都可以使用了

      - 创建一个store实例

        ```javascript
        let store = new Vuex.Store({
            state: { // 数据
                n:0
            },
            mutations: {
                // 定义改变n的函数
                changeStateN (state,num){
                    state.n = num
                }
            }
        })

        // 在根实例中使用store

        new Vue({
          el: '#app',
          store,   // 实例中插入 store
          template: '<App/>',
          components: { App }
        })

        ```

      - 如何在子组件中获取和改变数据n

        ```javascript
        export default {
            // 在计算属性中 使用 store 里面的变量
          computed: {
              getState () {
                  return this.$store.state.n
              }
          },
          // 通过计算属性  改变 store 里面的变量n
          methods: {
              setState () {
                  this.$store.commit('changeStateN',30)
              }
          },
          components: {
              HelloWorld
          }
        }
        ```

        ​

23. 用Cli 来写todos例子

    - cli 脚手架文件介绍
      - main.js ：入口js文件
      - App.vue:  根组件，在这引入其他组件
        - import headerList from './components/header';
        - import contentList from './components/content';
        - import footerList from './components/footer';
      - assets： 存放组件的资源，图片，css文件等
      - components:  存放子组件的地方，header.vue，content.vue,footer.vue
    - 如何引入多个css文件 
      - 将项目css都放在 assets 文件中
      - 新建一个入口的app.css文件
      - 将项目css文件都引入 入口的app.css文件中      


    ```css
    @import './base.css';
    @import './index.css';
    ```

    - 根组件和子组件之间的引入与导出
      - App.vue:  根组件
        ```javascript
        import headerList from './components/header'
        import contentList from './components/content'
        import footerList from './components/footer'
        ```

      - components： 存放子组件
        - header.vue 头部
        - content.vue 内容
        - footer.vue 尾部

    - 模板数据的渲染

      - 根组件 App.vue中要使用数据list      在content标签上加上属性  :list="list"
      - 数据使用地：content.vue,  props中继承根组件的数据 props=["list"] ,然后在需要使用数据的地方  v-for 循环生成数据结构

    - 添加

      - 操作的是头部 header 里面的input标签，将input里面的value值添加到content中
        - 实现input的双向绑定：在header数据结构中 定义一个变量message，再在input标签内 写上 v-model=“message”
        - 给header的input标签一个鼠标enter事件 addList,事件中使用emit，将需要添加数据之一动作发布给根组件，暗号是addList
        - 根组件根据暗号@addList = “addListHandel”，触发一个addListHandel事件，来添加数据
        - 删除修改与添加类同

    - 单选和全选

      - 依赖计算属性 computed : {isAllChecked: {get(){},set(newValue){}}}
      - 全选input 标签 v-model=“isAllChecked”    单选input 标签  v-model="item.checked"   item.checked:list的变量
      - 获取属性 get 事件逻辑： 单选都选中返回true，只要有一个没选中返回false
      - 设置属性 set 事件逻辑：用变量newValue存放 get返回出来的布尔值 ，再把这信息发布给 根组件 App.vue  ,根组件接收后，根据newValue设置list的变量 checked

      ​

      ​

      ​  