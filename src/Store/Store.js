import {createStore,applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk" 
import ArticleReducer from "../Reducers/articleReducer"

const rootReducer  = combineReducers({
    ArticleReducer,
})

const Store =  createStore(rootReducer,applyMiddleware(thunk));

export default Store;