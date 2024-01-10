import { Dispatch } from "redux";

import {apiList} from "../../ActionNames"
import { AppThunk } from "../../store";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

const apiDetails = Object.freeze(apiList.oauth.register);

export default function registerReducer(state = initialState, action: DefaultAction): DefaultState<any>{
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const userRegister = (requestData: any): AppThunk<APIResponseDetail<any>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData, disableToast: true })
}