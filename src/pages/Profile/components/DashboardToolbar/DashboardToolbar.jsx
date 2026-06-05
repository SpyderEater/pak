import Tabs from '../Tabs/Tabs.jsx'
import AddListingButton from '../AddListingButton/AddListingButton.jsx'
import './DashboardToolbar.css'

export default function DashboardToolbar({
  tabs,
  activeTabId,
  onTabChange,
  addListingLabel,
  addListingIcon,
}) {
  return (
    <div className="dashboard-toolbar">
      <Tabs tabs={tabs} activeTabId={activeTabId} onTabChange={onTabChange} />
      <AddListingButton label={addListingLabel} icon={addListingIcon} />
    </div>
  )
}
