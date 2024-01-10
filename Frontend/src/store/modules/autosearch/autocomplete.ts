
import { Dispatch } from "redux";
import { AppThunk } from "../../store";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type ComponentCategoriesType = {
    id: number,
    name: string,
}[]

const apiDetails = Object.freeze(apiList.oauth.autosearch);

export default function getSearchData(state = initialState, action: DefaultAction): DefaultState<ComponentCategoriesType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getSearchDataAction = (pet_name?:any): AppThunk<APIResponseDetail<ComponentCategoriesType>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, {pathVariables: { }, params: { pet_name } } );
};