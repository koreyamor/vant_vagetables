<template>
  <div id="editAddress">
    <!-- 导航条 -->
    <van-nav-bar
      title="修改地址"
      left-text="返回"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />

    <!-- 地址编辑 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
      style="margin-top: 2.5rem"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      areaList: {},
      searchResult: [],
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSave() {
      Toast('save')
    },
    onDelete() {
      Toast('delete')
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ]
      } else {
        this.searchResult = []
      }
    },
  },
}
</script>

<style lang="less" scoped>
#editAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 9999;
}
</style>