import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import routes from './routes'

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={() =>
              route.layout ? (
                <route.layout>{route.component && <route.component />}</route.layout>
              ) : (
                route.component && <route.component />
              )
            }
          ></Route>
        ))}
        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </Router>
  )
}

export default App
