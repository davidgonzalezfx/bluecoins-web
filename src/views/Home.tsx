import { useEffect, useState } from 'react'
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
import TransactionsTable from '../components/TransactionsTable/TransactionsTable'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { icon: <MdOutlineDashboard />, content: 'Main Dashboard' },
  { icon: <MdList />, content: <TransactionsTable /> },
  { icon: <MdOutlineShoppingBasket />, content: 'Budget Summary' },
  { icon: <MdAlarm />, content: 'Reminders' },
  { icon: <MdOutlineAssignment />, content: 'Net Earning' },
  { icon: <MdOutlineAccountBalance />, content: 'Balance Sheet' },
  { icon: <MdOutlineStyle />, content: 'Items Summary' },
  { icon: <MdOutlineBookmarks />, content: 'Labels' }
]

const Home = () => {
  useTitle('Home')
  const [activeTab, setActiveTab] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const jsonDatabase = localStorage.getItem('transactions')

    if (!jsonDatabase) {
      navigate('/upload')
    }
  }, [navigate])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-8 flex space-x-4 text-2xl'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex h-10 w-10 items-center justify-center transition-colors  ${
              index === activeTab
                ? 'border-b border-blue-500 text-blue-500 dark:border-[#F2F3F3] dark:text-[#F2F3F3]'
                : 'text-darkGray'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {tabs[activeTab].content}
    </div>
  )
}

export default Home
