import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER,
  UPDATE_USER_FAIL
} from '../actions/types';   // note that in reducers files i didn't import any other files


const initialState = {
	token:localStorage.getItem('token'),
	isAuthenticated:null,
	isLoading:false,
	user:null
}


export default function(state = initialState,action) {    // note export default, it means that it can be imported with any name, while export const --> can be imported only by the name exported with 
	switch (action.type){
    case USER_LOADING:
    return {
    	...state,
    	isLoading:true
    }
    case USER_LOADED:
    return {
    	...state,
    	user:action.payload,
    	isLoading:false,
    	isAuthenticated:true
    };
    case UPDATE_USER:
    return {
        ...state,
        user:action.payload,
        isLoading:false,
        isAuthenticated:true
    };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    localStorage.setItem('token',action.payload.token);
    return {
    	...state,
    	...action.payload,
    	isLoading:false,
    	isAuthenticated:true
    };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL: 
    case UPDATE_USER_FAIL: 
    case LOGOUT_SUCCESS:
    localStorage.removeItem('token');
    return {
    	...state,
    	token:null,
    	user:null,
    	isAuthenticated:false,
    	isLoading:false
    };
    default:
    return state;

	}

}