### 环境配置
1. 安装脚手架cli
    - npm i -g vue-cli
2. 创建一个基于webpack的新项目
    - vue init webpack smartisan
3. 安装依赖   npm init
4. 安装 vuex  npm i vuex -save

### 项目结构
1. assets 文件夹：样式文件和图片
2. com：组件
3. lib：模拟好的数据
4. router: 路由的配置文件
5. store: vuex 的相关文件
6. views: 所有的单页面
7. getDate: method.js => 获取数据的方法和URL地址配置
8. components: 公共的组件

### 商品列表页
1. shopList： 商品数据渲染
2. shopItem：加入购物车那小块商品抽离出来
3. shopCar： 小购物车的添加
    - 当点击添加到购物车时，向后端请求数据后，通过vuex，进行数据状态管理


