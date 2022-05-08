<template>
  <div id="home">
    <Header />
    <!-- 轮播图 -->
    <sowing :sowing_list="sowing_list" />
  </div>
</template>

<script>
// 1.引入
import { getHomeData } from './../../service/api/index.js'
//2.引入组件
import Header from './components/header/Header.vue'
import Sowing from './components/sowing/Sowing.vue'
export default {
  data() {
    return {
      //首页的轮播图数据
      sowing_list:[]
    }
  },
  created() {
    //2.请求网络数据
    getHomeData()
      .then((response) => {
        console.log(response)
        if(response.success){
          this.sowing_list = response.data.list[0].icon_list
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  components: {
    Header,
    Sowing,
  },
}
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
</style>