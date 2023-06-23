import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import routes from './routes'
import { ToggleTheme } from './components'
import { DatabaseProvider } from './context'

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.layout ? (
                  <route.layout>{route.component && <route.component />}</route.layout>
                ) : (
                  route.component && <route.component />
                )
              }
            ></Route>
          ))}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <ToggleTheme />
      </Router>
    </DatabaseProvider>
  )
}

export default App
