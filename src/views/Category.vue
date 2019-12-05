<template>
  

  <div class="ui grid container">
    <div class="holder" style="height: 8em"></div>
    <div class="sixteen wide column">
      <div class="ui icon message">
        <i class="notched circle loading icon"></i>
        <div class="content">
          <div class="header">搜索</div>
          <p>你可以在这里搜索到任何你想要的东西（前提是这里有）~</p>
        </div>
      </div>
    <div id="search-input">
    <form class="input-group" autocomplete="off" action="/games">
        <input maxlength="80" type="search" id="search-field" name="s" class="form-input input-lg" placeholder="请输入关键字...." required>
        <button class="btn btn-primary input-group-btn btn-lg" type="submit">搜索</button>
    </form>
    </div>
    </div>
  </div>
</template>
<style>
   #search-input .btn{
        background: #727e96;
        border-color: #727e96;
        color: #fff;
    }
    .input-group .form-input:first-child:not(:last-child), .input-group .form-select:first-child:not(:last-child), .input-group .input-group-addon:first-child:not(:last-child), .input-group .input-group-btn:first-child:not(:last-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
    .input-group {
  display: flex;
  display: -ms-flexbox;
    }
    .input-group .form-input, .input-group .form-select {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
    }
    .form-input.input-lg {
  font-size: .9rem;
  height: 3rem;
  padding: .35rem .6rem;
    }
    .form-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  background-image: none;
  border: .05rem solid #caced7;
  border-radius: .1rem;
  color: #50596c;
  display: block;
  font-size: .8rem;
  height: 1.8rem;
  line-height: 1.2rem;
  max-width: 100%;
  outline: 0;
  padding: .25rem .4rem;
  position: relative;
  transition: all .2s ease;
  width: 100%;
    }
    #search-input .btn, #disqus_click_btn, #disqus-switch-to-direct, #disqus-loadmore-button {
  background: #727e96;
  border-color: #727e96;
  color: #fff;
}
.input-group .form-input:last-child:not(:first-child), .input-group .form-select:last-child:not(:first-child), .input-group .input-group-addon:last-child:not(:first-child), .input-group .input-group-btn:last-child:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  margin-left: -.05rem;
}
.btn.btn-lg {
  font-size: 1.3rem;
  height: 3rem;
  padding: .35rem .6rem;
}
.btn.btn-primary {
  background: #5755d9;
  border-color: #4b48d6;
  color: #fff;
}
.btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border: .05rem solid #5755d9;
  border-radius: .1rem;
  color: #5755d9;
  cursor: pointer;
  display: inline-block;
  font-size: .8rem;
  height: 1.8rem;
  line-height: 1.2rem;
  outline: 0;
  padding: .25rem .4rem;
  text-align: center;
  text-decoration: none;
  transition: all .2s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
</style>
