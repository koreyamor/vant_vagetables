<template>
  <div id="cart">
    <!--头部区域-->
    <header class="titleWrapper">
      <h4><strong>购物车</strong></h4>
      <button class="clearCart" @click="clearCart()">清空购物车</button>
    </header>
    <div class="contentWrapper">
      <!--中间内容-->
      <main class="contentWrapperList">
        <section>
          <div
            class="shopCartListCon"
            v-for="goods in shopCart"
            :key="goods.id"
          >
            <div class="left">
              <a
                href="javascript:;"
                class="cartCheckBox"
                :checked="goods.checked"
                @click.stop="singerGoodsSelected(goods.id)"
              ></a>
            </div>
            <div class="center">
              <img :src="goods.small_image" alt="" />
            </div>
            <div class="right">
              <a href="#"> {{ goods.name }}</a>
              <div class="bottomContent">
                <p class="shopPrice">{{ goods.price | moneyFormat }}</p>
                <div class="shopDeal">
                  <span @click="removeOutCart(goods.id, goods.num)">-</span>
                  <input disabled type="number" v-model="goods.num" />
                  <span
                    @click="
                      addToCart(
                        goods.id,
                        goods.name,
                        goods.small_image,
                        goods.price
                      )
                    "
                    >+</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <!--底部通栏-->
      <div class="tabBar">
        <div class="tabBarLeft">
          <a
            href="javascript:;"
            class="cartCheckBox"
            :checked="isSelectedAll"
            @click.stop="selectedAll(isSelectedAll)"
          ></a>
          <span style="font-size: 16px">全选</span>
          <div class="selectAll">
            合计：<span class="totalPrice">{{ totalPrice | moneyFormat }}</span>
          </div>
        </div>
        <div class="tabBarRight">
          <router-link tag="a" class="pay" :to="{ path: '/confirmOrder' }"
            >去结算({{ goodsCount }})</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Dialog } from 'vant'

export default {
  computed: {
    ...mapState(['shopCart']),
    //商品的总件数
    goodsCount() {
      let selectedGoodsCount = 0
      Object.values(this.shopCart).forEach((goods, index) => {
        if (goods.checked) {
          selectedGoodsCount += 1
        }
      })
      return selectedGoodsCount
    },
    //商品是否全选
    isSelectedAll() {
      let tag = Object.keys(this.goodsCount).length > 0
      Object.values(this.shopCart).forEach((goods, index) => {
        if (!goods.checked) {
          tag = false
        }
      })
      return tag
    },
    //计算商品总价
    totalPrice() {
      let totalPrice = 0
      Object.values(this.shopCart).forEach((goods, index) => {
        if (goods.checked) {
          totalPrice += goods.price * goods.num
        }
      })
      return totalPrice
    },
  },
  methods: {
    ...mapMutations([
      'REDUCE_CART',
      'ADD_GOODS',
      'SELECTED_SINGER_GOODS',
      'SELECTED_ALL_GOODS',
      'CLEAR_CART',
    ]),
    //移除购物车
    removeOutCart(goodsId, goodsNum) {
      if (goodsNum > 1) {
        this.REDUCE_CART({ goodsId })
      } else if (goodsNum === 1) {
        Dialog.confirm({
          title: '小猪温馨提示',
          message: '确定删除该商品吗？',
        })
          .then(() => {
            //点击确定
            this.REDUCE_CART({ goodsId })
          })
          .catch(() => {
            //点击取消
          })
      }
    },
    //增加商品
    addToCart(goodsId, goodsName, smallImage, goodsPrice) {
      this.ADD_GOODS({
        goodsId,
        goodsName,
        smallImage,
        goodsPrice,
      })
    },
    //单个商品选中和取消选中
    singerGoodsSelected(goodsId) {
      this.SELECTED_SINGER_GOODS({ goodsId })
    },
    //全选的选中和取消选中
    selectedAll(isSelected) {
      this.SELECTED_ALL_GOODS({ isSelected })
    },
    //清空购物车
    clearCart() {
      Dialog.confirm({
        title: '小猪温馨提示',
        message: '确定清空所有商品吗？',
      })
        .then(() => {
          //点击确定
          this.CLEAR_CART()
        })
        .catch(() => {
          //点击取消
        })
    },
  },
}
</script>

<style lang="less" scoped>
#cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.titleWrapper {
  width: 100%;
  height: 2.6rem;
  background: #fff;
  -webkit-background-size: 0.1rem 4.4rem;
  background-size: 0.1rem 4.4rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
}

.titleWrapper .clearCart {
  background-color: transparent;
  position: absolute;
  right: 0.3rem;
  color: red;
  font-size: 0.8rem;
}

.contentWrapper {
  padding-top: 3.5rem;
}

/*列表内容*/
.contentWrapperList {
  padding-bottom: 6rem;
}

.contentWrapperList section {
  background-color: #fff;
}

.cartCheckBox {
  background: url('./images/shop-icon.png ') no-repeat;
  -webkit-background-size: 2.5rem 5rem;
  background-size: 2.5rem 5rem;
  width: 1rem;
  height: 1rem;
}

.cartCheckBox[checked] {
  background-position: -1.2rem 0;
}

.shopCartListCon {
  display: flex;
  height: 6rem;
  border-bottom: 0.01rem solid #e0e0e0;
  margin-bottom: 0.7rem;
  padding: 0.5rem 0;
}

.shopCartListCon .left {
  /*background: purple;*/
  flex: 1;
  display: flex;
  /*justify-content: center;*/
}

.shopCartListCon .left a {
  display: inline-block;
  margin-top: 0.8rem;
  margin-left: 0.5rem;
}

.shopCartListCon .center {
  /*background: blue;*/
  flex: 3;
}

.shopCartListCon .center img {
  width: 100%;
  height: 100%;
}

.shopCartListCon .right {
  /*background: orangered;*/
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  position: relative;
}

.shopCartListCon .right a {
  height: 2.2rem;
  line-height: 1.2rem;
  overflow: hidden;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: #000;
}

.shopCartListCon .bottomContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.shopCartListCon .bottomContent .shopPrice {
  font-size: 0.8rem;
}

.shopCartListCon .right .shopDeal span {
  display: inline-block;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
}

.shopCartListCon .right .shopDeal input {
  width: 2rem;
  height: 1.2rem;
  text-align: center;
  margin: 0 0.2rem;
  font-size: 0.8rem;
}

/*底部通栏*/
.tabBar {
  position: fixed;
  left: 0;
  bottom: 2.7rem;
  width: 100%;
  height: 2.5rem;
  background-color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.01rem solid #e0e0e0;
}

.tabBarLeft {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.tabBarLeft .selectAll {
  margin-left: 1rem;
  font-size: 1rem;
}

.totalPrice {
  color: #e9232c;
}

.tabBarRight .pay {
  width: 5rem;
  height: 2rem;
  background-color: #e9232c;
  border-radius: 1rem;
  margin-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #fff;
}
</style>




