import TabsWithSections from './index'

export default {
  title: 'TabsWithSections',
  component: TabsWithSections, 
  argTypes: {
    onChange: { action: 'onChange' },
  },
}

const tabs = [
  { name: 'My Account', current: false, children: <div>My Account</div> },
  { name: 'Company', current: false, children: <div>Company</div> },
  { name: 'Team Members', current: true, children: <div>Team Members</div> },
  { name: 'Billing', current: false, children: <div>Billing</div> },
]

export const Primary = (args) => (
  <TabsWithSections 
  tabs={tabs}
  {...args}
  />
)