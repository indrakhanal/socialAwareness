import { combineReducers } from "redux";
import initUserReducer from '../oauthservices/init-api';

const outhReducer = combineReducers({
  initUserData: initUserReducer
})

export default outhReducer