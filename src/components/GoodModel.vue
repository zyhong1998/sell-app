<template>
  <div class="goodmodel">
    <img width="100%" :src="curGood.imgUrl" alt />
    <div class="good-name">
      <h3>{{curGood.name}}</h3>
      <p style="font-size:12px">月售{{curGood.sellCount}}份/好评率{{curGood.rating}}%</p>
      <div class="money">
        <span style="color:red">￥{{curGood.price}}</span>
        <div class="clacConut">
          <i
            v-show="curGood.count"
            @click.stop="changeCount(curGood,-1) "
            class="iconfont icon-jianshao i-jianshao"
          ></i>
          <span style="margin:0 4px" v-show="curGood.count">{{curGood.count}}</span>
          <i @click.stop="changeCount(curGood,+1)" class="iconfont icon-zengjia i-zengjia"></i>
        </div>
      </div>
    </div>
    <div class="good-info">
      <h4>商品介绍</h4>
      <p>{{curGood.goodsDesc}}</p>
    </div>
    <div class="ratings">
      <h4>商品评价</h4>
      <div class="comment" v-for="(item,i) in curGood.ratings" :key="i">
        <img width="30" height="30" :src="item.avatar" alt />
        <div class="center">
          <p>{{item.username}}</p>
          <p style="font-size:12px">{{item.text}}</p>
          <p class="good-label">
            <span v-for="(label,index) in item.recommend" :key="index">{{label}}</span>
          </p>
        </div>
        <div class="right">{{item.rateTime}}</div>
      </div>
    </div>
    <i @click="handleModel" class="iconfont icon-guanbi"></i>
  </div>
</template>

<script>
export default {
  props: ["curGood"],
  methods: {
    handleModel() {
      this.$emit("handleClose"); //子传父关闭模态框
    },
    changeCount(good, num) {
      // console.log(good);
      // console.log(num);
      // 修改vuex仓库的数据
      this.$store.commit("CHANGE_COUNT", { good, num });
    }
  }
};
</script>

<style lang="less" scoped>
.goodmodel {
  z-index: 12;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(244, 245, 247, 1);
  color: #000;
  overflow-y: scroll;
  .icon-guanbi {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #ccc;
    border-radius: 50%;
    font-size: 20px;
    color: #fff;
    padding: 6px;
    box-sizing: border-box;
  }
  .good-name {
    margin: 20px 0;
    background: #fff;
    color: #000;
    padding: 10px;
    .money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .clacConut {
        .iconfont {
          color: #00a0dc;
          font-size: 18px;
        }
      }
    }
  }
  .good-info {
    background: #fff;
    padding: 10px;
    margin-bottom: 20px;
    p {
      color: #929498;
    }
  }
  .ratings {
    background: #fff;
    padding: 10px;
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
    margin-bottom: 40px;
  }
}
</style>