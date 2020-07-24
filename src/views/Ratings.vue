<template>
  <div class="ratings">
    <!-- 上方 -->
    <div class="top">
      <div class="left">
        <p style="color:orange ;font-size:22px">{{shopScore}}</p>
        <p>综合评分</p>
        <p style="font-size:6px;color:#ccc">高于周边商家69.2%</p>
      </div>
      <div class="right">
        <p>
          服务态度
          <van-rate
            v-model="shopScore"
            allow-half
            void-icon="star"
            void-color="#eee"
            color="yellow"
            readonly
          />
          <span style="color:orange">{{shopScore}}</span>
        </p>
        <p v-if="data[0]">送达时间{{data[0].deliveryTime}}分钟</p>
      </div>
    </div>
    <!-- 下方 -->
    <div class="bottom">
      <div class="button">
        <van-button type="info" @click="state='all'">全部{{allLen}}</van-button>
        <van-button style="background:#ccc" @click="state='good'">满意{{goodLen}}</van-button>
        <van-button style="background:#aaa" @click="state='fuck'">不满意{{fuckLen}}</van-button>
      </div>
      <div class="isTitle">
        <input type="radio" @click="isOpen" :checked="isChecked" />只看有内容的评价
      </div>
      <div class="comment" v-for="(item,i) in ratingList" :key="i">
        <img width="30" height="30" :src="item.avatar" alt />
        <div class="center">
          <p>{{item.username}}</p>
          <p class="time">
            <van-rate
              v-model="item.score"
              allow-half
              void-icon="star"
              void-color="#eee"
              color="yellow"
              readonly
            />
            <span>{{item.score}}分钟送达</span>
          </p>
          <p style="font-size:12px">{{item.text}}</p>

          <p class="good-label">
            <span v-for="(label,index) in item.recommend" :key="index">{{label}}</span>
          </p>
        </div>
        <div class="right">{{item.rateTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "@/api/shop.js";
// 引入星星组件
import Vue from "vue";
import { Rate, Button, RadioGroup, Radio } from "vant";
Vue.use(Rate);
Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);
import moment from "moment";
export default {
  data() {
    return {
      shopScore: 0,
      isChecked: false,
      data: [], //全部
      state: "all"
    };
  },

  methods: {
    // 获取所有数据
    async getData() {
      let { data } = await getRatings();
      let num = 0;
      data.forEach(v => {
        // 处理时间;
        v.rateTime = moment(v.rateTime).format("YYYY-MM-DD HH:mm:ss");
        return (num += v.score);
      });

      // 计算总综合评分;
      this.shopScore = Math.ceil((num / data.length) * 2) / 2;
      this.data = data; //商品评价数据
    },
    // 只显示有内容的评价
    isOpen() {
      this.isChecked = !this.isChecked;
      if (this.isChecked) {
        let arr = [];
        this.data.map(v => {
          if (!(v.text == "")) {
            arr.push(v);
          }
        });
        this.data = arr;
      } else {
        // this.data = this.ratingList;
        this.getData();
      }
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ratingList() {
      // 筛选评论
      if (this.state === "all") {
        return this.data;
      } else if (this.state === "good") {
        return this.data.filter(v => v.score >= 4);
      } else if (this.state === "fuck") {
        return this.data.filter(v => v.score < 4);
      }
    },
    // 计算评论个数
    allLen() {
      return this.data.length;
    },
    goodLen() {
      return this.data.filter(v => v.score >= 4).length;
    },
    fuckLen() {
      return this.data.filter(v => v.score < 4).length;
    }
  }
};
</script>

<style lang="less" scoped>
.ratings {
  display: flex;
  flex-direction: column;
  background: #ccc;
  .top {
    flex: 0 0 60px;
    background: #fff;
    margin-bottom: 20px;
    padding: 10px 6px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .left {
      flex: 0 0 120px;
      border-right: 1px solid #ccc;
      text-align: center;
      p {
        margin-bottom: 4px;
      }
    }
    .right {
      flex: 1;
      margin-left: 20px;
      font-size: 10px;
      align-self: center;
      p {
        display: flex;
        line-height: 16px;
      }
      /deep/ .van-rate--readonly {
        margin: 0 4px;
      }
      /deep/.van-rate__icon {
        font-size: 16px;
      }
    }
  }
  .bottom {
    flex: 1;
    background: #fff;

    .button {
      margin: 10px;
      border-bottom: 1px solid #ccc;
      button {
        margin: 0 0 10px 10px;
        height: 30px;
      }
    }
    .isTitle {
      margin: 20px 10px;
    }
    .comment {
      margin: 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      padding: 0 0 10px 0;
      img {
        flex: 0 0 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 6px;
      }
      .center {
        flex: 1;
        /deep/.time {
          font-size: 10px;
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
      }
      .right {
        flex: 0 0 80px;
        font-size: 8px;
      }
      .good-label {
        margin-top: 4px;
        span {
          display: inline-block;
          border: 1px solid #ccc;
          margin-right: 3px;
          font-size: 8px;
          padding: 2px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>