const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p>Main Layout</p>
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
