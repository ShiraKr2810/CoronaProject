import { combineReducers } from "redux";
import userReducer from './userReducer'
//יצירת מחלקה ראשית
//מחלקה ראשית מקבלת את המחלקות
const rootReducer=combineReducers({
    userReducer
})

export default rootReducer