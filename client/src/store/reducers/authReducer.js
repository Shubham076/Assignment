import * as actionTypes from "../actions/actionTypes"


const initialState = {
    loading:false,
    token:null,
    error:null,
    username:"",
    admin:false

}
 const authReducer = (state=initialState , action)=>{

    switch(action.type){

        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null
            }

        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                loading:false,
                username:action.username,
                admin:action.admin,
            }

        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.err
            }

        case actionTypes.LOGOUT:
            return{
                ...state,
                token:null,
                admin:false
            }

        case actionTypes.CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

        default :return state

    }


}

export default authReducer