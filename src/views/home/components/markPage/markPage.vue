<template>
  <div class="topBtn" @click="scrollToTop">
    <van-button round type="info" class="btn">返回顶部</van-button>
  </div>
</template>

<script>
import { animate } from '@/config/global';
export default {
  data() {
    return {
  
    }
  },
  methods:{
    scrollToTop(){
      // console.log("lai");
      //做缓动动画返回顶部
      let  docB = document.documentElement || document.body;
      animate(docB,{scrollToTop:'0'},400,'ease-out')
    }
  }
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