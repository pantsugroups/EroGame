<template>
  <div class="ui container">
    <div class="holder" style="height: 8em"></div>
    <div class="ui raised segment" id="main">
      <h1>添加游戏</h1>
      <div class="ui section divider"></div>
      <h2 style="color:red">公告：功能暂时还未实现，请等待更新（咕咕咕~</h2>
      <sui-form id="form">
        <sui-form-field>
          <label>上传附件</label>
            <input
            type="file"
            @change="updateCover($event)"
            accept="image/png, image/jpeg, image/bmp"
          />
          
        </sui-form-field>
        <sui-form-field :required="true">
          <label>游戏名</label>
          <input type="text" name="title" :value="game.title" />
          <sui-label v-if="errors.title" basic color="red" pointing
            >标题不得为空！
          </sui-label>
        </sui-form-field>
        <sui-form-field>
          <label>日文名</label>
          <input type="text" :value="game.j_title" />
        </sui-form-field>
        <sui-form-field>
          <label>标签（逗号分隔）</label>
          <input type="text" :value="game.tags" />
        </sui-form-field>
        <sui-form-field>
          <label>封面</label>
          <!-- <input
            type="file"
            @change="updateCover($event)"
            accept="image/png, image/jpeg, image/bmp"
          /> -->
          <input type="text" :value="game.cover" />
        </sui-form-field>
        <sui-form-field>
          <label>描述</label>
          <sui-tab>
            <sui-tab-pane title="Markdown">
              <textarea v-model="game.description"></textarea>
            </sui-tab-pane>
            <sui-tab-pane title="预览">
              <vue-markdown id="markdown" :source="game.description" />
            </sui-tab-pane>
          </sui-tab>
        </sui-form-field>
        <sui-form-field>
          <label>下载地址</label>
          <textarea :value="game.download" rows="2"></textarea>
        </sui-form-field>
      </sui-form>
      <sui-button
        fluid
        positive
        :loading="isUploading"
        :disabled="isUploading"
        @click="submit"
        content="创建"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components: { VueMarkdown },
  methods: {
    updateCover(event) {
      console.log(event.target.files[0]);
    },
    submit() {
      this.isUploading = true;
      this.errors.title = !this.game.title;
      for (var i in this.errors) {
        if (this.errors[i]) {
          this.isUploading = false;
          return null;
        }
      }
      this.isUploading = false;
      // upload here
      return null;
    }
  },
  data() {
    return {
      game: {
        title: "",
        j_title: "",
        tags: "",
        cover: "",
        description: "",
        download: ""
      },
      errors: {
        title: false
      },
      isUploading: false
    };
  }
};
</script>

<style lang="less" scoped>
#main {
  padding: 2em;
  margin-bottom: 5em;
}
#form {
  margin-bottom: 1em;
}
</style>

<style lang="less">
#markdown {
  min-height: 10em;

  & > p {
    //text-align: center;

    img {
      width: 90%;
      display: block;
      margin: 0 auto;
    }
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    quotes: "\201C""\201D""\2018""\2019";

    &:before {
      color: #ccc;
      content: open-quote;
      font-size: 4em;
      line-height: 0.1em;
      margin-right: 0.25em;
      vertical-align: -0.4em;
    }

    p {
      display: inline;
    }
  }
}
</style>
