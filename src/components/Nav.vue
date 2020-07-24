<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link to="/goods">商品</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/ratings">评价</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/seller">商家</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid #ccc;
  .nav-item {
    background: #fff;
    width: 100%;
    height: 100%;
    line-height: 30px;
    text-align: center;
    a {
      text-decoration: none;
      color: #000;
      display: inline-block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      &.router-link-active {
        color: red;
        // border-bottom: 1px solid blue;
      }
    }
  }
}
</style>