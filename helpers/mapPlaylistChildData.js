import {
  PlayIcon,
  DocumentTextIcon,
  Bars3BottomLeftIcon
} from '@heroicons/react/24/outline'

export default function mapPlaylistChildData({child, slug, playlistSlug}) {
  if (child.section) {
    const sectionSlug = child.section.replace(/\s+/g, '-').toLowerCase()
    return {
      ...child,
      type: 'section',
      slug: sectionSlug,
      name: child.section,
      href: `/playlists/${playlistSlug}#${sectionSlug}`,
      icon: Bars3BottomLeftIcon,
      children: child.children.map(child => mapPlaylistChildData({child, slug, playlistSlug})),
      current: false,
    }
  }
  console.log(slug, playlistSlug, `/${child.slug}?playlist=${playlistSlug}`)
  return {
    ...child,
    name: child.title,
    href: `/${child.slug}?playlist=${playlistSlug}`,
    icon: child.type === 'video' ? PlayIcon : DocumentTextIcon,
    current: child.slug === slug,
  }
}