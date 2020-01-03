import {combineReducers} from 'redux';
import symptomsReducer from './symptomReducer';
import patientReducer from './patientReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    symptom: symptomsReducer,   
    error: errorReducer,
    patient: patientReducer
});