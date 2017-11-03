1. ##### React：用一个对象去描述DOM结构，然后去创建对应的DOM元素，把dom元素插到容器中去

   - React.Component 是一个抽象的Class，通常继承该类来构建自定义的Component。 Component可以将U分离成独立的碎片，有点类似于JavaScript的function，它接受一个任意的输入（props）并返回一个React element描述屏幕中的内容。

2. ##### React的原理

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
9. ***  props : react的属性
   - 传递属性：< Content  a="8">< /Content >
   - 拿到： let {a} = this.props
10. *************   state
   - 组件有内部状态  this.state = {}
   - 通过 this.setState(),来改变组件的内部状态，这个时候页面会更新，因为组件的 render执行了，得到了一份新的jsx的结构
   - 父组件的 render 执行了，子组件的 render 也会执行
   - 页面状态应该根据  this.setState()   更新