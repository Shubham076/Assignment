import * as actionTypes from './actionTypes'
import axios from "../../serverInstance"

export const getPermissionSuccess = (data) => {
    
    return{
        type:actionTypes.GET_PERMISSION,
        data : data
    }
}


export const getPermission = () => {

    return dispatch => {    

        let token = localStorage.getItem('token');

        axios.post("/permission" , {headers:{
            Authorization :`Bearer ${token}`
        }})

        .then((res => {
            
            dispatch(getPermissionSuccess(res.data.permission))
        }))

        .catch(err => {
            // console.log(err)
        })
    }

}