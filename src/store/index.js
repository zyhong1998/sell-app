import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)//实例化

export default new Vuex.Store({
  state: {
    goods: []//商品数据
  },
  mutations: {
    // 商品数据赋值
    GOODS_LIST(state, payload) {
      // 修改商品数据
      state.goods = payload
    },
    // 购物车增加减少商品
    CHANGE_COUNT(state, payload) {
      // console.log(state);
      // console.log(payload.good);
      // 修改商品的数量
      // 循环所有商品数据
      for (let v of state.goods) {
        for (let j of v.foods) {
          if (j.name === payload.good.name) {
            j.count += payload.num //修改数量
          }
        }
      }
    },
    // 清空购物车
    CLEAR_COUNT(state) {
      for (let v of state.goods) {
        for (let j of v.foods) {
          j.count = 0//修改数量
        }
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    shopList(state) {
      let arr = []
      // 将所有商品中个数大于1的商品放进一个数组
      for (let v of state.goods) {
        for (let j of v.foods) {
          if (j.count > 0) {
            arr.push(j)
          }
        }
      }

      // 数组对象去重
      let newArr = []
      let obj = {}
      for (let v of arr) {
        // 判断有名字相同的就不往新数组添加
        if (!(obj[v.name])) {
          obj[v.name] = 'xxx'
          newArr.push(v)
        }
      }
      return newArr
    }
  }
})
