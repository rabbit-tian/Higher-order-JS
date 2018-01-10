1. 相同点
    - 都是属性
2. 在jQuery中的区别
    - prop:表示JS对象的属性
    - attr:表示HTML文档节点的属性

    
    ```javascript
    <!-- 这里的id、class、data_id均是该元素文档节点的attribute -->
    <div id="message" class="test" data_id="123"></div>
    
    <script type="text/javascript">
    // 这里的name、age、url均是obj的property
    var obj = { name: "CodePlayer", age: 18, url: "http://www.365mini.com/" };
    </script>
    ```

3.  直到jQuery 1.6新增prop()函数，并用来承担property的设置或获取工作之后，attr()才只用来负责attribute的设置和获取工作。
4. jQuery认为：attribute的checked、selected、disabled就是表示该属性初始状态的值，property的checked、selected、disabled才表示该属性实时状态的值(值为true或false)。
5. 因此，在jQuery 1.6及以后版本中，请使用prop()函数来设置或获取checked、selected、disabled等属性。对于其它能够用prop()实现的操作，也尽量使用prop()函数。
    
    
    





