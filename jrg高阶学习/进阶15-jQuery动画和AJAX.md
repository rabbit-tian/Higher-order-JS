### 题目1： jQuery 中， $(document).ready()是什么意思？
1. 当DOM准备就绪时，指定一个函数来执行。
2. 两种写法
    
    ```javascript
    $(document).ready(hander)
    
    $(function () {console.log(111)})
    ```

### 题目2： $node.html()和$node.text()的区别?
1. `$node.html()` ：用于获取/修改元素的innerHTML
2. `$node.text()` ：用于获取/修改元素的innerText
    
### 题目3： $.extend 的作用和用法? 
1. 作用：当我们提供两个或多个对象给$.extend()，对象的所有属性都添加到目标对象（target参数），目标对象（第一个参数）将被修改，并且将通过 `$.extend()返回`
2. 用法
    
    ```javascript
    // extend  扩展

    let obj1 = {a:1}
    let obj2 = {b:2,c:3}
    let obj3 = {b:4,d:5}
    let obj4 = {}
    
    // 将obj2扩展给obj1
    $.extend(obj1,obj2) // {a: 1, b: 2, c: 3}
    
    // 将 obj3和obj2 扩展给obj1
    $.extend(obj1,obj2,obj3) // {a: 1, b: 4, c: 3,d:5}
    
    // 如果想保留obj1的值
    $.extend(obj4,obj1,obj2,obj3) // {a: 1, b: 4, c: 3,d:5}
    
    // 如果想保留obj1的值第二种写法
    let obj5 = $.extend({},obj1,obj2,obj3)
    ```

### 题目4： jQuery 的链式调用是什么？
1. jQuery 的链式调用：在方法内部返回当前的这个实例对象this，从而又可以访问自己的原型了，这样的就节省代码量，提高代码的效率，代码看起来更优雅。但是这种方法有一个问题是：所有对象的方法返回的都是对象本身，也就是说没有返回值，所以这种方法不一定在任何环境下都适合 
2. 代码展示

    ```javascript
    // 链式调用
    $('.btn').on('click',function () {
        $('.box').animate({width: 200})
                .animate({height: 200})
    })
    ```    

### 题目5： jQuery 中 data 函数的作用
1. data：当一个事件被触发时，要传递给事件处理函数的event.data
2. 代码展示
    
    ```javascript
    $('.box').on('click', {name: 'hunger'}, function(e){
    console.log(e.data)
})
    ```

### 题目6： 写出以下功能对应的 jQuery 方法：
1. 给元素 $node 添加 class active，给元素 $noed 删除 class active
        
    ```javascript
    $node.addClass('active') // 添加
    $node.removeClass('active') // 删除
    ```
2. 展示元素$node, 隐藏元素$node
    1. 基础
        - 显示 `.show()`
        - 隐藏 `.hide()`
        - 显示隐藏切换 `.toggle()`
    2. 渐变
        - 淡入 `.fadeIn()`
        - 淡出 `.fadeOut()`
        - 淡入淡出切换 `.fadeToggle()`
        - 调整匹配元素的透明度 `.fadeTo()`
    3. 滑动
        - 下滑显示 `.slideDown()`
        - 上滑隐藏 `.slideUp()`
        - 上下滑切换 `.slideToggle()`
    4. 自定义动画 .animate()
    
3. 获取元素$node 的 属性: id、src、title， 修改以上属性
    
    ```javascript
    $node.val()
    $node.val('inp')
    
    $node.attr('id')
    $node.attr('id','box')
    
    $node.attr('src')
    $node.attr('src','www.baidu.com')
    
    $node.attr('title')
    $node.attr('title','hello')
    ```
4. 给$node 添加自定义属性data-src
    `$node.attr('data-src','www.baidu.com')`

5. 在$ct 内部最开头添加元素$node
    `$ct.prepend($node)`
    `$node.prependTo($ct)`

6. 在$ct 内部最末尾添加元素$node
    `$ct.append($node)`
    `$node.appendTo($ct)`

7. 删除$node
    `$node.remove()`

8. 把$ct里内容清空
    - `$ct.empty()`
    - `$ct.detach()` : 保存所有jQuery数据和被移走的元素相关联

9. 在$ct 里设置 html <div class="btn"></div>
    
    ```javascript
        $('.ct').html(`<div class="btn"></div>`)
    ```

10. 获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
    - 不包括边框和padding：
        - `$node.height()`
        - `$node.width()`
    - 不包括边框,包含padding：
        - `$node.innerHeight()`
        - `$node.innerWidth()`
    - 包括 边框和padding：
        - `$node.outerHeight()`
        - `$node.outWidth()`  
    - 获取内容宽度和高度（包括padding，border，margin）
        - `$node.outerHeight(true)`
        - `$node.outWidth(true)` 
    

11. 获取窗口滚动条垂直滚动距离
    
    `.scrollTop()`

12. 获取$node 到根节点水平、垂直偏移距离
    
    `$node.offset.left`
    `$node.offset.top`
    
13. 修改$node 的样式，字体颜色设置红色，字体大小设置14px

    ```javascript
    $node.css({
        color: 'red',
        font-size: '14px'
    })
    ```

14. 遍历节点，把每个节点里面的文本内容重复一遍
    
    ```javascript
    <div class="box">
        <ul>
            <li>1</li>
            <li class="active">2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
    
    $('.box>ul>li').each(function (index,node) {
        let str = $(this).text()
        $(node).text(str+str)
    })
    ```

15. 从$ct 里查找 class 为 .item的子元素
    
    ```javascript
    $ct.find('.item')
    ```
    
16. 获取$ct 里面的所有孩子
    
    `$ct.children()`

17. 对于$node，向上找到 class 为'.ct'的父亲，在从该父亲找到'.panel'的孩子
    
    `$node.parents('.ct').find('.panel')`

18. 获取选择元素的数量
    
    ```javascript
    let $node = $('.box>ul>li')
    console.log($node.length)
    ```
    
19. 获取当前元素在兄弟中的排行
    
    `$node.index()`

### 题目7：用jQuery实现以下操作
1. 当点击$btn 时，让 $btn 的背景色变为红色再变为蓝色
    -  [点击变色](http://js.jirengu.com/cemod/5/edit)
    - 注意：背景色不能直接用动画，不支持，需要用一个 jquery 插件才行，因为背景色的变化没法渐变，不像宽高，可以从0到100

2. 当窗口滚动时，获取垂直滚动距离
    -  [点击查看](http://js.jirengu.com/dugat/2/edit)
    
3. 当鼠标放置到$div 上，把$div 背景色改为红色，移出鼠标背景色变为白色
    - [点击查看效果](http://js.jirengu.com/titum/11/edit)

4. 当鼠标激活 input 输入框时让输入框边框变为蓝色，当输入框内容改变时把输入框里的文字小写变为大写，当输入框失去焦点时去掉边框蓝色，控制台展示输入框里的文字
    - [点击查看](http://js.jirengu.com/wegay/58/edit)

5. 当选择 select 后，获取用户选择的内容
    - [点击查看](http://js.jirengu.com/suxat/8/edit)

### 题目8： 用 jQuery ajax 实现如下效果。当点击加载更多会加载数据展示到页面
### 题目9(选做)： 实现一个天气预报页面，UI 如下图所示(仅供参考，可自由发挥)。数据接口:

1. 获取天气
    - 接口：http(s)://weixin.jirengu.com/weather
    - 服务端支持 CORS 跨域调用，前端可直接使用 ajax 获取数据，返回数据以及使用方式参考 http://api.jirengu.com112
2. 更多接口
    - 参考 http://api.jirengu.com112


