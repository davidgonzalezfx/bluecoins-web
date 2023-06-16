import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={() => <div>Home</div>} />
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
