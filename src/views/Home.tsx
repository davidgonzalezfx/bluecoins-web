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
import TransactionsTable from '../components/TransactionsTable/TransactionsTable'

const transactions = [
  {
    columns: ['date', 'amount', 'itemName'],
    values: [
      ['2023-06-01 00:02:05', 7247990360000, 'Globant'],
      ['2023-06-02 08:00:22', -1406000000000, 'Hbtn payment'],
      ['2023-06-02 08:00:22', 1406000000000, 'Hbtn payment'],
      ['2023-06-02 09:00:48', -1100000000000, 'Arriendo'],
      ['2023-06-07 11:00:29', -52680000000, 'Recibo agua'],
      ['2023-06-07 11:05:10', -24790000000, 'Recibo agua Zuame'],
      ['2023-06-07 11:10:38', -217066000000, 'Medicina prepagada'],
      ['2023-06-07 12:00:10', -47700000000, 'Admin Zuame'],
      ['2023-06-07 12:05:14', -24830000000, 'Recibo gas'],
      ['2023-06-07 12:10:12', -2610000000, 'Recibo gas Zuame'],
      ['2023-06-07 12:15:36', -81300000000, 'Internet Claro'],
      ['2023-06-09 12:00:50', -1288938000000, 'Credit card monthly payment'],
      ['2023-06-09 12:00:50', 1288938000000, 'Credit card monthly payment'],
      ['2023-06-27 12:00:01', -33000000000, 'Recibo luz']
    ]
  }
]

const Home = () => {
  useTitle('Home')

  const [activeTab, setActiveTab] = useState(1)

  const tabs = [
    { icon: <MdOutlineDashboard />, title: 'Main Dashboard' },
    // { icon: <MdList />, title: 'Transactions' },
    { icon: <MdList />, title: <TransactionsTable transactions={transactions} /> },
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
            className={`flex h-10 w-10 items-center justify-center transition-colors  ${
              index === activeTab ? 'border-b border-blue-500 text-blue-500' : 'text-gray-600'
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
