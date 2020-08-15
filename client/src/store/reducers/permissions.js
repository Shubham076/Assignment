import * as actionTypes from "../actions/actionTypes"

const initialState = {
    accessRed : false,
    accessGreen : false
}

const permissionReducer = (state = initialState , action) => {

    switch (action.type) {

        case actionTypes.GET_PERMISSION:
            
            return{
                ...state,
                accessRed: action.data.accessRed,
                accessGreen :action.data.accessGreen
            }

        

        default: return state; 

    }
}

export default permissionReducer;