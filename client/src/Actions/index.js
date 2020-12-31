import api from '../Utils/api';
// import { setAlert } from './alertActions';

import {
    HELLO_MESSAGE_SUCCESS,
    HELLO_MESSAGE_FAIL
} from './types'

// import { history } from '../Helpers';
// import setAuthToken from "../Utils/setAuthToken";

export const getMessage = () => async dispatch => {
    try{
        const response = await api.get('/hello');
        dispatch({
            type:HELLO_MESSAGE_SUCCESS,
            payload: response.data.message
        })
    }catch(err){
        if(err.response && err.response.data){
            dispatch({
                type:HELLO_MESSAGE_FAIL,
                payload:err.response.data
            })
        }
        console.log(err.response)
        
    }
}