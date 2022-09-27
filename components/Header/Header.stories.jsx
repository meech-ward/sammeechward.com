import { within, userEvent } from '@storybook/testing-library';

import Header from './index'

export default {
  title: 'Header',
  component: Header, 

  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    selected: {
      options: ['None', 'Articles', 'Videos'],
      control: { type: 'radio' },
      defaultValue: 'None',
    },
    onSearch: { action: 'search' },
  }
}

const links = [
  {title: 'Articles', href: '#', selected: false},
  {title: 'Videos', href: '#', selected: false}
]

export const Primary = (args) => (
  <Header {...args} links={links.map(link => ({
    ...link,
    selected: link.title === args.selected
  }))} />
)

export const Searching = (args) => (
  <Header {...args} links={links.map(link => ({
    ...link,
    selected: link.title === args.selected
  }))} />
)

Searching.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const search = await canvas.getByTestId('search', { name: /search/i });
  await userEvent.type(search, 'some test search')
  await userEvent.keyboard('{enter}')
};