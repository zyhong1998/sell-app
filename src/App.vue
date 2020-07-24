<template>
  <div class="app">
    <Header :seller="seller">商家</Header>
    <Nav>导航栏</Nav>
    <Main :seller="seller">主体</Main>
    <ShopCar>购物车</ShopCar>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Main from "@/components/Main.vue";
import ShopCar from "@/components/ShopCar.vue";

// 引入ajax函数
import { getGoods, getSeller } from "@/api/shop.js";
export default {
  data() {
    return {
      seller: {} //商家数据
    };
  },
  components: {
    Header,
    Nav,
    Main,
    ShopCar
  },
  async created() {
    // 发送ajax获取数据
    let { goodsList } = await getGoods();
    // 增加一个字段显示商品的数量
    for (let v of goodsList) {
      for (let vv of v.foods) {
        vv.count = 0;
      }
    }
    // 把商品数据，发送到vuex
    this.$store.commit("GOODS_LIST", goodsList);
    // console.log(goodsList);
    // this.goodsList = goodsList;
    let { data } = await getSeller();
    this.seller = data;
  }
};
</script>

<style lang="less" scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav {
    position: static;
  }
}
</style>