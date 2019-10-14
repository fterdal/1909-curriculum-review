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

const MyContext = React.createContext('blue')
const RendersChildren = props => {
  return (
    <MyContext.Provider value="green">
      <h3>{props.header}</h3>
      {props.children}
    </MyContext.Provider>
  )
}

const ListItem = props => {
  // return <li>{props.text}</li>
  return (
    <MyContext.Consumer>
      {value => <li style={{ color: value }}>{props.text}</li>}
    </MyContext.Consumer>
  )
}

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
            <RendersChildren header="Rendering Children">
              <ListItem text="One" />
              <ListItem text="Two" />
              <ListItem text="Three" />
            </RendersChildren>
          </div>
        </Router>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('main'))
