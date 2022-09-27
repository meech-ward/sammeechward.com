import '../styles/globals.css'
import Header from '../components/Header'

import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const links = [
    {title: 'Articles', href: '/articles', selected: router.pathname.startsWith('/articles')},
    {title: 'Videos', href: '/videos', selected: router.pathname.startsWith('/videos')},
    {title: 'Learning Paths', href: '/learning-paths', selected: router.pathname.startsWith('/learning-paths')},
    {title: 'Courses', href: '/courses', selected: router.pathname.startsWith('/courses')},
  ]

  const onSearch = term => {
    console.log(term)
  }

  return (
    <>
      <Header links={links} onSearch={onSearch}></Header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
