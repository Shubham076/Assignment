import * as actionTypes from './actionTypes'
import axios from "../../serverInstance"
import jwtDecode from 'jwt-decode'



export const auth_start = ()=>{
    return{
        type:actionTypes.AUTH_START
    }

}

export const auth_check_timeout = (time)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(auth_logout())
        } , time)
    }

}

export const auth_logout= ()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('Username')
    localStorage.removeItem('Admin')

    delete axios.defaults.headers.common["authorization"]

    return{
        type:actionTypes.LOGOUT
    }

}

export const auth_failure= (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        err:error
    }

}

export const auth_success= (token , username , admin)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        username :username,
        admin : admin
    }
}

export const auth = ( email , password , username ,role , props)=>{
    return dispatch=>{

        dispatch(auth_start())

        let user;
        let url;
    
        if(username.trim() === ''){
            user = {
                email:email,
                password:password
            }
    
             url = "/login"

        }

        else{
            user={
                email:email,
                password:password,
                username:username,
                admin:role
            }

            url= '/signUp'
        }
        

     
        axios.post(url,user)
        .then(res=>{

            const token = res.data.token
            let decodedToken = jwtDecode(token)
            let expirationDate = new Date(decodedToken.exp * 1000);
            let username = res.data.username;
            let admin = res.data.admin; 

            localStorage.setItem('token',token)
            localStorage.setItem("Username",username)
            localStorage.setItem("Admin",admin)
            localStorage.setItem('expirationDate',expirationDate)


            dispatch(auth_success(token , username , admin))
            props.history.push("/home");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    
        })
        
        .catch(err=>{
            if(err.response){   

            dispatch(auth_failure(err.response.data.message))

            }

        
        })



    }
}

export const auth_check = ()=>{

    return dispatch=>{
        let token = localStorage.getItem('token');
        let expirationDate = new Date(localStorage.getItem('expirationDate'))

      
        if(!token){
          
          dispatch(auth_logout())

        }

        else if(expirationDate > new Date()){

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            let username  = localStorage.getItem("Username")
            let admin = JSON.parse(localStorage.getItem("Admin"));

        
            dispatch(auth_success(token , username  ,admin))
            dispatch(auth_check_timeout((expirationDate.getTime() - new Date().getTime())))
        }

        else{
            dispatch(auth_logout())
        }
        }

}

export const clear = ()=>{
    return{
        type:actionTypes.CLEAR_ERRORS
    }
}







