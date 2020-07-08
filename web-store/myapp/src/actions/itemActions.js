import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING,ADD_COMMENT } from './types';
import {returnErrors} from './errorActions';
import {tokenConfig} from './authActions';



export const getItems = () => (dispatch,getState) => {

dispatch({type:ITEMS_LOADING});
axios.get('/items', tokenConfig(getState))
.then(res => 
dispatch({type:GET_ITEMS,payload:res.data})
)
.catch(err => dispatch(returnErrors(err.response.data,err.response.status))


);
};


export const addItem = item => (dispatch,getState) => {

axios.post('/items',item, tokenConfig(getState))
.then(res => 
dispatch({type:ADD_ITEM,payload:res.data})
)
.catch(err => dispatch(returnErrors(err.response.data,err.response.status))


);
};


export const deleteItem = id => (dispatch,getState) => {
 axios.delete(`/items/${id}`,tokenConfig(getState))
 .then(res=> 
dispatch({
type:DELETE_ITEM,
payload:id
})
)
.catch(err => {
	dispatch(returnErrors(err.response.data,err.response.status))
})
};

export const addComment = (id,comment) => (dispatch) => {
 axios.put(`/items/${id}`,comment)
 .then(res=> 
dispatch({
type:ADD_COMMENT,
payload:comment
})
)
.catch(err => {
	dispatch(returnErrors(err.response.data,err.response.status))
})
};