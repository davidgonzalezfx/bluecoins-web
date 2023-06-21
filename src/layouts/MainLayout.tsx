import { useEffect, useRef, useState } from 'react'
import { Navbar, Sidebar } from '../components'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !burgerRef.current?.contains(event.target as Node)
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
    <div className='flex h-screen bg-white'>
      <Sidebar isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />

      {/* Overlay */}
      {isSidebarOpen && <div className='fixed inset-0 z-10 bg-black opacity-50'></div>}

      <div className='mx-auto flex w-60 flex-grow flex-col lg:max-w-5xl'>
        <Navbar burgerRef={burgerRef} toggleSidebar={toggleSidebar} />

        <div className="h-full p-4 pt-0">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
