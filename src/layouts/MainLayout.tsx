// @ts-nocheck
import { useEffect, useRef, useState } from 'react'

import {
  MdOutlineDashboard,
  MdOutlineCalendarMonth,
  MdOutlineAccountBalance,
  MdOutlineSettings,
  MdOutlineDeleteOutline,
  MdOutlineBookmarks,
  MdOutlineShoppingBasket
} from 'react-icons/md'

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef(null)
  const burgerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !burgerRef.current.contains(event.target)
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed h-screen w-80 bg-white text-gray-800 ${
          isSidebarOpen ? 'z-20' : 'hidden'
        }`}
      >
        {/* Sidebar header with logo */}
        <div className='flex h-32 flex-col  justify-end bg-blue-500 p-4 text-white'>
          <h2 className='text-xl font-bold'>Bluecoins web version</h2>
          <p className='text-xs'>www.github.com/davidgonzalezfx/bluecoins-web</p>
        </div>

        {/* Sidebar content */}
        <ul className='py-4'>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineDashboard /> Main Dashboard
          </li>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineCalendarMonth />
            Calendar
          </li>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineShoppingBasket />
            Categories & Budget
          </li>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineAccountBalance />
            Accounts Setup
          </li>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineBookmarks />
            Labels
          </li>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineDeleteOutline />
            Trash
          </li>
          <li className='flex items-center gap-4 px-4 py-2'>
            <MdOutlineSettings />
            Settings
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className='fixed inset-0 z-10 bg-black opacity-50'></div>}

      {/* Main content */}
      <div className='mx-auto flex w-60 flex-grow flex-col lg:max-w-5xl'>
        {/* Navbar */}
        <nav className=' px-4 py-2'>
          <div className='flex items-center justify-between'>
            {/* Sidebar toggle */}
            <button ref={burgerRef} className='block' onClick={toggleSidebar}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#8F8F8F'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </nav>

        <div className={`h-full p-4`}>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
