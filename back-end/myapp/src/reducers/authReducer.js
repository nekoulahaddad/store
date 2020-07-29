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
  UPDATE_USER_FAIL,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_USER,
  GET_CART_INFO_FAIL,
  GET_CART_INFO
} from '../actions/types';   // note that in reducers files i didn't import any other files


const initialState = {
	token:localStorage.getItem('token'),
	isAuthenticated:null,
	isLoading:false,
	user:null,
    cartInfo:null,
    cart:null
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
    case ADD_TO_CART_USER:
    return {
        ...state,
        isLoading:false,
         cartInfo:action.payload.cartDetail,
         cart:action.payload.cart
    };
     case GET_CART_INFO_FAIL:
     case ADD_TO_CART_FAIL:
    return {
        ...state,
    };
        case GET_CART_INFO:
    return {
        ...state,
        isLoading:false,
        user: {
        ...state.user,
        cart:action.payload
                }
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