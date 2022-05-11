<template>
  <div class="topBtn">
    <van-button round type="info" class="btn" @click="scrollToTop">返回顶部</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //是否显示返回顶部的按钮
      showBackStatus: false,
      viewScrollTop: 0,
    }
  },
  methods: {
    scrollToTop() {
      // console.log("lai");

    },
  },
}
</script>

<style lang="less" scoped>
.topBtn {
  position: fixed;
  right: 0.3125rem;
  bottom: 10vh;
  .btn {
    opacity: 0.7;
    font-size: 12px;
  }
}
</style>