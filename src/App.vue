<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">

#app
  min-height: 100%;
  background-color: #eee;

// <!--这里是对于使用reset.css之后的一些自定义的默认的css初始化-->
// <!--字体是一些移动端比较流行的字体,所以这里使用-->
// <!--其他都是为了方便开发,避免css的属性继承影响模块的代码-->
body, html {
  margin: 0;
  height: 100%;
  line-height: 1;
  font-weight: 200;
  // <!--设置一些移动端的常用的字体-->
  font-family: 'PingFang SC', 'STHeitiSc-Light', 'Helvetica-Light', Arial, sans-serif;
}

// <!--根据媒体查询@media设置不同的缩放比例(transform 的 scale)来修复1像素边框的问题-->
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  .border-1px {
    &::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  .border-1px {
    &::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
</style>
