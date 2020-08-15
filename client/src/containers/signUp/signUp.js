import React  , {useEffect}from 'react'
import classes from "./signUp.module.scss"
import {Formik , Form , Field ,ErrorMessage} from "formik";
import * as yup from "yup";
import FormikControl from "../../components/formElements/formikControl"
import {Link} from "react-router-dom"
import Spinner from "../../components/Spinner/spinner"
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"


const initialValues = {
    email:"",
    password:"",
    username:"",
    role:''
}

const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Admin', value: "Admin" },
    { key: 'Customer', value: "Customer" }
  ]



const validationSchema = yup.object({
    username:yup.string().required("This field is required"),
    email:yup.string().required("This field is required").email("Please enter a valid email"),
    password:yup.string().required("This field is required").min(6,"Password should be 6 characters long"),
    role:yup.string().required("This field is required")

})

const SignUp = (props) => {

    useEffect(()=>{
        props.clear()
    },[])

    

    let btnContent = "Submit";
    if(props.loading){
        btnContent = <Spinner/>
    }

                
    let error = props.error ?  <div className={classes.form__error}>{props.error}</div> : null

    return (
        <div className = {classes.form}>
			{error}

			<h2 className={classes.form__header}>Sign Up</h2>


            <Formik initialValues={initialValues}
            onSubmit = {values=>{
                let admin = values.role === 'Admin' ? true : false;
                props.auth(values.email, values.password , values.username , admin , props )
            }}
            validationSchema= {validationSchema}
            validateOnMount>

                {formik => {
                    return(
                        <Form style={{display:"flex" , flexDirection:"column" , width:"45rem"}}>
                        
                        <FormikControl
							control='input'
            				type='text'
            				label='Username'
							name='username'
							touched = {formik.touched.username}	
          				/>

                        <FormikControl
							control='input'
            				type='email'
            				label='Email'
							name='email'
							touched = {formik.touched.email}	
          				/>

                        <FormikControl
                            control='select'
                            label='Role'
                            name='role'
                            options={dropdownOptions}
							touched = {formik.touched.role}	

                        />

						<FormikControl
							control='input'
            				type='password'
            				label='Password'
							name='password'
							touched = {formik.touched.password}	
          				/>

                          

                                <button type ="submit"  disabled = {!formik.isValid} className = {classes.btn__submit}>{btnContent}</button>
                            <Link className={classes.link} to="/" >Already have an account ? Click here</Link>

                        </Form>
                    )
                }}
            </Formik>
            
        
            
        </div>
    )
}

const mapStateToProps = state => {
	return{
        loading:state.auth.loading,
        error:state.auth.error
	}
}
const mapDispatchToProps = dispatch => {
	return {
        auth:(email , password , username ,role ,  props)=>dispatch(actions.auth(email , password , username ,role, props)),
        clear:()=>dispatch(actions.clear())
	}
}

export default connect(mapStateToProps , mapDispatchToProps)(SignUp)
