import { Sidebar } from '../components'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen bg-white font-dm'>
      <Sidebar />

      <div className='mx-auto mt-4 flex w-60 flex-grow flex-col lg:max-w-5xl'>
        <div className='h-full p-4 pt-0'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
