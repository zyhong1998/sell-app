<template>
  <div class="shopcar">
    <!-- 是购物车内容 -->
    <div class="content" @click="isOpen=!isOpen">
      <div class="icon" :class="{active:getAllNum}">
        <i class="iconfont icon-gouwuche"></i>
        <span v-if="getAllNum">{{getAllNum}}</span>
      </div>
      <div
        class="good"
        :class="{moneyactive:getAllMoeny}"
      >{{getAllMoeny?'￥'+getAllMoeny+'元':'未选购物品'}}</div>
      <div class="money" @click.stop="buy" :class="{goBuy:getAllMoeny>15}">{{buyText}}</div>
    </div>
    <!-- 商品弹出页面 -->
    <transition name="model">
      <div class="product-info" v-show="isOpen">
        <div class="title">
          <span>已选商品</span>
          <span class="iconfont icon-qingkong" @click="clearAll">清空</span>
        </div>
        <ul class="list">
          <!-- {{getGood}} -->
          <li class="each" v-for="good in getGood" :key="good.id">
            <span class="name">{{good.name}}</span>
            <span class="money">￥{{good.price}}</span>
            <span class="icon">
              <i
                v-show="good.count"
                @click.stop="changeCount(good,-1) "
                class="iconfont icon-jianshao i-jianshao"
              ></i>
              <span style="margin:0 4px" v-show="good.count">{{good.count}}</span>
              <i @click.stop="changeCount(good,+1)" class="iconfont icon-zengjia i-zengjia"></i>
            </span>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 背景模态 -->
    <transition name="bgmodel">
      <div class="bg" v-show="isOpen" @click="isOpen=!isOpen"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      buyText: "还没选择商品"
    };
  },
  methods: {
    buy() {
      alert("购买");
    },
    // 将商品加入减去购物车
    changeCount(good, num) {
      // 修改vuex仓库的数据
      this.$store.commit("CHANGE_COUNT", { good, num });
      // 当购物车没有数据时，关闭购物车的模态框
      if (!this.getGood.length) {
        this.isOpen = false;
      }
    },
    // 清空所有所有物品
    clearAll() {
      this.$store.commit("CLEAR_COUNT");
      this.isOpen = false;
    }
  },
  computed: {
    // 计算商品
    getGood() {
      return this.$store.getters.shopList;
    },
    // 计算个数
    getAllNum() {
      let allNum = 0;
      for (let v of this.getGood) {
        allNum += v.count;
      }
      return allNum;
    },
    // 计算总价
    getAllMoeny() {
      let allMoney = 0;
      for (let v of this.getGood) {
        allMoney += v.count * v.price;
      }
      // 判断样式
      if (!allMoney) {
        this.buyText = "还没选择商品";
      } else if (allMoney < 15) {
        this.buyText = "满￥15起送,还差" + (15 - allMoney).toFixed(2) + "元";
      } else if (allMoney > 15) {
        this.buyText = "去结算";
      }
      return allMoney.toFixed(2);
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar {
  .content {
    z-index: 14;
    flex: 0 0 40px;
    background: #505052;
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    .icon {
      background: #363636;
      flex: 0 0 40px;
      border-radius: 50%;
      position: relative;
      top: -16px;
      left: 4px;
      padding: 10px;
      box-sizing: border-box;
      .icon-gouwuche {
        font-size: 25px;
        color: #5f5f63;
      }
      span {
        position: absolute;
        top: -6px;
        right: -2px;
        color: #fff;
        display: inline-block;
        font-size: 10px;
        width: 14px;
        height: 14px;
        padding: 2px;
        background: #ff5015;
        text-align: center;
        border-radius: 50%;
      }
    }
    .active {
      background: #3190e8;
      .icon-gouwuche {
        font-size: 25px;
        color: #fff;
      }
    }
    .good {
      flex: 1;
      text-indent: 10px;
    }
    .money {
      flex: 0 0 100px;
      color: #fff;
      height: 100%;
      border-left: 2px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      padding: 4px;
      box-sizing: border-box;
    }
    .moneyactive {
      color: #fff;
    }
    .goBuy {
      background: #38ca73;
      color: #fff;
      font-size: 18px;
    }
  }

  .product-info {
    position: fixed;
    left: 0;
    bottom: 40px;
    width: 100%;
    height: 300px;
    background: #fff;
    z-index: 12;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      background: #eceff1;
      flex: 0 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .list {
      overflow-y: scroll;
      flex: 1;
      .each {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .icon-zengjia,
        .icon-jianshao {
          color: #00a0dc;
          font-size: 18px;
        }
        .name {
          flex: 1;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        .money {
          flex: 0 0 80px;
          color: red;
        }
        .icon {
          flex: 0 0 40px;
        }
      }
    }
  }
  // 背景
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  //过渡动画
  .model-enter-active,
  .model-leave-active {
    transition: all 0.2s;
  }
  .model-enter,
  .model-leave-to {
    transform: translateY(100%);
  }
  .bgmodel-enter-active,
  .bgmodel-leave-active {
    transition: all 0.2s;
  }
  .bgmodel-enter,
  .bgmodel-leave-to {
    opacity: 0;
  }
}
</style>