import {
    ADD_GOODS,
    INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS,
    SELECTED_ALL_GOODS,
    CLEAR_CART
} from './mutations-type'
import {
    getStore,
    setStore
} from './../config/global'

import Vue from 'vue'

export default {
    //往购物车中添加数据
    [ADD_GOODS](state, {
        goodsId,
        goodsName,
        smallImage,
        goodsPrice
    }) {
        let shopCart = state.shopCart;
        //判断商品是否存在
        if (shopCart[goodsId]) {
            //存在
            shopCart[goodsId]['num']++
        } else {
            //不存在
            shopCart[goodsId] = {
                "num": 1,
                "id": goodsId,
                "name": goodsName,
                "small_image": smallImage,
                "price": goodsPrice,
                "checked": true
            }
        }
        //产生新对象
        state.shopCart = {
            ...shopCart
        }
        //存入本地
        setStore('shopCart', state.shopCart)
    },


    //页面初始化，获取购物车的数据（本地）
    [INIT_SHOP_CART](state) {
        let initCart = getStore('shopCart')
        if (initCart) {
            state.shopCart = JSON.parse(initCart)
        }
    },

    //把商品移除购物车
    [REDUCE_CART](state, {
        goodsId
    }) {
        let shopCart = state.shopCart
        let goods = shopCart[goodsId]
        if (goods) {
            //找到该商品
            if (goods['num'] > 0) {
                goods['num']--;
                //判断是否只有0个
                if (goods['num'] === 0) {
                    delete shopCart[goodsId]
                }
            } else {
                goods = null;
            }
            // 同步数据 同步到state里 再同步到本地
            state.shopCart = {
                ...shopCart
            };
            setStore('shopCart', state.shopCart)
        }
    },

    //单个商品的选中和取消选中
    [SELECTED_SINGER_GOODS](state, {
        goodsId
    }) {
        let shopCart = state.shopCart
        let goods = shopCart[goodsId]
        if (goods) {
            //存在该属性
            if (goods.checked) {
                goods.checked = !goods.checked
            } else {
                Vue.set(goods, 'checked', true)
            }
            // 同步数据
            state.shopCart = {
                ...shopCart
            };
            setStore('shopCart', state.shopCart)
        }
    },

    //全选的选中和取消选中
    [SELECTED_ALL_GOODS](state, {
        isSelected
    }) {
        let shopCart = state.shopCart
        Object.values(shopCart).forEach((goods, index) => {
            //存在该属性
            if (goods.checked) {
                goods.checked = !isSelected
            } else {
                Vue.set(goods, 'checked', !isSelected)
            }
        })
        state.shopCart = {
            ...shopCart
        }
    },

    //清空购物车
    [CLEAR_CART](state) {
        state.shopCart = null;
        //数据同步
        state.shopCart = {
            ...state.shopCart
        }
        setStore('shopCart', state.shopCart)
    }

}