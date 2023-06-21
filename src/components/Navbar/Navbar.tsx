import { RefObject } from 'react'

const Navbar = ({
  burgerRef,
  toggleSidebar
}: {
  burgerRef: RefObject<HTMLButtonElement>
  toggleSidebar: () => void
}) => {
  return (
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
  )
}

export default Navbar
