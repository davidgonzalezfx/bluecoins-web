import { useLocation } from 'react-router-dom'

import {
  MdOutlineDashboard,
  MdOutlineCalendarMonth,
  MdOutlineShoppingBasket,
  MdOutlineAccountBalance,
  MdOutlineBookmarks,
  MdOutlineDeleteOutline,
  MdOutlineSettings
} from 'react-icons/md'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { icon: <MdOutlineDashboard />, title: 'Main Dashboard', path: '/' },
    { icon: <MdOutlineCalendarMonth />, title: 'Calendar', path: '/calendar' },
    { icon: <MdOutlineShoppingBasket />, title: 'Categories & Budget', path: '/categories' },
    { icon: <MdOutlineAccountBalance />, title: 'Accounts Setup', path: '/accounts' },
    { icon: <MdOutlineBookmarks />, title: 'Labels', path: '/labels' },
    { icon: <MdOutlineDeleteOutline />, title: 'Trash', path: '/trash' },
    { icon: <MdOutlineSettings />, title: 'Settings', path: '/settings' }
  ]

  return (
    <div className={`fixed z-20 h-screen w-80 bg-white text-gray-800 shadow-lg`}>
      {/* Sidebar header with logo */}
      <div className='flex h-32 flex-col  justify-end bg-blue-500 p-4 text-white'>
        <h2 className='text-xl font-bold'>Bluecoins web version</h2>
        <p className='text-xs'>www.github.com/davidgonzalezfx/bluecoins-web</p>
      </div>

      {/* Sidebar content */}
      <ul className='py-4 '>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-4 px-4 py-2 ${
              item.path === location.pathname ? 'text-blue-500' : ''
            }`}
          >
            {item.icon}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
