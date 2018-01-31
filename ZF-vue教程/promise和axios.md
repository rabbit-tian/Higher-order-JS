### axios
- 在vue的钩子函数中使用，用于ajax的获取

```javascript
created () { // 钩子函数，用于数据请求 axios
    axios.get('https://www.easy-mock.com/mock/5a71267e14298b5123dda1ad/cart-json/cart-json#!method=get').then(res => {
        // 成功
        console.log(res.data)
    }, err => {
        // 失败
        console.log(err)
    })
}
```



    

### promise   解决异步问题
- 异步的：（点击）事件，定时器，其他多数为同步

```javascript
function ajax({url='',type='get',dataType='json'}) {
    return new Promise((resolve,reject) =>{
        let xhr = new XMLHttpRequest()
        xhr.open(type,url,true)
        xhr.onload = function () { // xhr.readState = 4, xhr.status = 200
            if (xhr.status = 200) { // 判断状态
                resolve (xhr.response) // 成功调用的方法
            }else {
                reject ('not find')
            }
        }
        xhr.onerror = function (err) { // 网络不好的时候走
            reject (err) // 失败调用的方法
        }
        xhr.send()
    })
}

ajax({url:'https://www.easy-mock.com/mock/5a71267e14298b5123dda1ad/cart-json/cart-json#!method=get'}).then(function (data) {
    console.log(data)
},function (err) {
    console.log(err)
})
```

