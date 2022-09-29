import ArticleHero from './index'
import toilet from '../../public/toilet.jpg'

export default {
  title: 'ArticleHero',
  component: ArticleHero, 
}

export const Primary = () => (
  <ArticleHero 
  title={"Sam Meech-Ward"} 
  image={{url: toilet}}
  />
)