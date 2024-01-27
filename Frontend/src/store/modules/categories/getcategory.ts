
import { Dispatch } from "redux";
import { AppThunk } from "../../store";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type ComponentCategoriesType = {
    cause:[],
    business: [],
}[]

const apiDetails = Object.freeze(apiList.oauth.userDetails);

export default function getUserDetails(state = initialState, action: DefaultAction): DefaultState<ComponentCategoriesType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getUserDetailssAction = (): AppThunk<APIResponseDetail<ComponentCategoriesType>> => async (dispatch: Dispatch) => {
    const updatedDetails = { ...apiDetails }

    return await initDefaultAction(apiDetails, dispatch);
};


// export const getUserDetailssAction = (accessToken: string): AppThunk<APIResponseDetail<ComponentCategoriesType>> => async (dispatch: Dispatch) => {
//     const updatedDetails = {
//         ...apiDetails,
//         headers: { Authorization: `Bearer ${accessToken}` }
//       };
//     return await initDefaultAction(updatedDetails, dispatch);
//   };