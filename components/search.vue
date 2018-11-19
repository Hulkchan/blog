<template lang='html'>
    <div class="hulk-search"
        :class="[
            inputSize ? 'hulk-search--' + inputSize : '',
            focused ? 'focused' : ''
        ]">
        <i class="iconfont icon-search"></i>
        <input type="text" 
               placeholder="搜索标签..."
               @input="handleInput" 
               @focus="handleFocus"
               @blur="handleBlur"
               :value="currentValue">
    </div>
</template>

<script>
export default {
    props: {
        inputSize: {
            type: String,
            default: 'primary'
        },
        value: [String, Number]
    },
    name: 'search',
    data() {
        return {
            currentValue: this.value === undefined || this.value === null
            ? ''
            : this.value,
            focused: false
        }
    },
    methods: {
        handleFocus() {
            this.focused = true;
        },
        handleBlur() {
            this.focused = false;
        },
        handleInput(event) {
            const value = event.target.value;
            this.currentValue = value
            this.$emit('input', value)
        }
    }
}

</script>
<style lang='scss' scoped='scoped'>
.hulk-search{
    margin: 20px 0;
    border-radius: 3px;
    display: flex;
    align-items: center;
    position: relative;
    &:after{
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background-color: #41b883;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: width 0.3s ease;
    }
    &.focused{
        &:after{
            width: 100%;
        }
    }
    input{
        outline: none;
        border: 0;
        height: 100%;
        padding: 0 15px;
        flex: 1;
        font-size: 30px;
    }
    ::-webkit-input-placeholder{
        color: #999;
        font-size: 30px;
    }
    .iconfont{
        font-size: 30px;
        color: #999;
    }
}
.hulk-search--primary{
    height: 60px;
}
</style>