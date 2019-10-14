import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store, { fetchKittens } from './store'
import KittensList from './KittensList'

class App extends React.Component {
  componentDidMount() {
    // store.dispatch({ type: 'SET_KITTENS', kittens })
    store.dispatch(fetchKittens())
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
              <Route
                path="/kittens"
                // render={() => <KittensList header="Kittens List" />}
                component={KittensList}
              />
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
