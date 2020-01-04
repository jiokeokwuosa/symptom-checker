import { 
    PATIENT_INPUT_CHANGE,
   } from '../actions/types';

const initialState  = {
    sex:'',
    age:'',
    redirect:false,  
    redirect1:false, 
    redirect2:false, 
    p_7:'',
    p_8:'',
    p_9:'',
    p_28:''
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