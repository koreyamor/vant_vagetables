<template>
  <div id="order">
    <!-- 导航栏 -->
    <van-nav-bar
      title="填写订单"
      left-text="返回"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />

    <!-- 收货地址 -->
    <van-contact-card
      type="add"
      add-text="选择收货地址"
      @click="chooseAddress"
      style="margin-top: 3rem"
    />

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="送达时间" value="请选择送达时间" is-link />
      <van-cell value="内容" is-link center>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <img src="./images/detail1.jpg" alt="" style="width: 3rem" />
          <img src="./images/detail1.jpg" alt="" style="width: 3rem" />
          <img src="./images/detail1.jpg" alt="" style="width: 3rem" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="支付方式" value="微信" />
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="备注">
        <input type="text" placeholder="选填，备注您的特殊需求" />
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额" value="￥50.3" />
      <van-cell title="配送费" value="￥0.00" />
    </van-cell-group>

    <van-submit-bar :price="3050" button-text="提交订单" label="实付" @submit="onSubmit" />

    <transition name="router-slider" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    //点击了左边
    onClickLeft() {
      this.$router.back()
    },
    //选择地址
    chooseAddress() {
      this.$router.push('/confirmOrder/myAddress')
    },
    //提交订单
    onSubmit(){
      alert(0)
    }
  },
}
</script>

<style lang="less" scoped>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
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