1. 什么是jQuery

   - jQuery是一个快速的、小的、功能丰富的JavaScript库。它使HTML文档遍历和操作、事件处理、动画和Ajax等操作更加简单，易于使用的API在许多浏览器中起作用。

2. 选择器

   - id选择器   $('#box')
   - class选择器   $('.box')
     - $('li[class^="li1"]')   以li1开头
     - $('li[class$="li1"]')   以li1结果
   - 属性选择器 ： $('input[type="button"]')
   - 过滤选择器 ： $('input[type!="button"]')
   - 伪类选择器
     - $("span:nth-of-type(2)") : 选择同属于一个父元素之下，并且标签名相同的子元素中的第n个
     - :odd 奇数： $('li:odd')
     - :even  偶数：$('li:even')
     - :eq(index) 匹配一个给定索引值的元素： $('li:eq(2)')
     - :gt(index) 匹配索引值大于index的元素(不包含index) ：$('li:gt(2)')
     - :lt(index) 匹配索引值小于index的元素(不包含index) ：$('li:lt(2)')

3. 属性操作

   - css样式：style.css/cssText    ->  css()

     ```javascript
       /*
         css:
           一个参数
             (1)字符串是获取
             (2)对象（批量设置）

           两个参数是设置
       */

     $('#box').css({
       width: 100,
       height: 100,
       background: 'red'
     })

     $('#box').css('background','red')
     ```

   - innerHTML   ->  html()

   - innerText   ->  text()

   - value  ->  val()

   - attr 属性 -> getAttribute + setAttribute

   - removeAttr 删除行间属性

4. jQ获取 ajax 数据

   ```javascript
   $(document).click(()=>{
           $.ajax({
               							url:'https://api.douban.com/v2/movie/search',
             data:{
               start:0,
               q:'雷神'
             },
             dataType:'jsonp',
             success:function(data){
               console.log(data);
             }
           })
   })
   ```

   ​

5. checked

   ```javascript
   注： 如果你要使用jq的方法，那么必须保证，前面那个对象是JQ对象
   	JQ对象转原生对象使用下标即可，原生对象转JQ对象用$()包一下即可
       
    let arr = [];
    $('input[type=button]').click(() => {
         for (var i = 0; i < $('input:checked').length; i++) {
            arr.push($('input:checked').next().html())
         }

         console.log(arr) // 获取到input被选中状态时 下个标签的内容集合
    })  

   let input = document.getElementsByTagName('input')[1];
   console.log($(input).next().html()) // '001'
   ```

   ​

6. 事件

   ##### 注： prop： 专门用来操作表单元素属性的（比如:checked），因为直接使用attr('checked')为undefined

   - 点击事件

     ```javascript
       <input type="button" value="按钮">
       <input type="checkbox">
       <input type="checkbox">
       <input type="checkbox">
       <input type="checkbox">
         
     $('input[type=button]').click(()=>{
         let inps = $('input[type=checkbox]');

         for(var i=0;i<inps.length;i++){
             if(inps.eq(i).prop('checked')){
                 inps.eq(i).prop('checked',false)
             }else{
                 inps.eq(i).prop('checked',true)
             }
         }

     })    
         
     ```

     ​

7. 循环：JQ.each(): 

   注：JQ的循环,里面有个回调函数，function (i,e){}  ,i->index  e->element

   ```javascript
     <ul>
       <li>1</li>
       <li>2</li>
       <li>3</li>
       <li>4</li>
     </ul>

   $('li').each((i,e) =>{
       $(e).click(function (){
           // $(this).css({
           //     background: 'red'
           // })

           $('li').eq(i).css({
               background: 'red'
           })
       })
     })
   ```

   ​

8. DOM

   - 文档对象模型:根据document提供的API，赋予开发者操作页面的能力。

   - 第一个元素  first()

     ```javascript
     $('li').first().css('background','red')
     ```

   - 最后一个元素  last()

     ```javascript
     $('li').last().css('background','red')
     ```

   - 兄弟元素 next    prev  siblings

     ```javascript
     $('li').eq(0).next().css('background','red')
     $('li').last().prev().css('background','green')
     $('li').eq(0).siblings().css('background','yellow') // 除了自己的其他所有
     ```

   - 父级   parent() -> parentNode

   - 孩子   children()  -> chilren;

   - hide:隐藏  -> display:none

   - show:显示  -> display:block

   - 增、删、改、查

     ```javascript
     /*
             创建元素：
                 $('标签')

             插入元素：
                 append()  最后添加

                 插入什么东西.insertBefore.要插入到哪个前面

                 父级.prepend(插入的元素) -> 结果添加到第一个上

             删除：
                 $(xx).remove();
         */
     $('#txt').keyup(function (ev){
             if(ev.keyCode == 13){
                 let $li = $(`<li>${$('#txt').val()}</li>`)

                 $('ul').prepend($li);
                 $('#txt').val('')
             }
         })

         $('ul').on('click','li',function (){
             $(this).remove()
         })

     ```

     ​

