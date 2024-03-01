import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import studentReducer from './student/studentReducer'

const reducer = combineReducers({
  student: studentReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
