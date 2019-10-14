import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

// ACTION TYPES
const SET_KITTENS = 'SET_KITTENS'

// ACTION CREATORS
export const setKittens = kittens => ({ type: 'SET_KITTENS', kittens})

const initialState = {
  kittens: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KITTENS:
      return { ...state, kittens: action.kittens }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(createLogger({ collapsed: true }))
)

export default store
