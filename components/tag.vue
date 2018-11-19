<template lang='html'>
    <span class="hulk_tag" 
          :class="type ? 'hulk-tag--' + type : ''"
          @click="handleClick">
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
      color: {
        type: String,
        default: '#41b883',
      },
      type: {
        type: String,
        default: 'primary',
      }
    },
    data() {
        return {}
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
}

</script>
<style lang='scss' scoped='scoped'>
.hulk_tag{
    display: inline-block;
    padding: 2px 6px;
}
.hulk_tag+.hulk_tag{
    margin-left: 10px;
}
.hulk-tag--primary{
    color: #fff;
    background-color: #41b883;
}
</style>