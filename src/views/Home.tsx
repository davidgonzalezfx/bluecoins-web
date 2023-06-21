import { useState } from 'react'
import {
  MdOutlineDashboard,
  MdList,
  MdOutlineShoppingBasket,
  MdAlarm,
  MdOutlineAssignment,
  MdOutlineAccountBalance,
  MdOutlineStyle,
  MdOutlineBookmarks
} from 'react-icons/md'

import { useTitle } from '../hooks'
const Home = () => {
  useTitle('Home')

  const [activeTab, setActiveTab] = useState(1)

  const tabs = [
    { icon: <MdOutlineDashboard />, title: 'Main Dashboard' },
    { icon: <MdList />, title: 'Transactions' },
    { icon: <MdOutlineShoppingBasket />, title: 'Budget Summary' },
    { icon: <MdAlarm />, title: 'Reminders' },
    { icon: <MdOutlineAssignment />, title: 'Net Earning' },
    { icon: <MdOutlineAccountBalance />, title: 'Balance Sheet' },
    { icon: <MdOutlineStyle />, title: 'Items Summary' },
    { icon: <MdOutlineBookmarks />, title: 'Labels' }
  ]

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-8 flex space-x-4 text-2xl'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors  ${
              index === activeTab ? 'text-blue-500' : ' text-gray-600'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {tabs[activeTab].title}
    </div>
  )
}

export default Home
