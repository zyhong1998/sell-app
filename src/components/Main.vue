<template>
  <div class="main">
    <!-- 路由出口 -->
    <router-view :seller="seller" />
  </div>
</template>

<script>
export default {
  props: ["seller"]
};
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  overflow-y: scroll;
}
</style>