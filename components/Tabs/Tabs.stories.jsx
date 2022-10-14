import Tabs from './index'

export default {
  title: 'Tabs',
  component: Tabs, 
  argTypes: {
    onChange: { action: 'onChange' },
  },
}

const tabs = [
  { name: 'My Account', current: false },
  { name: 'Company', current: false },
  { name: 'Team Members', current: true },
  { name: 'Billing', current: false },
]

export const Primary = (args) => (
  <Tabs 
  tabs={tabs}
  {...args}
  />
)