import Hero from './index'
import toilet from '../../public/toilet.jpg'

export default {
  title: 'Hero',
  component: Hero, 
}

export const Primary = () => (
  <Hero 
  title={"Sam Meech-Ward"} 
  subTitle={'"Fart Noise"'} 
  description={"Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua."} 
  imageUrl={toilet}
  buttons={[
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ]}
  />
)