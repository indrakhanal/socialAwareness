import { AnyAction, combineReducers } from "redux";
import loginReducer from "./modules/login/login";
import TokenService from "../services/jwt-token/jwt-token";
import i18nextReducer from "./modules/i18n/i18n";
import userDetails from "./modules/userDetails/index"
import outhReducer from "./modules/oauthservices";
import registerReducer from "./modules/register/register";
import ProfileReducer from "./modules/categories/getcategory";
import getCauseReducer from "./modules/partials/addCause";
import getBusinessReducer from "./modules/partials/addBusiness";
import getHomePagesActionReducer from "./modules/partials/gethomePageData"
import getCauseDetailsByIdActionReducer from "./modules/partials/getCauseById"
import getBusinessDetailsByIdActionReducer from "./modules/partials/getBusinessById"
export const appReducer = combineReducers({
    i18nextData: i18nextReducer,
    loginData: loginReducer,
    registerData: registerReducer,
    outhService:outhReducer,
    userDetails,ProfileReducer,
    getCauseReducer,getBusinessReducer,
    getHomePagesActionReducer,
    getCauseDetailsByIdActionReducer,
    getBusinessDetailsByIdActionReducer
});

export type RootState = ReturnType<typeof appReducer>;
type TState = ReturnType<typeof appReducer> | undefined;

export default function rootReducer(state: TState, action: AnyAction) {
    if (action.type === "USER_LOG_OUT") {
        state = undefined;
        try {
        } catch (err) {
            console.error("Logout Error", err);
        }
    }

    return appReducer(state, action);
};

export const logoutAction = () => {
    try {
        TokenService.clearToken();
    } catch (err) {
        console.error("LogOut Error", err);
    }
    window.location.reload()
    return { type: "USER_LOG_OUT", payload: {} };

};
