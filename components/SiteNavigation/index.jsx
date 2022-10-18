import Header from '../Header'

import { useRouter } from 'next/router'

import { useSession, signIn, signOut } from "next-auth/react"

export default function SiteNavigation() {
  const router = useRouter()

  
  const { data: session } = useSession()

  const links = [
    // {title: 'Articles', href: '/articles', selected: router.pathname.startsWith('/articles')},
    // {title: 'Videos', href: '/videos', selected: router.pathname.startsWith('/videos')},
    {title: 'Videos and Articles', href: '/posts', selected: router.pathname.startsWith('/posts')},
    {title: 'Playlists', href: '/playlists', selected: router.pathname.startsWith('/playlists')},
    // {title: 'Learning Paths', href: '/learning-paths', selected: router.pathname.startsWith('/learning-paths')},
    // {title: 'Courses', href: '/courses', selected: router.pathname.startsWith('/courses')},
  ]

  const onSearch = term => {
    router.push(`/search?q=${term}`)
  }

  return (
    <Header links={links} onSearch={onSearch} user={session?.user} signIn={signIn} signOut={signOut}></Header>
  )
}