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
    
### 2. string formate
### 3. 模板替换
### 4. 自制模板替换
### 5. 常见模板引擎介绍 



