<template>
  <div class="topBtn">
<<<<<<< HEAD
    <van-button v-if="isShow" round type="info" class="btn" @click="goTopFun()"
      >返回顶部</van-button
    >
=======
    <van-button round type="info" class="btn">返回顶部</van-button>
>>>>>>> b16762391fcffaf4dab1ab0e548b9b6e819940c4
  </div>
</template>

<script>
export default {
  data() {
<<<<<<< HEAD
    return {
      viewScrollTop: 0,
      isShow: false,
    }
  },
  mounted() {
    window.onscroll = () => {
      let viewScrollTop = document.documentElement.scrollTop
      this.viewScrollTop = viewScrollTop
      if (viewScrollTop > 20) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    goTopFun() {
      let temp = document.documentElement.scrollTop
      if (temp > 0) {
        setTimeout(() => {
          document.documentElement.scrollTop -= 250
          this.goTopFun()
        }, 10)
      } else if (temp <= 0) {
        document.documentElement.scrollTop = 0
      }
    },
=======
    return {}
>>>>>>> b16762391fcffaf4dab1ab0e548b9b6e819940c4
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
