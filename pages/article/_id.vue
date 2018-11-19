<template lang="html">
  <section class="article_details">
    <div class="article-wrap">
      <h3 class="article-title">
        {{ article.title }}
      </h3>
      <div class="article-control clearfix">
        <span class="article-date">{{ article.created_at }}</span>
        <div class="article-control--right fr">
          <div
            :class="isLiked(article._id)?'isLike':''" 
            class="like tools_item">
            <i 
              class="iconfont icon-like like" 
              @click="likeArticle(article)"/>
            <span>{{ article.meta ? article.meta.likes : 0 }}</span>
          </div>
          <div class="view tools_item">
            <i 
              class="iconfont icon-view" />
            <span>{{ article.meta ? article.meta.views : 0 }}</span>
          </div>
        </div>
      </div>
      <div 
        class="markdown-content" 
        v-html="articleContent"/>
    </div>
  </section>
</template>

<script>
import markdown from '~/plugins/marked'
import { getArticleById, likeArticle } from '@/api/service'

export default {
  data() {
    return {
      article: {},
      likeArticles: []
    }
  },
  computed: {
    articleContent() {
      return markdown(this.article.content, false, true).html
    }
  },
  mounted() {
    this.getArticleById()
    this.init()
  },
  methods: {
    getArticleById() {
      let params = {
        id: this.$route.params.id
      }
      getArticleById(params).then(res => {
        if (res.code === 1) {
          this.article = res.result
        }
      })
    },
    isLiked(id) {
      return this.likeArticles.includes(id)
    },
    likeArticle(row) {
      // 如果已经喜欢不能重复点击
      if (this.isLiked(row._id)) {
        return
      }
      let params = {
        _id: row._id
      }
      likeArticle(params).then(res => {
        if (res.code === 1) {
          row.meta.likes += 1
          this.likeArticles.push(row._id)
          localStorage.setItem(
            'LIKE_ARTICLES',
            JSON.stringify(this.likeArticles)
          )
        }
      })
    },
    // 初始化
    init() {
      this.likeArticles = JSON.parse(
        localStorage.getItem('LIKE_ARTICLES') || '[]'
      )
    }
  }
}
</script>
<style lang='scss' scoped='scoped'>
.article_details {
  .article-title {
    padding: 70px 0 20px 0;
    font-size: 34px;
  }
  .article-control {
    margin-bottom: 30px;
  }
  .article-date {
    color: #999;
  }
  .article-control--right{
    .tools_item{
      color: #999;
      display: inline-block;
      margin-right: 14px;
    }
    .like {
      i {
        cursor: pointer;
      }
      &.isLike {
        color: #be477c;
        i {
          color: #be477c;
        }
      }
    }
  }
}
</style>
