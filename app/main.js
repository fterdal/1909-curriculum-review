import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
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

class App extends React.Component {
  componentDidMount() {
    store.dispatch({ type: 'SET_KITTENS', kittens })
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <nav>
              <NavLink to="/">Home</NavLink>
              <br />
              <NavLink to="/kittens">Kittens</NavLink>
            </nav>
            <Switch>
              <Route path="/kittens" render={() => <KittensList />} />
              <Route exact path="/" render={() => 'Homepage'} />
              <Route render={() => 'Page Not Found'} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('main'))
