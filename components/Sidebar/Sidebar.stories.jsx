import SideBar from './index'

import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default {
  title: 'SideBar',
  component: SideBar, 

  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    current: {
      options: ['None', 'Articles', 'Videos'],
      control: { type: 'radio' },
      defaultValue: 'None',
    },
    onSearch: { action: 'search' },
  }
}

const links = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

export const Primary = (args) => (
  <SideBar {...args} navigation={links.map(link => ({
    ...link,
    current: link.title === args.current
  }))} />
)


export const Children = (args) => (
  <SideBar {...args} navigation={links.map(link => ({
    ...link,
    current: link.title === args.current
  }))}>
    <div className="p-4">
      <h2 className="text-2xl font-bold">Children</h2>
      <p className="text-gray-500">This is a child component</p>
    </div>

    </SideBar>
)
