import axios from 'axios'

import entityDetails from '../helpers/entityDetails'

let _build 
async function getBuild() {
  if (_build) {
    return _build
  }
  const url = new URL('build.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  _build = res.data
  return res.data
}

export async function getVideos() {
  const data = await getBuild()
  const videos = data.videos.entities.map(entityDetails('videos'))
  return videos
}

export async function getArticles() {
  const data = await getBuild()
  const articles = data.articles.entities.map(entityDetails('articles'))
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

export async function getEntity(slug) {
  const entities = await allEntities()
  const entity = entities.find(entity => entity.slug === slug)
  const url = new URL(entity.indexPath, process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  return {
    ...entity,
    markdown: res.data, 
  }
}


let all 
export async function allEntities() {
  if (all) {
    return all
  }
  const data = await getBuild()
  all = []
  for (const section in data) {
    all.push(...data[section].entities.map(e => ({...e, type: section})))
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

export async function getFeaturedEntities() {
  const url = new URL('data.json', process.env.MDX_ROOT_URL).href
  const res = await axios.get(url)
  const featured = res.data.featuredEntities
  let all = await allEntities()
  return all.filter(entity => featured.map(f => f.id).includes(entity.id))
}


