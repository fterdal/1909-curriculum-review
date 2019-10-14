import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/kittens">Kittens</NavLink>
        </nav>
        <Switch>
          <Route path="/kittens" render={() => 'Kittens Page'} />
          <Route path="/" render={() => 'Homepage'} />
        </Switch>
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('main'))
