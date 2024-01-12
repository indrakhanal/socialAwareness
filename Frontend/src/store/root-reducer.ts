import { AnyAction, combineReducers } from "redux";
import loginReducer from "./modules/login/login";
import TokenService from "../services/jwt-token/jwt-token";
import i18nextReducer from "./modules/i18n/i18n";
import userDetails from "./modules/userDetails/index"
import outhReducer from "./modules/oauthservices";
import registerReducer from "./modules/register/register";
import categoryReducer from "./modules/categories/getcategory";
import getSearchDataReducer from "./modules/autosearch/autocomplete"
import getDistrictReducer from "./modules/partials/district";
import getCatListReducer from "./modules/partials/categories";
import getMuniciapilityReducer from "./modules/partials/getmunicapality";

// import {addUserDetailsGoogle} from  "./modules/userDetails/index"


export const appReducer = combineReducers({
    i18nextData: i18nextReducer,
    loginData: loginReducer,
    registerData: registerReducer,
    outhService:outhReducer,
    userDetails,categoryReducer,
     getSearchDataReducer,
     getDistrictReducer,
     getCatListReducer,
     getMuniciapilityReducer
    // addUserDetailsGoogle
    // outhService: outhReducer,
    // schemeName,
    // userDetails,
    
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
