<template>
  <div id="app">
    <nav-bar />
    <transition name="fade" mode="out-in">
      <keep-alive include="Games">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
  mounted() {
    smoothscroll.polyfill();
  }
};
</script>

<style lang="less">
::-webkit-scrollbar {
  width: 0.5vw;
  height: 16px;
  background-color: #ffffff;
}
::-webkit-scrollbar-track {
  box-shadow: none;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

html,
body {
  background: rgb(245, 245, 245) !important;
}
</style>
