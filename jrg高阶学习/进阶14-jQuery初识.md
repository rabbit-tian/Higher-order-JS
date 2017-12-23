### 题目1： jQuery 能做什么？
1. jQuery是一个快速，小巧，功能丰富的JavaScript库。它使诸如HTML文档遍历和操纵，事件处理，动画和Ajax等事情变得简单得多。jQuery也提供了给开发人员在其上创建插件的能力，这使开发人员可以对底层交互与动画、高级效果和高级主题化的组件进行抽象化。模块化的方式使jQuery函数库能够创建功能强大的动态网页以及网络应用程序
2. 选择网页元素
3. 改变结果集
4. 元素的操作：取值和赋值
5. 元素的操作：移动
6. 元素的操作：复制、删除和创建
7. 工具方法
8. 事件操作
9. 特殊效果
10. AJAX

### 题目2：jQuery 对象和 DOM 原生对象有什么区别？如何转化？
1.  jQuery就是JS的一个扩展库，工具库，提供很多方便快捷的方法，所以将JS对象转换为jQuery对象后，能更方便地操作这个对象。但是jQuery对象也不是万能的，有一些JS对象有的能，jQuery对象并没有提供，所以需要转换回JS对象，才能进行操作。另外一种情况可能是，你使用某些第三方库，接口函数只能接受JS对象或者jQuery对象，那么你就需要在这两者之间进行转换。
2. JQ对象和原生对象的相互转换
    - 原生对象转jQ对象,`$(原生DOM对象)`的方式可以将原生DOM对象转为jQuery对象，其实$是一个方法，原生的DOM对象传入$方法中，该方法内部对原生 DOM 对象做进一步的加工， 使其成为一个包装集，即伪数组对象。
    
        ```javascript
        let box = document.querySelector('#box')
        let $box = $(box)
        ```
    - jQ对象转原生对象,如果用选择器只获取到了一个元素，那么用$divs[0]获取的就是该元素的原生DOM对象，这就是jQuery对象转为原生DOM对象
        
        ```javascript
        let $box = $('#box')
        let box = $box[0]
        // let box = $box.get(0)
        ```

### 题目3：jQuery中如何绑定事件？bind、unbind、delegate、live、on、off都有什么作用？推荐使用哪种？使用on绑定事件使用事件代理的写法？

1. 在1.7之前的版本中jQuery处理事件有多个方法，后来统一的使用on/off方法
2. .bind(type,[data],fn)方法 和 .unbind(type,[data|fn])
    - 为每个匹配元素的特定事件绑定事件处理函数
    - bind()的反向操作，从每一个匹配的元素中删除绑定的事件。        
    - 举例
    
        ```javascript
        // 绑定事件
        $('box').bind('click',{name:'tian'},function (e) {
            console.log(e.data.name)
        })
        // 解绑事件
        $('#box').unbind('click')
        ```
3. .delegate(selector,[type],[data],fn)
    - 指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数，类似于 事件代理。
    - 举例
    
        ```javascript
        <div id="box">
            <p>这是一个段落。</p>
            <button>请点击这里</button>
        </div>
        
        $('#div').delegate('button','click',function () {
            $('p').slideToggle()
        })
        ```
4. .live(type, [data], fn)
    - jQuery 给所有匹配的元素附加一个事件处理函数，即使这个元素是以后再添加进来的也有效。
5. on和off ***推荐使用方法***
    - on:在选择元素上绑定一个或多个事件的事件处理函数
    - off:在选择元素上移除一个或多个事件的事件处理函数

6. 使用on绑定事件使用事件代理的写法

    ```javascript
    <ul class="box">
        <li>11</li>
        <li>22</li>
        <li>33</li>
        <li>44</li>
    </ul>
    
    $('.box').on('click','li',function () {
        console.log($(this).html()
    })   
    ```    

### 题目4：jQuery 如何展示/隐藏元素？
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

### 题目5：jQuery 动画如何使用？
1. jQuery 动画演示
    
    ```javascript
    <div class="box"></div>
    <button id="btn">多个动画</button>
    
    $('.box').css({
        width: 100px;
        height: 100px;
        background-color: yellowGreen;
        position: relative;
        left: 0;
        top: 0;
    })

    $('#btn').on('click',function () {
        
        let actions = [
            {width: 150,height: 150},
            {left: 200},
            {top: 200},
            {left: 0},
            {top: 0},
            {width: 100,height: 100}
        ]
        actions.forEach((el,index) => {
            $('.box').animate(el)
        })
        
    })
    
    ```

### 题目6：如何设置和获取元素内部 HTML 内容？如何设置和获取元素内部文本？
1. 设置和获取元素内部 HTML 内容 
    - 获取：`$('div').html()`
    
    - 设置：`$('div').html('hello')`
2. 设置和获取元素内部文本
    - 获取：`$('div').text()`

    - 设置：`$('div').text('hello')`

### 题目7：如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？
1. 设置和获取表单用户输入或者选择的内容
    - 获取:$('.inp').val()
    - 设置:$('.inp').val('hello')

2. 设置和获取元素属性
    - 获取:$('.box').attr()
    - 设置:$('.box').attr('world')

### 题目8： 使用 jQuery实现如下效果

- 效果显示 [鼠标移入移出效果](http://js.jirengu.com/cewan/4/edit)

### 题目9：使用 jQuery 实现如下效果
- 效果显示 [效果展示](http://js.jirengu.com/nimex/4/edit?html,output)

### 题目10：实现如下效果 
- 效果显示 [效果展示](http://js.jirengu.com/goqel/4/edit)
 

### 题目11： 模仿视频6，完成 左右切换的 Tab 效果

- 效果显示 [左右切换](http://js.jirengu.com/jitok/7/edit)

