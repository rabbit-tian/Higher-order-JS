1. 查看UI设计图 尺寸 => 750,根据尺寸，做好rem适配
2. 新建style.less文件，用考拉编译成css文件
3. 开始写css样式，首先清除默认样式
4. 侧滑
    - 小侧滑
    - 大侧滑
    - 关键点：利用touch事件对象中的x和y的偏移值
    - 注意点：注意x和y是有方向性的

5. 大侧滑
    - 选项卡的延伸
    - 注意好下标值

6. 饿了么 菜单联动
    - 滚动条
        - overflow：hidden
        - 固定的高度
    - 左边锚点联系右边
    - 右边通过offset().top值控制左边

7. 移动版 轮播图
    - 和PC端大致相同
    - 唯一的区别是：事件不同，移动端是手指滑动，用touch事件（touchStart）
    - touch事件中：注意当横向距离大于纵向距离时，要阻止默认事件

      ```javascript
      // 防止纵向位移
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                event.preventDefault()
            }
      ```

