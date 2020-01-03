import { 
    INPUT_CHANGE,
   } from '../actions/types';

const initialState  = {
    keywords:''
};

const symptomReducer = (state= initialState, action) =>{
    switch(action.type){        
        case INPUT_CHANGE:
            return{
                ...state,
                [action.payload.name]:action.payload.value                              
            }        
        default:
            return state;
        
    }
}
export default symptomReducer;