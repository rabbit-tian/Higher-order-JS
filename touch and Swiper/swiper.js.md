### 需要引入css文件和js文件

### swiper的基础配置

```javascript
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 滑动方向  vertical：垂直  horizontal:水平
    loop: true, // 是否循环滑动
    initialSlide: 1, // 默认显示从第二个面板开始滑动
    speed: 100, // 设置滑动的速度
    autoplay: 1000, // 自动播放

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})
```

解决swiper不自动播放问题


