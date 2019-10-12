<template>
  <div class="sixteen wide mobile six wide tablet four wide computer column">
    <div class="ui card link" @click="openURL">
      <div class="image">
        <img :src="game.cover" />
      </div>
      <div class="content">
        <div class="header">
          <span :title="game.title">{{ game.title }}</span>
        </div>
        <div class="meta">
          <span :title="game.j_title">{{ game.j_title }}</span>
        </div>
      </div>
      <!--<div class="extra content">
        <div class="lables">
          <div
            v-for="tag in game.tag.split('/')"
            :key="tag"
            class="ui tag label"
          >
            {{ tag }}
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: ["game"],
  methods: {
    openURL() {
      const id = this.game.id;
      this.$router.push({ name: "detail", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 100% !important;
}

.image {
  height: 20vh;
  overflow: hidden;

  img {
    object-fit: cover;
    height: 100% !important;
  }
}

.tag {
  margin: 2px auto;
}

.header,
.meta {
  display: block;
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
