
import { Dispatch } from "redux";
import { AppThunk } from "../../store";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type BusinessType = {
    "id":number,
    "user":number
}[]

const apiDetails = Object.freeze(apiList.oauth.deleteParticipations);

export default function deleteParticipationById(state = initialState, action: DefaultAction): DefaultState<BusinessType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const deleteParticipationByIdAction = (id:number): AppThunk<APIResponseDetail<BusinessType>> => async (dispatch: Dispatch) => {
    const updatedDetails = { ...apiDetails }
    return await initDefaultAction(apiDetails, dispatch, { ...updatedDetails, pathVariables: {id} });
};