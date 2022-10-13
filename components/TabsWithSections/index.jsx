import Tabs from "../Tabs";

import { useEffect, useState } from "react";

export default function TabsWithSections(props) {
  const [tabs, setTabs] = useState(props.tabs)
  useEffect(() => {
    setTabs(props.tabs)
  }, [props.tabs])

  const [selection, setSelection] = useState(tabs.find((tab) => tab.current).name)

  const handleChange = (name) => {
    setSelection(name)
    setTabs(tabs.map((tab) => ({ ...tab, current: tab.name === name })))
  }

  return (
    <div>
      <Tabs tabs={tabs} onChange={handleChange} />
      {tabs.find((tab) => tab.current).children}
    </div>
  )
}