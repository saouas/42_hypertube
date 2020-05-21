import { combineReducers } from 'redux'
import user from './user'

const hypertubeReduce = combineReducers({
    user: user
})

export default hypertubeReduce;