import React from 'react'
import classes from "./customer.module.scss"

const Customer = (props) => {

    const {email , username} = props
    return (
        <div className = {classes.customer}>

            <h2 className = {classes.username}> {username}</h2>
            <h4 className = {classes.email} >{email}</h4>
            
        </div>
    )
}

export default Customer
