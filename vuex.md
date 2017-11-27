# vuex
> Vuex：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### vue自管理应用包含的几个部分
1. state，驱动应用的数据源
2. view，以声明方式将state映射到视图
3. actions，响应再view上的用户输入导致的状态变化
4. 以下是一个‘单项数据流理念’的示意图
    ![单向数据流](media/%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81.jpg)


5. 多个视图依赖于同一个状态
6. 来自不同视图的行为需要变更同一状态
> 导致的问题：
    - 当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏；
    - 问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力
    - 问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。
     
### 解决的方案：vuex
1. 把组件的共享状态抽取出来，以一个全局单例模式管理
2. 在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为
3. 通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护
4. vuex 示意图：
![](media/15116845328767.jpg)


### vuex的使用情况
1. 适用于中大型单页应用
2. Flux 架构就像眼睛：您自会知道什么时候需要它。

### 使用vuex的一些知识点
1. mutation
    - 要修改vuex中的state，必须commit一个mutation
    - 作用：
        - vue-tools能够记录状态的变化   
        - 能够对赋的值做一个滤过判断 
    - 特点
        - 必须是同步函数
        - 也就说提交一个Mutation之后，立马要把state的值改了，不能再Mutation中写任何异步的操作
        - 当使用异步操作的时候，因为只要提交一个mutation，就会有一条记录，记录记的时候，state值还没有改变
2. actions
    - 异步操作
    - 在action中提交Mutation
    - commit一个Mutation，是this.$store.commit('Mutation名字'，参数)
    - dispatch一个action 是this.$store.dispatch('action名字'，参数)
3. axios
    - 数据请求
    - 用法：
    
        ```javascript
         Axios.get(url)
         .then(function (pramas){
         	console.log(pramas)
        
         	store.commit();
         })
        ```
4. 跨域请求数据问题
    - 请求头的解决方法
    
        ```javascript
        app.use(function (req,res,next){
           res.header("Access-Control-Allow-Origin", "*");
           res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
           res.header("Access-Control-Allow-Headers", "X-Requested-With");
           res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })
        ```
5. vuex的请求数据过程
    - 先清楚自己想要的数据  list 数组
    - 获取数据
        
        ```javascript
            computed: { // 获取  数据
                list () {
                    return this.$store.state.list
                }
            }
        ```
    - 如何拿新的数据：改变数据 通过 dispatch 分派给actions一个函数getDateAction去拿数据，
        
        ```
        methods: { 
            setState(){
                this.$store.dispatch('getDateAction')
            }
        }
        ```
    - actions 接收到 派遣通知 利用 Axios 获取数据parse
    - 再用commit，将数据传给 mutations 来改变数据 list
        
        ```javascript
        getDateAction (store) {
            // 用 Axios 获取数据
            Axios.get('http://192.168.2.75:3000/info')
            .then(function (parse){
                store.commit('changeList',{ // 将获取的数据  交付给 mutations来更新状态
                    list: parse.data.data
                })
            })
        }
        ```
    - mutations 拿到 新的数据 来改变 状态
            
        ```javascript
        mutations: { // 改变状态
            changeList(state,payload){
                state.list = payload.list // 更新视图
            }
        }
        ```        

6. 博客园推荐
    - http://www.ruanyifeng.com/blog/
    - https://segmentfault.com/
    - https://juejin.im/timeline
    - https://github.com/
    - https://www.csdn.net/
    - https://www.cnblogs.com/
    - http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html#3848276

