<template>
  <section class="pcHome">
    <div class="pcHome-container">
      <div class="tag-title" v-if="tagTitle">{{ tagTitle }}</div>
      <ul v-if="articleList.length!==0">
        <li 
          v-for="article in articleList" 
          :key="article._id">
          <article class="article-item">
            <p class="article-date">
              <nuxt-link 
                :to="`/article/${article._id}`" 
                class="article_link">
                {{ article.created_at | parseTime('{y}-{m}-{d}') }}
              </nuxt-link>
            </p>
            <h2 class="article-title">
              <nuxt-link 
                :to="`/article/${article._id}`" 
                class="article_link">
                {{ article.title }}
              </nuxt-link>
            </h2>
            <div class="article_tags">
              <div 
                v-for="(item, index) in article.tag"
                :key="index"
                class="article_tag">{{ item.name }}</div>
            </div>
            <p class="article-description">
              <nuxt-link 
                :to="`/article/${article._id}`" 
                class="article_link">
                {{ article.description | text(74) }}
              </nuxt-link>
            </p>
            <aside class="article_tools">
              <div 
                :class="isLiked(article._id)?'isLike':''"
                class="like tools_item">
                <i 
                  class="iconfont icon-like like" 
                  @click="likeArticle(article)"/>
                <span>{{ article.meta.likes || 0 }}</span>
              </div>
              <div class="view tools_item">
                <i 
                  class="iconfont icon-view" />
                <span>{{ article.meta.views || 0 }}</span>
              </div>
            </aside>
          </article>
        </li>
      </ul>
      <div class="article-null"
           v-if="articleList.length===0">
        暂无属于该标签的文章
      </div>
    </div>
  </section>
</template>

<script>
import { getArticles, likeArticle } from '@/api/service'

export default {
  name: 'HomePage',
  data() {
    return {
      articleList: [],
      likeArticles: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tagTitle: '',
      form: {
        tag: ''
      }
    }
  },
  mounted() {
    this.init()
    const id = this.$route.query.id
    const name = this.$route.query.name
    if(id) {
      this.form.tag = id
      this.tagTitle = name
      this.getArticles()
    } else {
      this.getArticles()
    }
  },
  methods: {
    getArticles() {
      const params = {
        current_page: this.currentPage,
        page_size: this.pageSize,
        tag: this.form.tag
      }
      getArticles(params).then(res => {
        if (res.code === 1) {
          this.articleList = res.result.list
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
  },
  watch: {
    '$route.query': function (params) {
      this.form.tag = ''
      this.tagTitle = ''
      this.getArticles()
    }
  }
}
</script>

<style lang='scss' scoped='scoped'>
.pcHome-container {
  .tag-title{
    font-size: 20px;
    color: #fff;
    background-color: #41b883;
    display: inline-block;
    padding: 2px 20px;
    margin: 50px 0 0
  }
  .article_link {
    text-decoration: none;
  }
  .article-item {
    padding: 70px 0 20px;
    border-bottom: 1px solid #f3f3f3;
    .article-date {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      margin-bottom: 20px;
      & > .article_link {
        color: #41b883;
        font-size: 20px;
      }
    }
    .article-title {
      margin-bottom: 10px;
      & > .article_link {
        color: #000;
        opacity: 1;
        transition: opacity 0.25s ease;
        &:hover {
          opacity: 0.6;
        }
      }
    }
    .article_tags {
      margin-bottom: 20px;
    }
    .article_tag {
      display: inline-block;
      padding: 2px 6px;
      color: #fff;
      background-color: #41b883;
    }
    .article-description {
      line-height: 28px;
      margin-bottom: 30px;
      & > .article_link {
        color: #999;
      }
    }
    .article_tools {
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
  .article-null{
    font-size: 20px;
    padding: 30px 0;
    color: #999;
  }
}
</style>
