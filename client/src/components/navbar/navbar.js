import React from 'react'
import {NavLink} from "react-router-dom"
import classes from "./navbar.module.scss"
import {connect} from "react-redux"

const navbar = (props) => {
    return (
        <div className = {classes.navbar}>
            <div className={classes.navbar__links}>

                
                {!props.authenticated ? <NavLink  className={classes.navbar__link} exact activeClassName={classes.active} to="/">Login</NavLink> :null}
               {!props.authenticated  ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/signUp">SignUp</NavLink> :null}

                {props.authenticated ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/logout">Logout</NavLink> : null}
                {props.authenticated ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/home">Home</NavLink> : null}
                {props.admin ? <NavLink  className={classes.navbar__link} activeClassName={classes.active} to="/permissions">Give Permissions</NavLink> : null}


                { props.authenticated ? <a href="#"  className={classes.navbar__link}>{props.username}</a>:null}
                


            </div>
            
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        authenticated:state.auth.token ? true :false,
        username : state.auth.username,
        admin : state.auth.admin
    }
}

export default connect(mapStateToProps , null)(navbar)
