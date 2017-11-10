1. ### redux的工作原理

   - 首先得到一个 store
   - 如果想拿 state，使用 store.getState()
   - 如果想改变 数据，发起一个action  store.disPatch(action)
   - 发起 action  之后，reducer  会计算 出应用的下一个状态

2. store

   - 维护应用的状态

   - **整个应用只有一个唯一 store

   - gdtState 接口，得到整个应用状态

   - disPatch， 发布 action

   - Subscribe ，监听 action  的发起

     ​		action  发起 后，执行回调函数

3. action

   - 是一个对象，必须有一个 type 属性，相当于action的名字
   - 如果你要改变数据（改变应用的状态），你应该发起一个应用状态

4. state

   - 整个应用的状态


   - 通过 store.getState()   拿到
   - **整个应用只有一个唯一 state

5. reducer
   - 一个函数，返回整个应用的  state

   - 说明reducer，返回决定了  state  是什么样子的

   - 接收两个参数： state  和action

     ​	根据这两个参数，计算出应用的下个   state

6. createStore
   -  用来创建store

7. middleware 中间件

8. Redux-thunk

   - 激活了这个中间件， dispatch 可以接受更多的数据类型了

9. action creators

   - 它就是返回 action 的一个函数，返回一个
   - 但是如果中间件参与，它可以返回其他数据类型，

   ​