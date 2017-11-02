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

4. ##### jsx的语法

   - 遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{`开头），就用 JavaScript 规则解析

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


