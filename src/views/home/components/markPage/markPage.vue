<template>
  <div class="topBtn">
    <van-button v-if="showBackStatus" round type="info" class="btn" @click="scrollToTop"
      >返回顶部</van-button
    >
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
  mounted() {
    window.onscroll = () => {
      let viewScrollTop = document.documentElement.scrollTop
      this.viewScrollTop = viewScrollTop
      // console.log(viewScrollTop);
      if (viewScrollTop > 200) {
        this.showBackStatus = true
      } else {
        this.showBackStatus = false
      }
    }
  },
  methods: {
    scrollToTop() {
      // console.log("lai");
      let temp = document.documentElement.scrollTop
      if (temp > 0) {
        setTimeout(() => {
          document.documentElement.scrollTop -= 250
          this.scrollToTop()
        }, 10)
      } else if (temp <= 0) {
        document.documentElement.scrollTop = 0
      }
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