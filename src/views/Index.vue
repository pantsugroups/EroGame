<template>
  <div>
    <div class="ui center aligned container">
      <div class="holder" style="height: 35vh"></div>
      <h1 class="ui header">欢迎</h1>
      <p>在这里寻找你喜爱的Galgame！</p>
      <button
        class="huge ui right labeled icon button"
        @click="$router.push('games')"
      >
        <i class="right arrow icon"></i>
        开始探索
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
h1 {
  font-size: 4em !important;
}
p {
  font-size: 2em !important;
}
.ui.container {
  background: url("../assets/cover.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw !important;
  @media screen and (max-width: 767px) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
