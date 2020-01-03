import { 
    PATIENT_INPUT_CHANGE,
   } from '../actions/types';

const initialState  = {
    sex:'',
    age:'',
    redirect:false
};

const patientReducer = (state= initialState, action) =>{
    switch(action.type){        
        case PATIENT_INPUT_CHANGE:
            return{
                ...state,
                [action.payload.name]:action.payload.value                              
            }        
        default:
            return state;
        
    }
}
export default patientReducer;