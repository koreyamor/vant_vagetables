<template>
  <div id="myAddress">
    <!-- 导航条 -->
    <van-nav-bar
      title="我的地址"
      left-text="返回"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      style="margin-top:2.5rem"
    />

    <transition name="router-slider" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onAdd() {
      // Toast('新增地址')
      this.$router.push({
        path:'/confirmOrder/myAddress/addAddress'
      })
    },
    onEdit(item, index) {
      // Toast('编辑地址:' + index)
        this.$router.push({
        path:'/confirmOrder/myAddress/editAddress'
      })
    },
  },
}
</script>

<style lang="less" scoped>
#myAddress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 200;
}

//转场动画
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.5s;
}

.router-slider-enter,
.router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}

</style>