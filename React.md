1. ##### React：用一个对象去描述DOM结构，然后去创建对应的DOM元素，把dom元素插到容器中去

   - React.Component 是一个抽象的Class，通常继承该类来构建自定义的Component。 Component可以将U分离成独立的碎片，有点类似于JavaScript的function，它接受一个任意的输入（props）并返回一个React element描述屏幕中的内容。

2. ##### React的原理

   - 声明 react 的组件

       继承了 React.Component 的类就是一个组件
       至少有一个 render 方法(  这个方法应该 return 一份 jsx 的对象,
       这就是这个组件的样子)

   - 输出一份 virtual DOM （虚拟DOM）

   - react拿到这份虚拟DOM渲染页面

   - 当你要改变页面的状态，会重新得到一份virtual DOM去渲染（更新页面状态）

   - 旧的整个页面和新的整个页面去比较，比较哪里不同，就改变相应不同的部分

3. ##### react类式组件

   - 组件首字母大写，若里面没有内容，可以写闭合标签，如< /App >
   - 类式组件内的内容正常情况下不会被渲染到页面上，要通过{this.props.children} 来渲染
   - 组件可以复用

4. ##### jsx的语法

   - 相邻的jsx元素，必须包含在一个闭合的标签里面

   - 自己声明的组件要大写开头，内置组件要小写开头

   - 只要是在大括号{}里写的就是 表达式

   - 标签之间的内容就是 children，如果是内组件的标签，他的children通过实例的(this.)props.children拿到

   - 关键字要转成另外一种形式：class -> className    for -> htmlFor ,应该是驼峰式的

   - ```Javascript
     1. 接口文件 app.js
      // 引入React和ReactDOM组件
      import React,{Component} from 'react';
      import ReactDOM from 'react-dom';

      //引入三个组件模块
      import Header from './Component/Header';
      import Content from './Component/Content';
      import Footer from './Component/Footer';

      // 类式组件
      class APP extends Component {
        constructor(props){
          super(props)；
        }
        
        render(){
          return (
            
            <section className="box">
            	// 模块中有三个引入的模块
                <Header></Header>
                <Content></Content>
                <Footer></Footer>
            </section>
            
          )
        }
      }

      // 将模块转为 HTML 语言，并插入指定的DOM节点
      ReactDOM.render(
        </App>,
        document.getElementById('root')
      );
     ```

5. 安装依赖

   ```javascript
   1. 生产依赖

   npm i -S react 
   npm i -S react-dom

   1. 开发依赖

      npm i -D webpack               --webpack的cli(命令行界面)环境

      npm i -D babel-core            --代码需要调用Babel的API进行转码

      npm i -D babel-loader          --转化匹配的(ES6代码或图片等)内容

      npm i -D babel-preset-react    -- react预设(插件的集合)

      npm i -D clean-webpack-plugin   --自动清理dist里的文件

      npm i -D html-webpack-plugin    -- 自动生成html文件

      npm i -D css-loader             -- 开发阶段的打包css的 插件

   ```


   ​

6. 关于css-loader
   - 引入css文件的时候，使用css-loader处理它，遇到url或 @import ’filename‘，帮你去引入里面的资源，引入里面的资源中，根据资源的类型再使用相应的loader去处理


7. 关于file-loader
   - 处理资源（字体，图片，视频）
   - 转换出一个路径，把资源搬到输出目录

8. webpack打包css
   - 把css打包到 js 文件里    — 开发阶段
     - 把css变成字符串放在   创建的style标签，插入到head里面
   - 把css打包成一个单独的css文件，通过link引入(自动创建)  — 生产阶段

9. ***   props : react的属性
   - 传递属性：< Content  a="8">< /Content >
   - 拿到： let {a} = this.props

10. ​*************   state
  - 组件有内部状态  this.state = {}
  - 通过 this.setState(),来改变组件的内部状态，这个时候页面会更新，因为组件的 render执行了，得到了一份新的jsx的结构
  - 父组件的 render 执行了，子组件的 render 也会执行
  - 页面状态应该根据  this.setState()   更新
  - this.setState  可以接受对象作为参数，也可以接受一个回调函数

11. 关于setState  ：异步执行的问题
   - setState: 更新状态是异步更新的，放在一般函数里，(render在state合并之后 执行)
   - 但是如果把setState放在异步函数(如定时器或是请求)里面执行，它是同步更新的，(render马上执行，马上更新视图)

12. #### 组件受控

   - 某些组件有自己的行为，比如input，你输入东西的时候，页面状态就会变化，这是组件的本身的行为，
   - 如果给input一个value值，这样就收到了react的控制，这样就可以通过onChange来 ，setState 来改变 input 的  value
   - 非受控组件 = > 受控组件

13. 合成的事件对象 ev
   - ev.nativeEvent:访问浏览器dom元素的事件对象
   - preventDefault:
   - stopPropagation
   - Target :拿到真实的dom元素

