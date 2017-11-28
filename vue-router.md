### router
1. 原理
    - 使用 Vue.js，使用组合组件来组成应用程序
    - 把 vue-router 添加进来，将组件(components)映射到路由(routes)
    - 然后告诉 vue-router 在哪里渲染它们

2. vue-router 两种模式  mode
    - 默认值: "hash" 
    - 可选值: "history
    
3. vue-router 两个标签
    - `<router-view/>`  ：路由出口，在配置的配置项中，让路径对应的组件渲染在指定的标签位置,
    - `<router-link exact tag="p" to="/shop"></router-link>`
        - 默认会被渲染成一个 `<a>` 标签 -->
        - 通过传入 `to` 属性指定链接
        - 通过`tag` 改变标签为 p 标签
        - exact：精确匹配，排除不必要的
4. 完整版的 Vue 以解析模板
    - 在项目中新建一个router文件，在 index.js 中配置 路由 信息
    - 具体的路由配置
        
        ```javascript
export default new Router({
        mode: 'history', // vue-router模式 ： 默认hash模式
        routes: [ // 配置路由信息
            {
              path: '/', // 匹配根路径，刷新默认显示home页面
              component: Home
            },
            {
              path: '/about',
              component: About
            },
            {
              path: '/shop',
              component: Shop
            }
          ]
})
```
    - 切换页面和渲染页面
        
        ```javascript
<template>
      <div id="app">
        <div>
            <!-- 根据 router-link  -->
            <router-link tag="p" to="/">home</router-link>
            <router-link to="/about">about</router-link>
            <router-link to="/shop">shop</router-link>
        </div>
        <!-- 在配置的配置项中，让路径对应的组件渲染在指定的标签位置 -->
        <router-view/>
      </div>
</template>
        ```
    
1.  动态重定向目标
    - redirect 返回出一个具体的路径或是对象
    
        ```javascript
{// 先根据 * 匹配到不是以上三个的 路径 
 //然后redirect一个函数，动态的判断具体的访问路径，return 出指定的路由
            path: '*',
            redirect: function (to){
                // console.log(to)
                if(to.path === '/abc'){
                    return '/home'
                }else if(to.path === '/tian'){
                    return {
                        name: 'About' // return 出两种形式：对象和字符串
                    }
                }else{
                    return 'shop'
                }
            }
    }
        ```

2. 子路由
    - 路由嵌套
    
        ```javascript
    {
        path: '/shop',
        component: Shop,
        // 
        children: [
              {
                  // path: '', //   默认在apple页面 不填写
                  path: 'apple',
                  component: Apple,
                  name: 'Apple'
              },
              {
                  path: '/shop/pig',
                  component: Pig,
                  name: 'Pig'
              },
              {
                  path: '/shop/cat',
                  component: Cat,
                  name: 'Cat'
              },
              {
                  path: '*',
                  redirect: 'apple' // 默认跳转到apple页面
              }
         ]
    }
        ```
    - 视图嵌套
        
        ```javascript
        <li>
            <router-link to="/shop">shop</router-link>
            <ul>
                <li>
                    <router-link :to="{path:'/shop/apple'}">apple</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'Pig'}">pig</router-link>
                </li>
                <li>
                    <router-link to="/shop/cat">cat</router-link>
                </li>
            </ul>
        </li>
        ```

3. 动态路由匹配
    - 配置路由信息
        
        ```javascript
      {
          path: '/user/:id?',  // :就是动态路径 id就类似是变量一样，存访问路径的值 /user/123
          name: 'User',
          component: User
    }
        ```
    - 当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。
    
        ```javascript
    watch: {
      // 监控路由信息对象，为什么要监控？
      // 因为当在组件内修改path，组件不会重新渲染，目的是达到复用的效果
      // 在切换path实际上path已经变了，需要重新拿数据渲染页面
      // 监控一下$route的变化，再去拿数据
    '$route':function(){
            let id = this.$route.params.id;
            this.u = users.filter(item => item.id == id)[0]
      }
    },
    mounted () {
      console.log('挂在完成')
      // 动态路径的参数
        let id = this.$route.params.id;
        this.u = users.filter(item => item.id == id)[0]
    }
        ```

