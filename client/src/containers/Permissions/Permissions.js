import React,{Component} from 'react'
import classes from "./permissions.module.scss"
import axios from "../../serverInstance"
import Customer from "./Customer/customer"
import Modal from "../../components/Modal/Modal"


class Permissions extends Component{

    state = {
        users: null , 
        show : false,
        accessRed : false,
        accessGreen  :false,
        id:null

    }




    handleChange = (event)=>{

            this.setState({
                [event.target.name] : event.target.checked
            })
      
        
    }

    handleSubmit = ()=> {
        
        let permission = {
            accessRed : this.state.accessRed,
            accessGreen : this.state.accessGreen
        }

        axios.put("/permission/" + this.state.id , {permission : permission})
        .then(res =>{

        this.setState({show : false})


        })
        .catch(err =>{
            console.log(err)
        this.setState({show : false})

        })

        let usersCopy = [...this.state.users];
        let index = usersCopy.findIndex(user => user.userId === this.state.id);
        let user = usersCopy[index]
        user.accessGreen = permission.accessGreen
        user.accessRed = permission.accessRed

        usersCopy[index] = user
        this.setState({users : usersCopy})

    }

    componentDidMount(){

    axios.get("/users")

        .then( res => {
        
            this.setState({
                users : res.data.users
            })
        
        })

        .catch(err => {
            console.log(err)
        })


    }

    clickedHandler = (id) =>{

        
        let user = this.state.users.find((user) => user.userId === id);
        this.setState({accessGreen : user.accessGreen , accessRed : user.accessRed , show: true , id:id})

    }

    closed = ()=>{
        this.setState({show : false})
    }


    render(){

        return (
            <div className = {classes.permission}>
                <Modal  show = {this.state.show} modalClosed = {this.closed}>
                    <div>

                        <div>
                            <label className={classes.label} htmlFor="accessGreen">See Green Btn</label>
                            <input
                            type = "checkbox"
                            name='accessGreen'
                            checked = {this.state.accessGreen}
                            onChange = {(event)=>this.handleChange(event)}
                        />
                        </div>
                        
                        <div>
                        <label  className={classes.label} htmlFor="accessRed">See Red Btn</label>
                        <input className = {classes.input}
                                type = "checkbox"
                                name='accessRed'
                                checked = {this.state.accessRed}
                                onChange = {(event)=>this.handleChange(event)}
                            />

                        </div>

                    </div>


                             

                                <button className = {classes.btn} onClick = {this.handleSubmit}>Save Changes</button>
                        
 
                </Modal>
                {this.state.users ? this.state.users.map((user , idx)=> <div key = {idx} onClick = {()=>this.clickedHandler(user.userId) }>
                    <Customer {...user}   />
                </div>) :null}
                
            </div>
        )
    }
  
}

export default Permissions
