import { createStore } from 'redux'
import hypertubeReduce from '../reducers/index'

const store = createStore(hypertubeReduce)

export default store;