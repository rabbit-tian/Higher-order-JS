1. ##### 运行一个项目的步骤打包

   - npm i -y    初始化一个package.json 的文件（里面有安装的开发依赖和生产依赖    scripts:  dev 打包运行webpack）
   - 安装依赖
     - npm i -D  < package包名 >  // 声明为开发依赖
     - npm i -S < package 包名>    //声明为生产依赖
   - 新建一个webpack.config.js 文件
   - 配置入口和出口  ，npm run dev 运行 生成一个指定的如bbs.js的文件
   - 根据报错，添加 loader 配置
   - 配置 babel-loader 和 .babelrc
   - 在 package.json 里面配置好命令 : dev : "webpack" , 使用 npm run dev 运行

2. ##### 关于 .babelrc   是babel的配置文件，存放在根目录下

   - 干什么的：该文件用来设置转码规则和插件，babel API 的配置选项, 就是告诉 babel, 怎么运行

   - 啥时候用：使用 babel 编译文件的时候, 就会去查看. babelrc, 根据. babelrc 的配置来做相应的操作

   - 怎么配置：模块中使用 use: [ 'babel-loader' ],时，需要一些插件

     ```javascript
     {
         "presets": ["react", "env"], // 规则
         "plugins": ["transform-object-rest-spread"] // 插件
     }
     ```

3. ##### 关于 babel

   - 干什么的：把代码编译成 ES5代码的工具，把能转成es5的代码转成es5的代码
   - 如何在 cli 使用：就是在命令行中使用 babel 命令
   - 如何在 webpack 使用：使用 babel-loader
   - 基于插件运行，预设是插件的集合

4. ##### webpack

   - 文件依赖管理（文件之间的依赖关系）
   - 资源加载管理（）
   - 资源与优化管理
   - 模块打包器
   - loader：
     - 资源转换器，让对应的类型文件转换成webpack可以理解的程序，因为webpack只能理解javascript
   - 入口：项目的入口模块
   - 输出：webpack 的打包结果
   - 在什么情况下会让 loader 起作用：当某一个 rule 被匹配到之后
   - 如何在 webpack 使用 babel-loader：看配置

5. ##### npm

   - 管理项目的依赖，它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布
   - 关于package.json的文件：npm init 一直回车生成；npm i 安装项目依赖的时候，想查看项目的时候被使用
   - 在npm中声明命令的好处：很方便描述出和本项目相关的一些命令操作
   - 如何安装依赖 (声明为生产还是开发)
     - npm i/install -S/--save package 生产依赖
     - npm i -D/--save-dev package 开发依赖

6. ES6的导出与引入

   ```javascript
   var a = 11;
   var test = () =>{
       console.log(12);
   }
   class Hello{
       say(){
           console.log(13);
       }
   }

   // Module 模块化

      1、引入：import tian from './component/myName'

      1、导出：export default {a,test,Hello}

      2、引入：import * as shen from './component/myName'

      2、导出：export {a,test,Hello}

      3、引入：import {a,test,Hello} from './component/myName'

      3、导出：export {a,test,Hello}


      // 举例

      import 'f.js'

      让这个模块运行, 但不需要接收它暴露的接口

      import a from './ds.js'

      让a 的变量接收ds.js的默认导出

      import a,{b,c} from './ds.js'

      让a 的变量接收ds.js的默认导出

      接收它的标准导出 b, c

      import a,{b as ccd,c} from './ds.js'

      让a 的变量接收ds.js的默认导出

      接收它的标准导出 b, c, 并且把 b 重命名成 ccd

      //commonJS

      require('./a.js')

      //module.exports和exports

      module.exports

      模块接收的是 module.exports 的导出

      exports

      exports 初始默认指向 module.exports

      如果这个指向被重新赋值, 就会断掉和module.exports的联系

      不能直接给 exports 赋值

   ```




7. webpack打包css
   - 把css打包到 js 文件里    — 开发阶段
     - 把css变成字符串放在   创建的style标签，插入到head里面
   - 把css打包成一个单独的css文件，通过link引入(自动创建)  — 生产阶段