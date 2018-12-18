<template lang="html">
  <header>
    <div class="header-container clearfix">
      <div class="logo fl">
        <nuxt-link to="/">
          <img
            src="http://cdn.chenqihulk.cn/logo.png"
            alt="HULK BLOG">
        </nuxt-link>
      </div>
      <nav class="navbar fr">
        <ul class="navbar-nav clearfix">
          <li>
            <nuxt-link to="/">首页</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/tags">标签</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">关于我</nuxt-link>
          </li>
          <li>
            <a href="http://resume.chenqihulk.cn/" target="_blank">简历</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PcHeader',
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped='scoped'>
header {
  padding: 0 50px;
  height: 70px;
  border-bottom: 1px solid #dcdcdc;
  position: fixed;
  z-index: 1000;
  width: 100%;
  background-color: #fff;
}
.header-container {
  height: 100%;
  width: 100%;
  .logo {
    vertical-align: middle;
    img {
      height: 70px;
    }
  }
  .navbar {
    float: right;
    line-height: 70px;
    .navbar-nav {
      margin: 0;
    }
    .navbar-nav > li {
      float: left;
      margin-left: 20px;
      a {
        text-decoration: none;
        line-height: 1.5;
        color: #3a3a3a;
        display: inline;
        position: relative;
        &:hover {
          color: #41b883;
        }
        &:before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 0;
          height: 1px;
          background: #41b883;
          transition: width 0.25s ease;
        }
        &:hover:before {
          width: 100%;
        }
      }
      .nuxt-link-exact-active {
        color: #41b883;
      }
    }
  }
}
</style>
