<template>
  <div class="ui container">
    <div class="holder" style="height: 8em"></div>
    <div class="ui raised segment" id="main">
      <h1>添加游戏</h1>
      <div class="ui section divider"></div>
      <!-- <h2 style="color:red">公告：功能暂时还未实现，请等待更新（咕咕咕~</h2> -->
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
          <input type="text" name="title" v-model="game.title" />
          <sui-label v-if="errors.title" basic color="red" pointing>标题不得为空！</sui-label>
        </sui-form-field>
        <sui-form-field>
          <label>日文名</label>
          <input type="text" v-model="game.j_title" />
        </sui-form-field>
        <sui-form-field>
          <label>类型</label>
          <select v-model="game.caregory">
            <option v-for="a in archiveList" :key="a.key" v-bind:value="a.key">{{ a.value }}</option>
          </select>
        </sui-form-field>
        
        <sui-form-field>
          <label>标签（/分隔）</label>
          <input type="text" v-model="game.tags" />
        </sui-form-field>
        <sui-form-field>
          <label>封面(请填写url地址)</label>
          <!-- <input
            type="file"
            @change="updateCover($event)"
            accept="image/png, image/jpeg, image/bmp"
          />-->
          <input type="text" v-model="game.cover" />
        </sui-form-field>
        <sui-form-field>
          <label>描述</label>
          <sui-tab>
            <!-- <sui-tab-pane title="Markdown">
              <textarea v-model="game.description"></textarea>
            </sui-tab-pane>
            <sui-tab-pane title="预览">
              <vue-markdown id="markdown" :source="game.description" />
            </sui-tab-pane>-->

            <vue-simplemde preview-class="markdown-body" v-model="game.description" />
          </sui-tab>
        </sui-form-field>
        <sui-form-field>
          <label>下载地址</label>
          <textarea v-model="game.download" rows="2"></textarea>
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
import VueSimplemde from "vue-simplemde";

export default {
  components: { VueSimplemde },
  created(){
      fetch("https://api.ero.ink/api/v1/category/", {
      method: "get",
      mode: "cors",
      credentials: "include",
      headers: {
        //  "Authorization": "Bearer "+jwt,
        //  'Content-Type': 'multipart/form-data',
      }
    })
      .then(data => data.json())
      .then(data => {
        
        if (data.status == 0 ) {
          data.data.forEach(Element => {
            console.log(Element);
            if (Element.type == 2) {
              // psss不管他
            } else if (Element.type == 1) {
              this.archiveList.push({ key: Element.id, value: Element.title });
            }
          });
        }
      });
    },
  methods: {
    updateCover(event) {
      var img = event.target.files[0];

      var imgform = new FormData();
      
      imgform.append("type", "img");
      imgform.append("file", img, img.filename);
      function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim();
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
      }
      let jwt = getCookie("token");
      fetch("https://api.ero.ink/api/v1/upload/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + jwt
          //  'Content-Type': 'multipart/form-data',
        },
        body: imgform
      })
        .then(data => data.json())
        .then(data => {
          if (data.status == 0) {
          alert(
            "上传成功；地址：https://api.ero.ink/img/" + data.data.filename
          );
        } else {
          alert("上传失败！");
        }
        });
    },
    submit() {
      this.isUploading = true;
      // this.errors.title = !this.game.title;
      // for (var i in this.errors) {
      //   if (this.errors[i]) {
      //     this.isUploading = false;
      //     return null;
      //   }
      // }
      
      // upload here
      function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim();
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
      }
      var archiveform = new FormData();
      archiveform.append("title",this.game.title);
      archiveform.append("j_title",this.game.j_title);
      archiveform.append("tags",this.game.tags);
      archiveform.append("cover",this.game.cover);
      archiveform.append("description",this.game.description);
      archiveform.append("download",this.game.download);
      let jwt = getCookie("token");
      fetch("https://api.ero.ink/api/v1/archive/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + jwt
          //  'Content-Type': 'multipart/form-data',
        },
        body: archiveform
      })
        .then(data => data.json())
        .then(data => {
          if (data.status == 0) {
          alert(
            "上传成功；地址：https://api.ero.ink/img/" + data.data.filename
          );
        } else {
          alert("上传失败！");
        }
        });
      this.isUploading = false;
      return null;
    }
  },
  data() {
    return {
      archiveList: [],
      game: {
        title: "",
        j_title: "",
        tags: "",
        cover: "",
        description: "",
        download: "",
        caregory:0,
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
<style>
@import "~simplemde/dist/simplemde.min.css";
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
