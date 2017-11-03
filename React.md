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


   2. 开发依赖


   npm i -D webpack               --webpack的cli(命令行界面)环境

   npm i -D babel-core            --代码需要调用Babel的API进行转码

   npm i -D babel-loader          --转化匹配的(ES6代码或图片等)内容

   npm i -D babel-preset-react    -- react预设(插件的集合)

   npm i -D clean-webpack-plugin   --自动清理dist里的文件
    
   npm i -D html-webpack-plugin    -- 自动生成html文件

   npm i -D css-loader             -- 开发阶段的打包css的 插件


   ```

6. ##### webpack.config.js 文件的配置

   ```javascript
   const path = require('path'); // 路径模块

   const HtmlWebpackPlugin = require('html-webpack-plugin');   // 自动生成html
   const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次打包前，自动清理dist里面文件

   const rv = (...a) => path.resolve(__dirname,...a);  // 封装函数rv，得到dist文件夹的绝对路径

   // 预处理模块之间的内容
   module.exports = {
       entry: './src/app.js',  // 入口文件，该文件依赖于其他模块
       output: {               // 输出一个打包好的文件放在dist文件中，起名为app.js
           path: rv('dist'), // 绝对路径
           filename: 'app.js'  // 存放打包内容的文件名字
       },

       module:{
           rules:[ // 规则
               {
                   test: /\.js$/, // 匹配引入的模块是不是以 .js结尾的模块
                   use: ["babel-loader"], // 把代码编译成es5代码（h还有其他很多转译功能）  ，要想转es代码，要用.babelrc里的预设 （presets）react预设处理es5代码
                   exclude: [   // 排除 node_modules文件夹
                       rv("node_modules")
                   ]
               },
               { // 匹配 css
                   test: /\.css$/,
                   // css-loader先变成字符串，再style-loader处理，新建style标签，插入到head里面
                   use: ["style-loader","css-loader"]
               },
               { // 匹配 图片
                   test: /\.(jpg|png|jpeg|gif)$/,
                   use: ["file-loader"]
               }
           ]
       },
     
       // 插件：
       plugins:[
           new HtmlWebpackPlugin({  // webpack的插件，自动创建html文件
               filename:'index.html', // 创建好的文件的名字
               template:'./src/index.html'  // 以这个文件文件为模板
           }),
           new CleanWebpackPlugin(['dist']) // webpack的插件，每次打包前，先把dist文件内容删除
       ]
   }

   ```

   ​

