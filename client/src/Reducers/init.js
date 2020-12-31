  
import {
    HELLO_MESSAGE_SUCCESS,
    HELLO_MESSAGE_FAIL 
} from '../Actions/types';

const initialState = {
    message:'',
    errors: null
};

export default function reducerFunction(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HELLO_MESSAGE_SUCCESS:
      return {
          ...state,
          message: payload
      };
    case HELLO_MESSAGE_FAIL:
      return {
          ...state,
          errors: payload
      }
    default:
      return state;
  }
}