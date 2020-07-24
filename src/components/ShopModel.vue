<template>
  <div class="shop-model">
    <div class="content">
      <!-- 商家名及评分 -->
      <div class="name">
        <h2>{{seller.name}}</h2>
        <p style="text-align: center;">
          <van-rate
            v-model="seller.score"
            allow-half
            void-icon="star"
            void-color="#eee"
            color="yellow"
            readonly
          />
        </p>
      </div>
      <!-- 优惠信息 -->
      <div class="sale">
        <div class="saletitle">
          <span class="line"></span>
          优惠信息
          <span class="line"></span>
        </div>
        <!-- <p v-if="seller.supports">
          <i class="iconfont icon-hui"></i>
          {{seller.supports[0]}}
        </p>
        <p v-if="seller.supports">
          <i class="iconfont icon-zhe"></i>
          {{seller.supports[1]}}
        </p>-->
        <p v-for="item in seller.supports" :key="item">{{item}}</p>
      </div>
      <!-- 商家公告 -->
      <div class="bulletin">
        <div class="shoptitle">
          <span class="line"></span> 商家公告
          <span class="line"></span>
        </div>
        <p>{{seller.bulletin }}</p>
      </div>

      <i @click="handleModel" class="iconfont icon-guanbi"></i>
    </div>
  </div>
</template>

<script>
// 引入星星组件
import Vue from "vue";
import { Rate } from "vant";
Vue.use(Rate);
export default {
  props: ["seller"],
  data() {
    return {};
  },
  methods: {
    handleModel() {
      this.$emit("handleClose"); //子穿父关闭模态框
    }
  }
};
</script>

<style lang="less" scoped>
.shop-model {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #fff;
  display: flex;
  align-items: flex-start;
  z-index: 20;
  p {
    line-height: 30px;
    font-size: 13px;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .sale {
      margin: 20px 0px;
      .saletitle {
        margin-bottom: 10px;
      }
    }
    .line {
      display: inline-block;
      border-bottom: 1px solid #ccc;
      width: 100px;
      margin-bottom: 5px;
    }
    .bulletin {
      text-align: center;
      padding: 10px 20px;

      .shoptitle {
        margin-bottom: 20px;
      }
      p {
        text-align: left;
      }
    }
  }
  .icon-guanbi {
    font-size: 24px;
    color: #ccc;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
}
</style>