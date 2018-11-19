<template lang="html">
  <transition-group 
    v-if="$route.path !== '/'" 
    tag="div" 
    name="fade" 
    class="scoll-aside">
    <a 
      v-if="showScroll" 
      key="1" 
      class="scoll-btn" 
      @click="scrollTop">
      <img 
        src="../../assets/toTop.png" 
        class="topImg">
        <!-- <i class="iconfont icon-arrow-up"/> -->
    </a>
  </transition-group>
</template>

<script>
export default {
  name: 'Scoll',
  data() {
    return {
      showScroll: false,
      theme: 'light'
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (this.getScrollTop() * 2 > this.getWindowHeight()) {
        this.showScroll = true
      } else this.showScroll = false
    })
  },
  methods: {
    scrollTop() {
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 150
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    },
    // 滚动条在Y轴上的滚动距离
    getScrollTop() {
      let scrollTop = 0
      let bodyScrollTop = 0
      let documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop
      return scrollTop
    },
    getWindowHeight() {
      let windowHeight = window.innerHeight
      return windowHeight
    }
  }
}
</script>
<style lang='scss' scoped='scoped'>
.scoll-aside {
  position: fixed;
  right: 14px;
  bottom: 3rem;

  > .scoll-btn {
    display: block;
    margin-bottom: 0.5rem;
    background: $module-bg;
    text-align: center;
    line-height: 2.7rem;
    cursor: pointer;

    &.theme {
      color: $black;

      i {
        font-size: $font-size-large;
      }
    }

    &.email {
      color: #d9544e;
    }
  }

  &.mobile {
    width: 3rem;
    right: 0rem;
    bottom: 3rem;

    > .scoll-btn {
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
    }
  }
  .topImg {
    width: 40px;
  }
}
</style>