14. react里面的事件

15. map方法
   - 数组下的一个方法
   - 接收一个回调函数，回调函数里面接收的参数是：{元素，索引，数组}
   - 回调函数的返回值会：替换掉原来的元素，返回一个新数组
   - 原来被遍历的数组没有变化

16. 当把数组写在jsx里面，React会自动展开

17. Key：在数组里面的jsx元素，应该在最外层的结构有一个key，应该保证相应数据的key是唯一的，同一份结构，永远保证不管如何视图变化，相同的数据对应同一个key值

18. 组件之间的交流

   - 数据传递，组件之间通过props进行数据传递，数据从顶层流向底层，永远是这样，**不能修改props

19. ### 拿到真实dom元素

   - 以前方法：在元素上声明一个自定义属性 ref = ‘sec’    ，在事件中通过  this.refs.sec拿到真实的dom
   - 现在方法：ref = { (el) = { this.cont = el } } ,通过 this.cont 就可以拿到真实的dom元素了

20. （类声明的）组件的声明周期

   - mounting阶段：组件被挂载阶段：出生阶段，只能被出生一次
   - updating 阶段：更新阶段：存活阶段，
   - unmounting 阶段: 卸载，死亡阶段

21. 声明周期的函数

   - mounting：
     - 组件被构造  ** constructor
     - 组件将要被挂载   componentWillMount
     - 组件 ***render 执行   渲染那一刻，虚拟dom  =>  真实dom
     - 组件挂载完成   **componentDidMount
       - 在函数里面发起请求
     - 在挂载完成之前，所有的组件都应该render，所有组件render之后，开始依次挂载，同层级的组件从先往后挂载；
     - 父子级组件，先挂载子组件；
     - 如果要拿到真实的dom，必须在组件挂载完成之后
   - updating
     - *componentWillReceiveProps() 奇葩，不会在自身setState后执行，在父组件的render执行后执行
     - showComponentUpdate()  特殊，返回true或false，react永远返回true；决定组件会不会更新，默认返回true，表示永远都可以被更新是，如果返回false，会阻断render的执行，拦截这一次更新
     - componentWillUpdate()  更新之前
     - ***render  就是那一刻
     - componentDidUpdate()  更新之后
     - 注意事项：更新阶段不要setState，除了那个时刻
   - unmounting
     - componentWillUnmount  卸载之前

22. promise  异步问题，解决回调函数的噩梦

23. #### router 路由

   - Router 
     - browserHistory
     - hashHistory
   - BrowserRouter
   - HashRouter

24. BrowserRouter

   - 使用browserHistory
   - 放到最顶层  ReactDom ，把其他组件作为children

25. route

   - path的属性：如果地址匹配到了这个路径，就会显示
   - exact：只会在path 匹配 loacation.pathname 时才匹配
   - component属性：（渲染组件）
     -  接收一个组件变量，会往组件里面传入三个 props： history，location，match
     -  可以接受一个回调函数，会往回调函数传入一个参数。这个对象里面有：history，location，match，回调函数需要你返回的   jsx  结构
   - render: 接受一个回调函数，和component的第二点一样
   - children：接受一个回调函数，和render一样，不过他无论如何都会被匹配到
   - 不能嵌套元素

26. Link

   - 最后会被渲染成a标签

   - to的属性：跳转到哪里

     - 接受字符串： '/rus', 一个url地址

   - replace:boolean值

     - true：跳转视图的时候，替换掉浏览器的 history stack 里面的entry
     - false： 跳转视图的时候，往history stack 里面 push  一个新的 entry

     ​

27. 关于浏览器的history

   - push  一个新的 entry 到 history stack
   - 所有的浏览记录都存放在  history  stack  中,它就相当于一个数组
   - entry：每一个访问的页面（访问过的路径）
   - 点击一下a链接，就是往历史堆中存放一个地址

28. 传入的三个属性

   - history是稳定的           this.props.history.location 是可变的，不稳定的
   - this.props.location
     - history 的location 是可变的，是实时的，是不稳定的，如果你想要location，直接拿此loaction
   - match

29. NavLink  组件

   - activeStyle = {style}
   - activeClassName
   - exact
   - 其他的和Link一样

30. Redirect   组件

   -  重定项    例如：页面不存在时，跳转到一个404页面
   -  to 的属性，如果他被渲染的时候，会重定向到其他的地方

31. Switch   组件

   - 一旦匹配到一个，不再继续往下匹配

32. withRouter    

   - 一个高阶组件，接收一个组件作为参数(App)，导出一个组件(Acc)，这个时候App的组件props  就有了history，location，match 属性

33. react  组件声明的两种方式

   - 使用类声明，可以有内部状态，有生命周期

   - 使用函数声明，没有内部状态，没有生命周期，只做渲染，只渲染上面传下来的props

   - 技巧：只要不用到this.state,    就可以使用函数声明，直接从props中取

     ​

   ​

   ​