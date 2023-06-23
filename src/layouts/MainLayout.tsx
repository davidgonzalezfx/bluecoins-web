import { AddModal } from 'components/AddModal'
import { Sidebar } from '../components'
import { useState } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className='flex min-h-screen bg-white font-dm dark:!bg-gray-800 dark:text-white'>
      <Sidebar setIsAddModalOpen={setIsAddModalOpen} />

      {isAddModalOpen && <AddModal setIsAddModalOpen={setIsAddModalOpen} />}

      <div className='mx-auto mt-4 flex w-60 flex-grow flex-col lg:max-w-5xl'>
        <div className='h-full p-4 pt-0'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
