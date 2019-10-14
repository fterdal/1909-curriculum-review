import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// ACTION TYPES
const SET_KITTENS = 'SET_KITTENS'

// ACTION CREATORS
export const setKittens = (kittens, selectedKitten = { name: 'Fluffy'}) => ({
  type: SET_KITTENS,
  kittens,
  selectedKitten,
})

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
  selectedKitten: {},
}

const selectedKittenReducer = (state = initialState.kittens, action) => {
  console.log('SELECTED KITTEN REDUCER')
  switch (action.type) {
    case SET_KITTENS:
      // return { ...state, kittens: action.kittens }
      return action.selectedKitten
    default:
      return state
  }
}

const kittensReducer = (state = initialState.selectedKitten, action) => {
  console.log('KITTENS REDUCER')
  switch (action.type) {
    case SET_KITTENS:
      // return { ...state, kittens: action.kittens }
      return action.kittens
    default:
      return state
  }
}

const reducer = combineReducers({
  kittens: kittensReducer,
  selectedKitten: selectedKittenReducer,
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

export default store
