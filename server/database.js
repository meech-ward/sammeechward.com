import axios from 'axios'

import entityDetails from '../helpers/entityDetails'

export async function getVideos() {
  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  const videos = res.data.videos.entities.map(entityDetails('videos'))
  return videos
}

export async function getArticles() {
  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  const articles = res.data.articles.entities.map(entityDetails('articles'))
  return articles
}

export async function getVideo(slug) {
  const videos = await getVideos()
  const video = videos.find(video => video.slug === slug)
  const url = new URL(video.indexPath, process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return {
    ...video,
    markdown: res.data
  }
}

export async function getArticle(slug) {
  const articles = await getArticles()
  const article = articles.find(article => article.slug === slug)
  const url = new URL(article.indexPath, process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return {
    ...article,
    markdown: res.data, 
  }
}

export async function allEntities() {
  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  let all = []
  for (const section in res.data) {
    all.push(...res.data[section].entities.map(e => ({...e, type: section})))
  }
  all = all
  .flat()
  .map(entity => entityDetails(entity.type, entity))

  all.sort((a, b) => new Date(b.date) - new Date(a.date))

  return all
}

export async function searchForEntities(term) {
  let all = await allEntities()
  all = all.filter(entity => (
    entity.title.toLowerCase().includes(term.toLowerCase()) ||
    entity.description.toLowerCase().includes(term.toLowerCase()) ||
    entity.tags?.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
  ))
  return all
}

