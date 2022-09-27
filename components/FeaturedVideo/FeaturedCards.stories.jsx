import FeaturedVideo from './index'

export default {
  title: 'FeaturedVideo',
  component: FeaturedVideo, 
}

export const Primary = () => (
  <FeaturedVideo title={"Latest Upload"} description={"What is React.js? Get started with React using Vite"} videoId={"-DTUdOJv8w8"} />
)