<template>
  <div>
    <pc-header/>
    <main>
      <nuxt/>
    </main>
    <scoll-top/>
  </div>
</template>

<script>
import pcHeader from '@/components/layout/pc-header'
import scollTop from '@/components/layout/scollTop'

export default {
  components: {
    pcHeader,
    scollTop
  }
}</script>

<style lang='scss' scoped='scoped'>
main {
  width: 700px;
  margin: 0 auto;
  padding-top: 70px;
}
</style>
