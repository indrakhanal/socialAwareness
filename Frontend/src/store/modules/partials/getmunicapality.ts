import { Dispatch } from "redux";
import { AppThunk } from "../../store";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type MuniciapilityType = {
    id: number,
    name: any,
   
}[]

const apiDetails = Object.freeze(apiList.oauth.MuniciapilityList);

export default function getMuniciapilityReducer(state = initialState, action: DefaultAction): DefaultState<MuniciapilityType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;
    return initDefaultReducer(actionName, action, stateCopy);
}

export const getMuniciapilityListAction = (district?:any): AppThunk<APIResponseDetail<MuniciapilityType>> => async (dispatch: Dispatch) => {
    // const getLists = { ...apiDetails }
    console.log(district, "************** district id");
    
    return await initDefaultAction(apiDetails, dispatch, {pathVariables: { }, params: { district } } );

    // return await initDefaultAction(apiDetails, dispatch, updatedDetails);
};