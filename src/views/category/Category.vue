<template>
  <div id="category">
    <!-- 头部 -->
    <Header />
    <!-- 内容 -->
    <div class="listWrapper" v-if="!showLoading">
      <!-- 左边 -->
      <div class="leftWrapper">
        <ul class="wrapper">
          <li
            class="categoryItem"
            v-for="(cate, index) in categoriesData"
            :class="{ selected: currentIndex === index }"
            @click="clickLeftLi(index)"
            :key="cate.id"
            ref="menuList"
          >
            <span class="textWrapper">{{ cate.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <ContentView :categoriesdetailData = "categoriesdetailData" />
    </div>
    <van-loading
      v-else
      type="spinner"
      color="#75a342"
      style="
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%);
      "
      >小猪正在拼命加载中...
    </van-loading>
  </div>
</template>

<script>
//引入组件
import Header from './components/Header.vue'
import ContentView from './components/ContentView.vue'
//引入滚动组件
import BScroll from 'better-scroll'
//引入接口
import { getCategories, getCategoriesDetail } from './../../service/api/index'

//引入通信插件
import Pubsub from 'pubsub-js'
//引入提示插件
import {Toast} from 'vant'


export default {
  data() {
    return {
      //是否显示加载图标
      showLoading: true,
      //左边列表数据
      categoriesData: [],
      //右边列表数据
      categoriesdetailData: [],
      //左边Item选中与否
      currentIndex: 0,
    }
  },
  created() {
    this.initData()
  },
   mounted(){
    //订阅添加到购物车的消息
    Pubsub.subscribe('categoryAddToCart',(msg,goods)=>{
      if(msg === "categoryAddToCart") {
        this.ADD_GOODS({
          goodsId:goods.id,
          goodsName:goods.name,
          smallImage:goods.small_image,
          goodsPrice:goods.price,
        })
        //提示用户
        Toast({
          message:'添加到购物车成功!',
          duration:800
          
        })
      }
    })
  },
  components: {
    Header,
    ContentView,
  },
  methods: {
    //初始化操作（数据和界面）
    async initData() {
      //获取左边的数据
      let leftRes = await getCategories()
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate
      }
      // console.log(this.categoriesData)
      //获取右边的数据
      let rightRes = await getCategoriesDetail('/lk001')
      if (rightRes.success) {
        this.categoriesdetailData = rightRes.data.cate
      }
      // console.log(this.categoriesdetailData)
      //隐藏Loading框
      this.showLoading = false

      //初始化滚动框架
      this.$nextTick(() => {
        this.leftScroll = new BScroll('.leftWrapper', { probeType: 3 })
      })
    },
    //处理左边的点击
    async clickLeftLi(index){
      // 改变索引
      this.currentIndex = index
      //滚动到对应的位置
      let menuLists = this.$refs.menuList;
      let el = menuLists[index]
      // console.log(el);
      // 滚动到对应元素上
      this.leftScroll.scrollToElement(el,300)

           //获取右边的数据
      let rightRes = await getCategoriesDetail(`/lk00${index + 1}`)
      if (rightRes.success) {
        this.categoriesdetailData = rightRes.data.cate
      }
    },
  },
}
</script>

<style lang="less" scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}
.listWrapper {
  display: flex;
  position: absolute;
  top: 2.8rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}

.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 1px #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
}

.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}

@media (min-width: 960px) {
  .wrapper {
    border-right: 1px solid #e8e9e8;
  }

  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>