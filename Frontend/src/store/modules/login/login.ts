import { Dispatch } from "redux";

import {apiList} from "../../ActionNames"
import { AppThunk } from "../../store";
import { UserCredentials } from "../../../core/public/login/login";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDispatchTypes from "../../helper/default-action-type";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";
import TokenService from "../../../services/jwt-token/jwt-token";

type LoginResponse = { 
    data: {
        "tokens": {
            access: string
            refresh: string
        },
        "detail": string,
        "error": string,
    }
}

const initialLoginState = initialState;
const apiDetails = Object.freeze(apiList.oauth.login);

export default function loginReducer(state = initialLoginState, action: DefaultAction): DefaultState<LoginResponse> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const loginUser = (requestData: UserCredentials): AppThunk<APIResponseDetail<LoginResponse>> => async (dispatch: Dispatch) => {
    const loginData = await initDefaultAction(apiDetails, dispatch, { requestData, disableSuccessToast: true });
 
    if (loginData && loginData.data && loginData?.data?.access && typeof loginData?.data?.access === "string") {
        const dispatchTypes = initDispatchTypes(apiDetails.actionName);
        // Override login dispatch to remove data except tokens.access
        dispatch({ type: dispatchTypes.successDispatch, payload: { status: 1, data: loginData.data.access } });
        TokenService.setToken(loginData.data);
    }

    return loginData;
};