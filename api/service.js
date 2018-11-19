import fetch from './request'

// 获取文章列表
export function getArticles(data) {
  return fetch({
    url: '/getArticle',
    method: 'post',
    data
  })
}

// 通过ID获取文章内容
export function getArticleById(data) {
  return fetch({
    url: `/article/${data.id}`,
    method: 'get'
  })
}

// 喜欢文章
export function likeArticle(data) {
  return fetch({
    url: `/like`,
    method: 'post',
    data
  })
}

// 获取标签
export function getTags(data) {
  return fetch({
      url: `/tag?current_page=${data.current_page}&&page_size=${data.page_size}&&keyword=${data.keyword}`,
      method: 'get'
  })
}