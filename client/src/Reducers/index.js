import { combineReducers} from 'redux';

// Import all the reducers here
import init from './init';
import alert from './alert';


const rootReducer = combineReducers({
    init,
    alert,
});

export default rootReducer;