<template>
  <div class="goods">
    <!-- 左侧 -->
    <div class="left-nav" id="left-nav">
      <ul class="nav">
        <li
          @click="changeActive(item.name)"
          :class="{active: isActive===item.name }"
          v-for="item in goodsList"
          :key="item.name"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- 右侧 -->
    <div id="right-main">
      <div class="main">
        <!-- {{getClassNum}} -->
        <!-- 一级循环 -->
        <div :id="item.name" v-for="item in goodsList" :key="item.name" class="title">
          <p class="item-name">{{item.name}}</p>
          <!-- 二级循环 -->
          <div @click="goodText(good)" class="content" v-for="good in item.foods" :key="good.id">
            <img :src="good.imgUrl" alt width="60" height="60" />
            <div class="center">
              <p class="name">{{good.name}}</p>
              <p class="good-desc" style="font-size:12px">{{good.goodsDesc}}</p>
              <p class="good-info" style="font-size:12px">月售{{good.sellCount}}份/好评率{{good.rating}}%</p>

              <p class="price" style="color:red">￥{{good.price}}</p>
              <div class="clacConut">
                <i
                  v-show="good.count"
                  @click.stop="changeCount(good,-1) "
                  class="iconfont icon-jianshao i-jianshao"
                ></i>
                <span style="margin:0 4px" v-show="good.count">{{good.count}}</span>
                <i @click.stop="changeCount(good,+1)" class="iconfont icon-zengjia i-zengjia"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="model">
      <GoodModel @handleClose="isOpenModel = false" v-show="isOpenModel" :curGood="curGood" />
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// 引入商品详情模态框
import GoodModel from "@/components/GoodModel.vue";
import moment from "moment";

export default {
  components: {
    GoodModel
  },
  props: ["seller"],
  data() {
    return {
      isActive: "岛市美食",
      hArr: [], //右侧高度区间的数组
      isOpenModel: false,
      curGood: {}
    };
  },
  methods: {
    // 左侧激活样式
    changeActive(name) {
      this.isActive = name;
      // 点击左侧右侧联动效果
      this.rightScroll.scrollToElement(document.getElementById(name), 300);
    },
    // 计算数组
    clacArr() {
      // 循环计算一个高度数组
      let total = 0;
      for (let v of this.goodsList) {
        let h = document.getElementById(v.name).offsetHeight; //获取当前dom的高度
        this.hArr.push({ min: total, max: total + h, name: v.name });
        total = total + h; //将最大值作为下次的最小值
      }
    },
    changeCount(good, num) {
      // console.log(good);
      // console.log(num);
      // 修改vuex仓库的数据
      this.$store.commit("CHANGE_COUNT", { good, num });
    },
    goodText(good) {
      this.isOpenModel = true;
      //  处理时间
      good.ratings.forEach(v => {
        v.rateTime = moment(v.rateTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.curGood = good;
    }
  },
  mounted() {
    // 左侧滑动效果
    new BScroll("#left-nav", {
      click: true // 允许点击【better-scroll默认把点击禁止了】
    });
    // 右侧滑动效果
    this.rightScroll = new BScroll("#right-main", {
      click: true, // 允许点击【better-scroll默认把点击禁止了】
      probeType: 3 // 可以派发滚动事件
    });
    // 右侧滚动，左侧激活联动
    this.rightScroll.on("scroll", pos => {
      // 计算滚动距离
      let y = Math.abs(pos.y);
      // 循环高度数组
      for (let v of this.hArr) {
        //判断当前滚得距离在那个部分
        if (y >= v.min && y < v.max) {
          this.isActive = v.name;
        }
      }
    });
  },
  updated() {
    this.clacArr();
  },
  created() {
    this.$nextTick(() => {
      this.clacArr();
    });
  },
  computed: {
    // 拿取vuex中的数据
    goodsList() {
      return this.$store.state.goods;
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  height: 100%;
  display: flex;
  // 左侧
  .left-nav {
    height: 100%;
    flex: 0 0 80px;
    box-sizing: border-box;
    background: #f4f5f7;
    border-right: 2px solid #f4f5f7;
    .nav {
      > li {
        font-size: 14px;
        height: 32px;
        padding: 4px;
        display: flex;
        align-items: center;
        color: #444;
        &.active {
          background: #fff;
          color: #000;
        }
      }
    }
  }

  // 右侧
  #right-main {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    .main {
      box-sizing: border-box;
      .title {
        .item-name {
          display: inline-block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          background: #f4f5f7;
          text-indent: 10px;
          border-left: 2px solid #dadde2;
          color: #91969a;
        }
      }
      .content {
        display: flex;
        align-items: center;
        padding: 8px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        img {
          margin: 0 6px 0 0;
          flex: 0 0 60px;
        }
        .center {
          position: relative;

          flex: 1;
          p {
            margin-bottom: 4px;
          }
          .name,
          .good-info {
            width: 160px;
            display: -webkit-box;
            -webkit-line-clamp: 1; /*数字为指定行数 3代表最多3行*/
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .good-desc {
            width: 120px;
            display: -webkit-box;
            -webkit-line-clamp: 1; /*数字为指定行数 3代表最多3行*/
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        .clacConut {
          display: flex;
          position: absolute;
          bottom: 0px;
          right: 0;
          .i-jianshao,
          .i-zengjia {
            color: #00a0dc;
            font-size: 18px;
          }
        }
      }
    }
  }
}
//过渡动画
.model-enter-active,
.model-leave-active {
  transition: all 0.5s;
}
.model-enter,
.model-leave-to {
  transform: translateY(100%);
}
</style>