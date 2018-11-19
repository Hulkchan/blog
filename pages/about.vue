<template lang="html">
  <section class="page-about">
    <h2 class="about-title">关于我</h2>
    <div class="text-show">
      <vue-typer 
        :text="typerText"
        erase-style='backspace'
        :erase-delay='50'
        :repeat='0'
        v-if="isShow" 
        class="vueTyper"/>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'about',
  data() {
    return {
      typerText: ['我是一个前端工程师', '我是一个程序员', '我是一个敲代码的'],
      isShow: false
    }
  },
  mounted() {
    var VueTyperPlugin = require('vue-typer').default
    Vue.use(VueTyperPlugin)
    this.isShow = true
  },
}
</script>
<style lang='scss'>
.about-title{
  font-size: 30px;
  font-weight: 500;
  margin: 70px 0 10px;
  color: #41b883;
  // text-shadow: 2.5px 1px 0px #37986d;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: calc(100% - 10px);
    background-color: #41b883;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -20px;
  }
}
.vueTyper {
  font-size: 56px;
}
.vue-typer .custom.char.typed {
  color: #333;
}
.text-show {
  padding: 100px 0;
  text-align: center;
}
</style>
