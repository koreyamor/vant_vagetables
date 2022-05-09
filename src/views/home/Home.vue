<template>
  <div id="home">
    <div v-if="!showLoading">
      <Header />
      <!-- 轮播图 -->
      <sowing :sowing_list="sowing_list" />
      <!-- 中部导航 -->
      <Nav :nav_list="nav_list" />
      <!-- 秒杀 -->
      <FlashSale :flash_sale_product_list="flash_sale_product_list" />
      <!-- 猜你喜欢 -->
      <Youlike :you_like_product_list="you_like_product_list"/>
    </div>
    <van-loading v-else type="spinner" color="#75a342" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)"
      >小猪正在拼命加载中...
      </van-loading>
  </div>
</template>

<script>
// 1.引入
import { getHomeData } from './../../service/api/index.js'
//2.引入组件
import Header from './components/header/Header.vue'
import Sowing from './components/sowing/Sowing.vue'
import Nav from './components/Nav/Nav.vue'
import FlashSale from './components/flashSale/FlashSale.vue'
import Youlike from './components/youlike/Youlike.vue'

export default {
  data() {
    return {
      //首页的轮播图数据
      sowing_list: [],
      //导航的数据
      nav_list:[],
      //秒杀数据
      flash_sale_product_list:[],
      //猜你喜欢数据
      you_like_product_list:[],
      //是否显示加载图标
      showLoading: true,
    }
  },
  created() {
    //2.请求网络数据
    getHomeData()
      .then((response) => {
        console.log(response)
        if (response.success) {
          this.sowing_list = response.data.list[0].icon_list
          this.nav_list = response.data.list[2].icon_list
          this.flash_sale_product_list = response.data.list[3].product_list
          this.you_like_product_list = response.data.list[12].product_list

          //2.1隐藏加载动画
          this.showLoading = false
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  components: {
    Header,
    Sowing,
    Nav,
    FlashSale,
    Youlike,
  },
}
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 300rem;
  background-color: #f5f5f5;
}
</style>