import { Dispatch } from "redux";

const initialState = {
    id: null,
    name: "",
    slug: "",
    tokens: {
        access: "",
        refresh: "",
    },
    username: "",
    // water_scheme: "",
}

type IUserDetails = {
    id: number | null
    name: string
    slug: string
    tokens: {
        access: string
        refresh: string
    },
    username: string
    // water_scheme: string
}

// const initialStateGoogle = {
//     access_token:"",
//     authuser:"",
//     expire_in:"",
//     prompt:"",
//     scope:"",
//     token_type:""
// }

// type GoogleUserDetails = {
//     access_token:string
//     authuser:string |null
//     expire_in:string
//     prompt:string | null
//     scope:string
//     token_type:string
// }

export const userDetailsReducer = (state: IUserDetails = initialState, action: DefaultAction): IUserDetails => {
    switch (action.type) {
        case "ADD_USER_DETAILS":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export default userDetailsReducer


export const addUserDetails = (data: any) => (dispatch: Dispatch) => {
    dispatch({
        type: "ADD_USER_DETAILS",
        payload: data
    })
}


// export const GoogleUserDetailsReducer = (state: GoogleUserDetails = initialStateGoogle, action: DefaultAction): GoogleUserDetails =>{
// switch(action.type){
//     case "ADD_GOOGLE_USER":
//         return{
//             ...state,
//             ...action.payload
//         }
//     default:
//         return state
// }
// }

// export const addUserDetailsGoogle = (data: any) => (dispatch: Dispatch) => {
//     dispatch({
//         type: "ADD_GOOGLE_USER",
//         payload: data
//     })
// }
