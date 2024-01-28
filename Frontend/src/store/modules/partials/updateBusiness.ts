
import { Dispatch } from "redux";
import { AppThunk } from "../../store";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type CauseType = {
    "id":number,
    "name":string,
    "description":string,
    "contact_person":string,
    "contact_email":string,
    "contact_phone":string,
    "user":number
}[]

const apiDetails = Object.freeze(apiList.oauth.updateBusiness);

export default function UpdateBusinessDetailsById(state = initialState, action: DefaultAction): DefaultState<CauseType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const UpdateBusinessDetailsByIdAction = (requestData: any, id:number): AppThunk<APIResponseDetail<CauseType>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData, disableToast: true, pathVariables: {id}  })
};