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
- 


    

### promise   解决异步问题
- 异步的：（点击）事件，定时器，其他多数为同步

