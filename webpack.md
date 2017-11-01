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

   - 该文件用来设置转码规则和插件

   - 模块中使用 use: [ 'babel-loader' ],时，需要一些插件

     ```javascript
     {
         "presets": ["react", "env"], // 规则
         "plugins": ["transform-object-rest-spread"] // 插件
     }
     ```

3. ##### 关于 babel

   把能转成es5的代码转成es5的代码

4. ##### webpack

   - 文件依赖管理（文件之间的依赖关系）
   - 资源加载管理（）
   - 资源与优化管理
   - 模块打包器
   - loader：
     - 资源转换器，让对应的类型文件转换成webpack可以理解的程序，因为webpack只能理解javascript

5. ##### npm

   - 它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布
   - 便利，高效