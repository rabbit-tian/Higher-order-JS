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
    
5.  动态重定向目标
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

6. 子路由
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

7. 动态路由匹配
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

8. 动态路径
    - 每次访问不同的路径时，都会渲染不同的组件，但是使用动态路径时，所有的路径都使用同一个组件，路径虽然变化了，但是组件不会渲染了
    - 解决方案：可以通过监控路由信息对象
        
        ```javascript
        watch: {
            '$route':function (){
                console.log(this.$route)
            } 
        }
        ```
        
9. 生命周期函数
    - 每个阶段提供不同的函数，内部会自动调用函数
    - mounted 在组件挂载完成后，触发函数，组件就已经渲染在页面中，但是只会渲染一次
    - 此时，路径虽然变化了，单视图不会变化。可以通过watch监控路劲变化，重新渲染页面
    

10. 编程式导航
    - push：追加到历史记录里
        `this.$router.push(''||{})`
    - replace：替换 当前访问记录，历史记录中不会出现
        `this.$router.replace(''||{})`
    - go: 前进后退几步
        `this.$router.go(-3)`
    - $router: 实例
    - $route: 路由信息对象
    
11. 导航守卫
    -  全局守卫
        - 你可以使用 router.beforeEach 注册一个全局前置守卫
                        
            ```javascript
            router.beforeEach((to,from,next) => {
                console.log('此处拦截')
                next() // 如果想要继续走，必须调用next
            })
            ```
        - 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中
        - 每个守卫方法接收三个参数
            - to: Route: 即将要进入的目标 路由对象
            - from: Route: 当前导航正要离开的路由
            - next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
                - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
                - next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
                - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
                - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
    - 全局解析守卫
        - 用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
    - 全局后置钩子
        - 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
            
            ```javascript
            router.afterEach((to,from) => {
                console.log('已经渲染完成')
            })
            ```
    - 路由独享的守卫
        - 可以在路由配置上直接定义 beforeEnter 守卫
            
            ```javascript
            beforeEnter(to,from,next) {
                console.log('在home这个路由配置项中')
                next()
            }
            ```
    - 组件内的守卫
        - beforeRouteEnter
        - beforeRouteUpdate 
        - beforeRouteLeave
            
            ```javascript
            const Foo = {
              template: `...`,
              beforeRouteEnter (to, from, next) {
                // 在渲染该组件的对应路由被 confirm 前调用
                // 不！能！获取组件实例 `this`
                // 因为当守卫执行前，组件实例还没被创建
              },
              beforeRouteUpdate (to, from, next) {
                // 在当前路由改变，但是该组件被复用时调用
                // 可以访问组件实例 `this`
              },
              beforeRouteLeave (to, from, next) {
                // 导航离开该组件的对应路由时调用
                // 可以访问组件实例 `this`
              }
            }
            ```
        - beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
        - 不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
            
            ```javascript
            beforeRouteEnter (to, from, next) {
              next(vm => {
                // 通过 `vm` 访问组件实例
              })
            }
            ```
        - 你可以 在 beforeRouteLeave 中直接访问 this。这个离开守卫通常用来禁止用户在还未保存修改前突然离开。可以通过 next(false) 来取消导航。

12. 


