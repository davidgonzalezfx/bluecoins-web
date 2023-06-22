import { useEffect, useState } from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      document.getElementById('root')?.classList.add('dark')
    } else {
      document.getElementById('root')?.classList.remove('dark')
    }
  }, [])

  const handleThemeToggle = () => {
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode))
    document.getElementById('root')?.classList.toggle('dark')
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button
      className={`border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brandLinear dark:bg-[#4a5568]`}
      onClick={handleThemeToggle}
    >
      <div className='cursor-pointer '>
        {isDarkMode ? (
          <RiSunFill className='h-4 w-4 text-white' />
        ) : (
          <RiMoonFill className='h-4 w-4 text-white' />
        )}
      </div>
    </button>
  )
}

export default ToggleTheme
