import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom'

import KittensList from './KittensList'

const kittens = [
  {
    id: 1,
    name: 'Shelly',
    color: 'black',
    indoor: false,
    age: 1.5,
  },
  {
    id: 2,
    name: 'Gurturde',
    color: 'brown',
    indoor: true,
    age: 0.5,
  },
  {
    id: 3,
    name: 'Rigatoni',
    color: 'orange',
    indoor: true,
    age: 1.3,
  },
]

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
          <Route
            path="/kittens"
            render={() => <KittensList kittens={kittens} />}
          />
          <Route exact path="/" render={() => 'Homepage'} />
          <Route render={() => 'Page Not Found'} />
        </Switch>
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('main'))
