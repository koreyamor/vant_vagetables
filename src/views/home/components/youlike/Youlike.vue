<template>
  <div class="wrapper">
    <div class="titleWrapper">
      <div class="middleLine"></div>
      <div class="title">猜你喜欢</div>
    </div>
    <div class="contentWrapper">
      <YoulikeItem
        v-for="product in you_like_product_list"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import YoulikeItem from './YoulikeItem.vue'

export default {
  props: {
    you_like_product_list: Array || [],
  },
  components: {
    YoulikeItem,
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 0.625rem;
}

.titleWrapper {
  position: relative;
  padding: 0 0.625rem;
  height: 2.1875rem;
  text-align: center;
}

.middleLine {
  padding-top: 1.09375rem;
  border-bottom: solid 1px #d8d8d8;
}

.title {
  position: relative;
  display: inline-block;
  top: -1.09375rem;
  padding: 0 1.25rem;
  line-height: 2.1875rem;
  font-size: 1rem;
  background: #f5f5f5;
}
.contentWrapper{
  margin-bottom: 4.5rem;
}
</style>
