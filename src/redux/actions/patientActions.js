import { 
    PATIENT_INPUT_CHANGE,
   } 
    from './types';    
    
export const inputChange = (name, value) => async dispatch => {
    try {       	
        dispatch({
            type: PATIENT_INPUT_CHANGE,
            payload:{
                name:name,
                value:value
            }
        }) 
    } catch (error) {
        console.error(error);
    }    

}