9. 找到当前元素所在的位置（在父级同级兄弟元素中的位置）,JQ.index(可以选填范围)

   ```Javascript
   // 选项卡

       <style>
           .active{
               background: yellow;
           }
           div{
               width: 100px;
               height: 100px;
               border: 1px solid #000;
               display: none;
           }
           div.show{
               display: block;
           }
       </style>

       <input type="button" value="按钮一" class="active">
       <input type="button" value="按钮二">
       <input type="button" value="按钮三">
       <div class="show">111</div>
       <div>2222</div>
       <div>3333</div>

   let $btns = $('input');
       let $divs = $('div');

       // 方法一：
       $btns.click(function (){
           $btns.removeClass('active')
           $divs.removeClass('show')
           $(this).addClass('active')

           $divs.eq($(this).index('input')).addClass('show')
       })

       // 方法二：
   $btns.click(function (){
           $(this).addClass('active').siblings('input').removeClass('active');
           $divs.eq($(this).index('input').addClass('show').siblings('div').removeClass('show'))
       })

       // 方法三：

   $btns.each((i,e)=>{$(e).click(function (){
               	$(this).addClass('active').siblings('input').removeClass('active')
               	$divs.eq(i).addClass('show').siblings('div').removeClass('show');
           })
   })

   ```

   ​

10. closest():

  - closest会首先检查当前元素是否匹配，如果匹配则直接返回元素本身

    如果不匹配则向上查找父元素，一层一层往上，直到找到匹配选择器的元素。 如果什么都没找到则返回一个空的jQuery对象。

    ```javascript
    $('#p2').closest('.a').css('background','red');
    ```

    ​

11. find(): 

    - 获取元素的方式，会先找li再去找#ul2，那么性能会差很多

      ```javascript
      $('#ul2 li').css('background','red'); 
      ```

    - 代码缓存：先使用find把大模块缓存起来，然后从这个代码块下去获取，节省性能

      ```javascript
      let $ul2 = $('#ul2');
      $ul2.find('p').css('background','red')
      ```

      ​

12. sizzle

    - sizzle 是选择器，JQ中 集成了它，（JQ中总结了它）

13. JQ 架构

    - 无new化操作：因为打算在使用jQuery的时候不在外面new，我们使用了在jQuery函数内部new，但是出现了一个问题，递归！
    - 问题：如何才能做到既能够在内部new，又不递归？，如何才能做到在内部new还能使用jQuery实例化对象的方法？
    - 回答：只要不new jQuery本身就不会递归,那么找一个炮灰来new,只要让炮灰拥有jQuery的属性或者方法，是不是new 炮灰就等同于new jQuery

14. 函数覆盖问题

    ```javascript
    alert(c);  // 函数
    function c(){

    };
    window.c = 10;
    var c = 20;
    alert(c)  // 20 ,不会是函数
    ```

15. undefined 问题

    - 在低版本浏览器中undefined是可以为变量的，如果需要使用到undefined，并且undefined之前已经被赋值了，那么undefined无效。

16. 宽高

    ```javascript
    1. $('#box').width()
       $('#box').height()

    2. $('#box').innerWidth()   包含padding   不包含border
    	$('#box').innerHeight()

    3. $('#box').outerWidth()   包含padding   包含border
    	$('#box').outerHeight(200，true)  
    	outerWidth可以支持margin 在第二个参数上加true
    ```

17. 距离

    ```javascript
    1. 滚动的距离
    $(document).scrollTop() 
    $(document).scrollLeft() 

    2. 绝对位置，相对于 window 定位
    	$('#box').offset().top
    	$('#box').offset().left
    3. 相对于定位父级的距离
    	$('#box').position().top
    	$('#box').position().left
    ```

