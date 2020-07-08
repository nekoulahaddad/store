
import axios from 'axios';
import {returnErrors} from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';



export const loadUser = () => ( dispatch , getState  ) => {

dispatch({type:USER_LOADING});

axios
.get('/auth/user', tokenConfig( getState )) 
.then(res => 
	dispatch({
		type:USER_LOADED,
		payload:res.data
	})
    )
.catch(err => {
dispatch(returnErrors(err.response.data, err.response.status));
dispatch({
	type:AUTH_ERROR
});
});
};

export const register = ({name,email,password}) => (dispatch, getState) => { //note : ({name,email,password}) mo (name,email,password) y3nee jbton k object mnshan heek t7t 7awalton l json

const config = {
	headers: {
		"content-type":"application/json"
	}
}

const body = JSON.stringify({name,email,password}); // 7awalet l json .. l2n 2na fo2 3amel {}

axios.post('/users', body, config)  // note : hon 2na jebet al config mo al tokenconfig
.then(res => {
	dispatch({
		type: REGISTER_SUCCESS,
		payload:res.data
	})
})
.catch(err => { dispatch(returnErrors(err.response.data, err.response.status,'REGISTER_FAIL'));
	dispatch({
		type:REGISTER_FAIL
	});

	});

};

export const login = ({email,password}) => dispatch => {
	const config = {
		headers: {
			'content-type':'application/json'
		}
	};

	const body = JSON.stringify({email,password});

	axios.post('/auth',body, config)
	.then(res => dispatch({type:LOGIN_SUCCESS,payload:res.data}))
	.catch(err => {
		dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
		dispatch({type:LOGIN_FAIL});

	});
};



export const logout = () => {    // NOTE : hon ma 7a6eet dispatch l2n she3`le wa7de y3nee type wa7ed 3m 2b3to fb3mel return 3ady
	return {
		type: LOGOUT_SUCCESS
	};
	  
};






export const tokenConfig = getState =>  {
	const token = getState().auth.token;

	const config = {
		headers:{
			'content-type':'application/json'
		}
	};


	if (token) {
		config.headers['x-auth-token'] = token;
	}

    return config;

};








