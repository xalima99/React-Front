import {combineReducers} from 'redux';
import adsReducer from './adsReducer';
import modalReducer from './modalReducer';
import authReducer from '../reducers/authReducer';
import {reducer as formreducer} from 'redux-form'

export default combineReducers({
    ads: adsReducer,
    form: formreducer,
    modal: modalReducer,
    auth: authReducer
})