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
3. shopCar： 
    - 小购物车的添加:当点击添加到购物车时，向后端请求数据后，通过vuex，进行数据状态管理
    - 小购物车的删除 removeCount
        - 了解自己的需求：点击smallCar里面的 删除按钮，添加点击事件
        - 拿到后端接口：GET /remove_count
            - 作用： 删除已经加入购物车的商品
            - 请求的数据：skuId：要删除的商品的id
        - 开始在具体的组件上操作 
        - method上添加一个请求方法   /remove_count
        - 组件中准备请求方法的按钮（绑定事件处理）
        - 在触发事件中找到要传给后端需要的值（id）
        - 测试接口是否成功
        - 将请求放在vuex的actions中进行统一管理
    - 小购物车的总件数和总价格计算
        - 在 vuex 中的，要用 getters 对state里面的数据做进一步的处理
        - 在getters中计算总价格和总件数
        - 然后小购物车组件smallCar 利用 this.$store.getters 来获取计算好的值进行渲染
        
4. 到大购物车页面  shopCar
    - 利用路由进行页面跳转
        
        ```javascript
        <!-- 跳转到大购物车页面 -->
        <router-link
            class="nav-cart-btn"
            :to="{ name: 'Car' }"
         >去购物车</router-link>
        ```
    - 将结构main放在 car.vue 组件中
    - 为了结构清晰，将每一块商品的信息结构那块单独放在一个组件 carItem中
    - 父组件car.vue通过 computed 拿到路由中的数据，然后动态绑定后传给子组件carItem使用
        
        ```javascript
        computed: {
            carShops() {
            // console.log(this.$store.state.carShops)
            return this.$store.state.carShops
            }
        }
    
        <!-- 将数据内容绑定穿给子组件carItem -->
        <car-item
            :key="item.id"
            v-for="item in carShops"
            :carItem="item"
        ></car-item>
        ```
    - 子组件通过 props 拿到 父组件的数据 carItem，然后进行数据渲染
    
        ```javascript
            props: {
                carItem: {
                    type: Object
                }
            }
        ```
        
        
        
    
                



