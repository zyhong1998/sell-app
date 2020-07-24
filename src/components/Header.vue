<template>
  <div class="header">
    <div class="bg"></div>

    <div class="content">
      <!-- 上 -->
      <div class="shop-info">
        <div class="left">
          <img width="50" height="50" :src="seller.avatar" />
        </div>
        <div class="center">
          <p class="name">
            <i class="iconfont icon-pinpairenzheng"></i>
            {{seller.name}}
          </p>
          <p style="font-size:12px ">{{seller.description}}/{{seller.deliveryTime}}分钟</p>
          <p style="font-size:12px" v-if="seller.supports">
            <i class="iconfont icon-jian"></i>
            {{seller.supports[0]}}
          </p>
        </div>
        <div class="right">
          <span @click="isShow=true" v-if="seller.supports">
            {{seller.supports.length}}个
            <i class="iconfont icon-right"></i>
          </span>
        </div>
      </div>
      <!-- 下 -->
      <div class="shop-notice">
        <van-notice-bar class="iconfont icon-gaokaobei" :text="seller.bulletin" />
      </div>
    </div>
    <!-- 模态框 -->
    <transition name="model">
      <ShopModel v-show="isShow" @handleClose="isShow = false" :seller="seller" />
    </transition>
  </div>
</template>

<script>
import ShopModel from "@/components/ShopModel.vue";
import Vue from "vue";
import { NoticeBar } from "vant";
Vue.use(NoticeBar);
export default {
  components: {
    ShopModel
  },
  props: ["seller"],
  data() {
    return {
      isShow: false //蒙层
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 100px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    background: url(../assets/imgs/bg.jpg) no-repeat;
    background-size: 100% 100%;
    filter: blur(1px);
  }
  //过渡动画
  .model-enter-active,
  .model-leave-active {
    transition: all 0.5s;
  }
  .model-enter,
  .model-leave-to {
    opacity: 0;
  }
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    .shop-info {
      width: 100%;
      flex: 1;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex: 0 0 40px;
        margin-right: 10px;
        img {
          border-radius: 4px;
        }
      }
      .center {
        flex: 1;
        .name {
          font-size: 18px;
          font-weight: 600;
        }
        /deep/.icon-pinpairenzheng {
          color: red;
          font-size: 22px;
          // font-weight: normal;
        }
        p {
          margin-bottom: 2px;
        }
      }
      .right {
        flex: 0 0 20px;
        font-size: 8px;
        height: 100%;
        position: relative;
        span {
          color: #fff;
          display: inline-block;
          width: 36px;
          background: rgba(0, 0, 0, 0.7);
          padding: 5px 0;
          padding-left: 10px;
          border-radius: 12px;
          position: absolute;
          bottom: 14px;
          right: 70px;
          i {
            position: absolute;
            top: 3px;
          }
        }
      }
    }
    .shop-notice {
      flex: 0 0 10px;
      display: flex;
      justify-content: space-around;
      align-content: center;
      background: rgba(0, 0, 0, 0.3);
      line-height: 30px;
      .van-notice-bar {
        background: transparent;
        color: #fff;
        flex: 1;
        margin-left: 4px;
        height: 20px;
        font-size: 12px;
      }
      .van-notice-bar__content {
        font-size: 12px;
      }
    }
  }
}
</style>