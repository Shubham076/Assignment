import React, { useEffect, useState } from 'react';
import classes from './home.module.scss';
import Modal from '../../components/Modal/Modal';
import { connect } from 'react-redux';
import {getPermission} from "../../store/actions/index"


const Home = (props) => {
    const [ show, setShow ] = useState(false);
	const [msg , setMsg]  = useState("");
	
	useEffect(()=>{

		if( !props.admin ){
			props.permission();

		}

		
		
	},[])

	const clickhandler = (text) => {
		if (props.admin) {
            setShow(true);
            setMsg(text)
		}
	};

	const close = () => {
		setShow(false);
	};

	console.log(props.accessRed)
	return (
		<div className={classes.home}>
			<Modal show={show} modalClosed={close} >
                {msg}
            </Modal>

			<div className={classes.btn_box} />

			{props.admin || props.accessGreen ?<button onClick={()=>clickhandler("Green Btn clicked")} className={classes.btn + ' ' + classes.green}>
				Access Green Btn
			</button>: null }

			{props.admin ||  props.accessRed ? (
				<button onClick={()=>clickhandler("Red Btn clicked")} className={classes.btn + ' ' + classes.red}>
					Access Red Btn
				</button>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		admin: state.auth.admin,
		accessRed : state.Permission.accessRed,
		accessGreen  : state.Permission.accessGreen
	};
};

const mapDispatchToProps = (dispatch) => {
	return{
		permission : () => dispatch(getPermission())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
