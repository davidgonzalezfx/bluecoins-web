import { useContext } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import {
  MdOutlineDashboard,
  MdOutlineCalendarMonth,
  MdOutlineShoppingBasket,
  MdOutlineAccountBalance,
  MdOutlineBookmarks,
  MdOutlineDeleteOutline,
  MdOutlineSettings,
  MdOutlineFileDownload,
  MdLogout
} from 'react-icons/md'
import { DatabaseContext } from '../../context'

const menuItems = [
  { icon: <MdOutlineDashboard />, title: 'Main Dashboard', path: '/', enabled: true },
  { icon: <MdOutlineCalendarMonth />, title: 'Calendar', path: '/calendar', enabled: false },
  {
    icon: <MdOutlineShoppingBasket />,
    title: 'Categories & Budget',
    path: '/categories',
    enabled: false
  },
  { icon: <MdOutlineAccountBalance />, title: 'Accounts Setup', path: '/accounts' },
  { icon: <MdOutlineBookmarks />, title: 'Labels', path: '/labels', enabled: false },
  { icon: <MdOutlineDeleteOutline />, title: 'Trash', path: '/trash', enabled: false },
  { icon: <MdOutlineSettings />, title: 'Settings', path: '/settings', enabled: false }
]

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { exportDatabase } = useContext(DatabaseContext)

  const handleExport = () => exportDatabase()

  const handleExit = () => {
    localStorage.removeItem('database')
    navigate('/upload')
  }

  return (
    <div className={`fixed z-20 h-screen w-80 bg-white text-[#a3aecf] shadow-lg dark:bg-[#333333]`}>
      {/* Sidebar header with logo */}
      <div className='flex h-32 flex-col  justify-end bg-blue-500 p-4 text-white'>
        <h2 className='text-xl font-bold'>Bluecoins web version</h2>
        {/* <p className='text-xs'>www.github.com/davidgonzalezfx/bluecoins-web</p> */}
      </div>

      {/* Sidebar content */}
      <ul className='py-4'>
        {menuItems.map((item, index) =>
          // Check if the item is enabled and has a valid path
          item.enabled && item.path ? (
            <Link to={item.path} key={index}>
              <li
                className={`flex items-center gap-4 px-4 py-2  ${
                  item.path === location.pathname
                    ? 'text-blue-500 dark:text-[#F2F3F3]'
                    : 'dark:text-darkGray'
                }`}
              >
                {item.icon}
                {item.title}
              </li>
            </Link>
          ) : (
            // Render a non-clickable item if the link is not enabled or doesn't have a path
            <li
              key={index}
              className={`flex items-center gap-4 px-4 py-2 ${
                item.path === location.pathname
                  ? 'text-blue-500 dark:text-[#F2F3F3]'
                  : 'dark:text-darkGray'
              }`}
            >
              {item.icon}
              {item.title}
            </li>
          )
        )}
      </ul>

      <div className='mx-auto w-11/12 border-t border-gray-200 dark:border-darkGray'></div>

      <ul className='py-4'>
        <button
          className='flex items-center gap-4 px-4 py-2 dark:text-darkGray'
          onClick={handleExport}
        >
          <MdOutlineFileDownload />
          <span>Export database</span>
        </button>

        <button
          className='flex items-center gap-4 px-4 py-2 dark:text-darkGray'
          onClick={handleExit}
        >
          <MdLogout />
          <span>Exit</span>
        </button>
      </ul>
    </div>
  )
}

export default Sidebar
