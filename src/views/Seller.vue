<template>
  <div class="seller">
    <div class="top">
      <h4>{{seller.name}}</h4>
      <div class="shopName">
        <p class="star">
          <van-rate
            v-model="seller.score"
            allow-half
            void-icon="star"
            void-color="#eee"
            color="yellow"
            readonly
          />
          <span>(100)月售100单</span>
        </p>
        <div @click="changeShoucang" style="text-align: center;" class="shoucang">
          <i
            :class="isShoucang ? 'iconfont icon-shoucang1':'iconfont icon-shoucang2'"
            style="color:red;"
          ></i>
          <p>{{isShoucang?'已收藏':'未收藏'}}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="describe">
        <div class="left">
          <p class="title">起送价</p>
          <p>
            20
            <span class="title" style="color:#000">元</span>
          </p>
        </div>
        <div class="center">
          <p class="title">商家配送</p>
          <p>
            4
            <span class="title" style="color:#000">元</span>
          </p>
        </div>
        <div class="right">
          <p class="title">平均配送时间</p>
          <p>
            39
            <span class="title" style="color:#000">分钟</span>
          </p>
        </div>
      </div>
      <div>
        <h4>公告与活动</h4>
        <p style="color:#D4552F ;font-size:14px;padding: 0 10px">{{seller.bulletin}}</p>
        <p
          v-for="item in seller.supports"
          :key="item"
          style="margin-top:10px;font-size:10px"
        >{{item}}</p>
      </div>
      <!-- 商家实景 -->
      <h4>商家实景</h4>
      <div class="pics" id="pics" style="margin-top:30px">
        <ul class="picsSon">
          <li v-for="item in seller.pics" :key="item">
            <img :src="item" alt />
          </li>
          <!-- {{getWidth}} -->
        </ul>
      </div>
      <!-- 商家信息 -->
      <div class="shop-info">
        <h4>商家信息</h4>
        <div>
          <p>该商家支持开发发票，请在下单时填写好发票抬头</p>
        </div>
        <div>
          <p>品类：其他菜系、包子粥店</p>
        </div>
        <div>
          <p>地址:成都市武侯区天府新谷</p>
        </div>
        <div>
          <p>营业时间：10：00-22；00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Rate } from "vant";
Vue.use(Rate);
// 引入丝滑效果
import BScroll from "better-scroll";
export default {
  data() {
    return {
      isShoucang: false
    };
  },
  props: ["seller"],

  mounted() {
    new BScroll("#pics", {
      scrollX: true, //横向滚动
      click: true
    });
  },
  methods: {
    changeShoucang() {
      this.isShoucang = !this.isShoucang;
    }
  }
};
</script>

<style lang="less" scoped>
.seller {
  padding: 0 10px;
  .top {
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;

    .shopName {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-top: -10px;
      font-size: 10px;
      align-items: center;
      .star {
        display: flex;
        align-items: center;
        span {
          margin-left: 6px;
        }
      }
      .shoucang {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .content {
    overflow: hidden;
    .describe {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      > div {
        text-align: center;
        .title {
          color: #bbb;
          margin-bottom: 4px;
          font-size: 10px;
        }
      }
    }
    .pics {
      background: #ccc;
      width: 100%;
      .picsSon {
        background: #fff;
        white-space: nowrap;
        display: inline-block;
        > li {
          display: inline-block;
        }
        img {
          margin-right: 10px;
          width: 150px;
          height: 150px;
        }
      }
    }
    .shop-info {
      margin-bottom: 10px;
      > div {
        border-bottom: 1px solid #ccc;
        line-height: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>