
import { Dispatch } from "redux";
import { AppThunk } from "../../store";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type CauseType = {
    "id":number,
}[]

const apiDetails = Object.freeze(apiList.oauth.createCauseJoin);

export default function CreateCauseJoin(state = initialState, action: DefaultAction): DefaultState<CauseType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const CreateCauseJoinAction = (id:number): AppThunk<APIResponseDetail<CauseType>> => async (dispatch: Dispatch) => {
    const updatedDetails = { ...apiDetails }
    return await initDefaultAction(apiDetails, dispatch, { ...updatedDetails, pathVariables: {id} });
};