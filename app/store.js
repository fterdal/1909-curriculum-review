import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// ACTION TYPES
const SET_KITTENS = 'SET_KITTENS'

// ACTION CREATORS
export const setKittens = kittens => ({ type: 'SET_KITTENS', kittens })

// THUNK CREATORS
export const fetchKittens = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/kittens')
    dispatch(setKittens(data))
  } catch (err) {
    console.log(err)
  }
}

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
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

export default store
