<template lang='html'>
    <section class='page-tags'>
        <hulk-search v-model="keyword" @keyup.enter.native="getTags" :value="keyword"></hulk-search>
        <div class="tags_wrap" v-if="tagList.length !== 0">
            <hulk-tag v-for="tag in tagList"
                      :key="tag.id"
                      style="cursor:pointer"
                      @click="linkTag(tag)">{{ tag.name }}</hulk-tag>
        </div>
        <div class="tags_wrap tags-null" v-if="tagList.length === 0">
            <span>暂无符合条件的标签</span>
        </div> 
    </section>
</template>

<script>
import hulkTag from '@/components/tag'
import hulkSearch from '@/components/search'
import {
    getTags
} from '@/api/service'

export default {
    components: {
        hulkTag,
        hulkSearch
    },
    data() {
        return {
            tagList: [],
            keyword: ''
        }
    },
    mounted() {
        this.getTags()
    },
    methods: {
        getTags() {
            let params = {
                current_page: 1,
                page_size: 9999,
                keyword: this.keyword
            }
            getTags(params).then(res => {
                if (res.code === 1) {
                    const data = res.result.list
                    this.tagList = data
                }
            })
        },
        linkTag(tag) {
            this.$router.push({
                path: `/`,
                query: {
                    id: tag._id,
                    name: tag.name
                }
            })
        }
    }
}

</script>
<style lang='scss' scoped='scoped'>
.tags_wrap{
    margin: 20px 0;
    &.tags-null{
        color: #999;
    }
}
</style>