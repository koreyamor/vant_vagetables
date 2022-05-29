<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#75a342">
      <van-tabbar-item replace to="/dashboard/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home_icon.active : home_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/category">
        <span>分类</span>
        <template #icon="props">
          <img
            :src="props.active ? category_icon.active : category_icon.inactive"
          />
        </template>
      </van-tabbar-item>

      <van-tabbar-item
        replace
        to="/dashboard/cart"
        :badge="goodsNum > 0 ? goodsNum : ''"
      >
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? cart_icon.active : cart_icon.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mine_icon.active : mine_icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      active: Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
      home_icon: {
        active: require('@/images/tabbar/home_default.png'),
        inactive: require('@/images/tabbar/home_selected.png'),
      },
      category_icon: {
        active: require('@/images/tabbar/category_default.png'),
        inactive: require('@/images/tabbar/category_selected.png'),
      },
      cart_icon: {
        active: require('@/images/tabbar/shoppingcart_default.png'),
        inactive: require('@/images/tabbar/shoppingcart_selected.png'),
      },
      mine_icon: {
        active: require('@/images/tabbar/mine_default.png'),
        inactive: require('@/images/tabbar/mine_selected.png'),
      },
    }
  },
  watch: {
    active(value) {
      // console.log(value);
      let tabBarActiveIndex = value > 0 ? value : 0
      //缓存到本地
      sessionStorage.setItem('tabBarActiveIndex', value)
    },
  },
  computed: {
    ...mapState(['shopCart']),
    goodsNum() {
      if (this.shopCart) {
        //总的购物车商品数量
        let num = 0
        console.log(Object.values(this.shopCart))
        Object.values(this.shopCart).forEach((goods, index) => {
          num += goods.num
        })
        return num
      } else {
        return 0
      }
    },
  },
  mounted() {
    //获取购物车数据
    this.INIT_SHOP_CART()
  },
  methods: {
    ...mapMutations(['INIT_SHOP_CART']),
  },
}
</script>

<style lang="less" scoped>
#dashboard {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
