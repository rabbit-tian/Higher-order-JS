### 1. 字符串拼接

- 举例：

    ```javascript
    let songs = [
        {name: '刚刚好1',singer: '薛之谦1'},
        {name: '刚刚好2',singer: '薛之谦2'},
        {name: '刚刚好3',singer: '薛之谦3'},
        {name: '刚刚好4',singer: '薛之谦4'},
        {name: '刚刚好5',singer: '薛之谦5'}
    ]
    let html = '<div class="ct">'
    html += '<h1>热歌榜</h1><ul>'

    let i
    for(i = 0;i < songs.length;i++){
        html += '<li>'+ songs[i].name +' - '+ songs[i].singer +'</li>'
    }
    html += '</ul></div>'

    document.body.innerHTML = html
    ```
- 缺点：容易被恶意的注入

### 2. jQuery方式 构建 DOM 对象
- 举例：

    ```javascript
    let songs = [
        {name: '刚刚好1',singer: '薛之谦1'},
        {name: '刚刚好2',singer: '薛之谦2'},
        {name: '刚刚好3',singer: '薛之谦3'},
        {name: '刚刚好4',singer: '薛之谦4'},
        {name: '刚刚好5',singer: '薛之谦5'}
    ]
    let $div = $('<div class="ct"></div>')
    let $ul = $('<ul></ul>')

    $(songs).each((index,item) => {
        let $li = $('<li>'+ item.name +'-'+ item.singer +'</li>')
        $ul.append($li)
    })

    $div.append('<h1>热歌榜</h1>')
    $div.append($ul)
    $('body').append($div)

       
    ```
    
- 缺点：有点复杂

### 3. string formate
1. string formate - 字符串格式化
2. 和之前方法对比
    - before: `var li = '<li>' + songs[i].name + ' - ' + songs[i].singer + '</li>'`
    - string formate: `var li = stringFormat('<li>{0} - {1}</li>', songs[i].name, songs[i].singer)`
3. 代码展示

    ```javascript
        let songs = [
        {name: '刚刚好1',singer: '薛之谦1'},
        {name: '刚刚好2',singer: '薛之谦2'},
        {name: '刚刚好3',singer: '薛之谦3'},
        {name: '刚刚好4',singer: '薛之谦4'},
        {name: '刚刚好5',singer: '薛之谦5'}
    ]

    function stringFormat (string) {
        // console.log(arguments)  // ["hi,{0}", "tian", callee: ƒ, Symbol(Symbol.iterator): ƒ]
        // 拿到arguments 除了第一项的其他项
        let parmas = [].slice.call(arguments,1)
        console.log(parmas) // ["tian", "yang"]

        // 将 string 中的 {n} 替换成 parmas{n}
        let regex = /\{(\d+)\}/g // 正则匹配 {n}
        string = string.replace(regex,function () {
            console.log(arguments)
            // 拿到 n 的下标
            let index = arguments[1]
            // 根据下标找到parmas里面的项
            return parmas[index]
        })

        return string
    }


    console.log(stringFormat('hi,{0} and {1}', 'tian','yang')) // 替换结果：hi,tian and yang
    ```
4. 优点：简化代码，易懂易写
5. 缺点：只能是一对一的替换

### 4. 自制模板替换
1. 用到的知识
    - 将字符串变成JS代码：var func = new Function(...
    
    ```javascript
    let fn3 = new Function ('x','y','console.log(x);console.log(y)')
    fn3(1,2) // 1,2
    ```
    - string.replace 替换字符串
    
    ```javascript
    let string1 = 'tian1 , yang1 ,shen1,tian1'
    let regex1 = /tian1/g

    console.log(string1.replace(regex1,'xxx')) // 'xxx , yang1 ,shen1,xxx'
    ```
    
    -  while  +  regex.exec
    
    ```javascript
    // regex.exec 正则、遍历、匹配
    let string = 'tian , yang ,shen,tian'
    let regex = /tian/g

    console.log(regex.exec(string)) // ["tian", index: 0, input: "tian , yang ,shen,tian"]
    console.log(regex.exec(string)) // ["tian", index: 18, input: "tian , yang ,shen,tian"]
    console.log(regex.exec(string)) // null
    
        // while  +  regex.exec
    let string3 = 'tian3 , yang3 ,shen3,tian3'
    let regex3 = /tian/g

    let result
    // 当 result = regex3.exec(string3时，再次进入循环
    while(result = regex3.exec(string3)){
        string3 = string3.replace(result,'xxx')
    }

    console.log(string3) // xxx3 , yang3 ,shen3,xxx3

    ```
2. 思路
    - 利用正则方法：将带有<%%>的字符串变成纯JS
    - 代码块一：变化前
    
    ```javascript
        var template =
        'My skills:' +
        '<%if(this.showSkills) {%>' +
            '<%for(var index in this.skills) {%>' +
            '<a href="#">' +
            '    <%this.skills[index]%>'+
            '</a>' +
            '<%}%>' +
        '<%} else {%>' +
            '<p>none</p>' +
        '<%}%>';
    ```
    - 代码块二：变化成JS后
    
    ```javascript
    var lines = ''
    lines += 'My skills:'
    if(this.showSkills) {
        for(var index in this.skills) {
        lines+= '<a href="#">'
        lines+= this.skills[index]
        lines+= '</a>'
        }
    else
        lines+= '<p>none</p>'
    }

    lines 是 自定义变量
    ```
    
3. 代码实现

```javascript
var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}


// 使用

// 模板
let template = `
    <div class="ct">
        <h1>热歌榜</h1>
        <ul>
            <%if(this.showSkills){%>
                <%for(let i = 0;i<this.data.length;i++){%>
                    </this.data.length;i++){%>
                    <li><%this.data[i].name%> - <%this.data[i].singer%></li>
                <%}%>
            <%}%>
        </ul>
    </div>
`
// 调用
var string = TemplateEngine(template,{
    data: songs,
    showSkills: true
})

$('body').append(string)
```