18. 事件

    - jQ中的事件都是事件绑定，所有的事件都是基于on()

    ```javascript
    <div id="div1"></div>
    <div id="div2"></div>

    $('#div1').on('click',function (){
        console.log('1111');

        $('#div2').off().on('click',function (){
            console.log('2222');
        })
    })

    问题：当div1绑定的时候，点一次就绑定一次div2的事件，点几次div1，就绑定几次div2，所以触发div2的时候会触发若干次。

    解决：off() 解除绑定,在哪个元素上解除就在那个元素后添加。
    ```

19. 事件-data数据

    ```javascript
    <div id="div1"></div>
    <div id="div2"></div>

    let data ={
        id: 1,
        content: 'tian'
    }

    // click.dat  起名字 ，好触发
    $('#div1').on('click.dat',data,function (){
        console.log(data) //data
    })

    // click.num  起名字 ，好触发
    $('#div1').on('click.num',function (){
        console.log(12345) //data
    })

    //trigger  ： 触发器
    $('#div2').on('click',function (ev){
        $('#div1').trigger('click.num')
    })

    ```

20. 选项卡

    ```javascript
    <style>
      .active{
        background-color: yellowGreen;
      }
    div{
      width: 200px;
      height: 200px;
      border: 1px solid;
    }
    </style>

    <input type="button" value="标题一" class="active">
    <input type="button" value="标题二">
    <input type="button" value="标题三">
    <div>111111</div>

    let $btns = $('input');
    let $div = $('div');

    $btns.on('click',{data: [11111,22222,33333]},function (ev){
      $btns.removeClass('active')
      $(this).addClass('active')
      // console.log(ev.data)
      $div.text(ev.data.data[$(this).index('input')])
    })
    ```

    ​

21. 事件委托

    ```javascript
    <input type="text">
    <input type="button" value="按钮">
    <ul></ul>

    $('input[type="button"]').on('click',function (){
        $('ul').prepend($('<li>'+$('input[type="text"]').val()+'</li>'))
        $('input[type="text"]').val('');
    })

    // 事件委托
    $('ul').on('click','li',function (){
        console.log(111)
    })
    ```

22. 阻止冒泡和默认事件

    ```javascript
    <style>
      #div1{
    width:200px;
    height: 200px;
    background: red;
    }
    #div2{
    width:50px;
    height: 50px;
    background:green;
    }
      </style>

    <div id="div1">
        <div id="div2"></div>
    </div>

    $('#div1').on('click',function (){
        console.log(1111111)
    })

    $('#div2').on('click',function (ev){
        console.log(22222222)
        ev.stopPropagation(); // 阻止冒泡
    })

    $(document).on('keydown',function (ev){
        if(ev.keyCode == 32){
            // return false;  // 既可以阻止冒泡，也可以阻止默认事件
            ev.preventDefault(); //阻止默认事件
        }
    })
    ```

23. jQ的拖拽

    ```javascript
     #div1{
         width:150px;
         height: 150px;
         background:salmon;
         position: absolute;
         top:0;
         left:0;
     }
     
     <div id="div1"></div>

    $('#div1').mousedown(function(ev){
      // console.log(ev);
      let disX = ev.clientX - $(this).offset().left;
      let disY = ev.clientY - $(this).offset().top;

      $(document).mousemove(function(ev){
        $('#div1').css({
          left : ev.clientX - disX,
          top : ev.clientY - disY
        });
      });

      $(document).mouseup(function(){
        $(document).off();
      });
      return false;
    });
    ```

24. 运动

    ```javascript
    1. 隐藏div1
    	$('#div1').hide();
    2. 将隐藏的 div1 向下慢慢显示
    	$('#div1').slideDown();
    3. 将div1显示隐藏， 可以加速度
    	$('#div1').toggle(300)
    4. 改变 div1 的高度
    	$('#div1').slideToggle(800);
    5. 透明度
    	$('#div1').fadeToggle(800);
    6. delay 延迟 运动
    	$('#div1').animate({
            width: 800
        },500).delay(1000).animate({
            height:600
        })
    ```

25. 运动问题

    - 队列： JQ中的运动都是按照队列来排列的
    - 小技巧：如果会多次触发运动，那么在运动前加stop(true,true)，2个true的时候，立即完成上次一次任务，然后开始本次任务
    - $('#div1').stop(true,true).toggle(300)

    ​

