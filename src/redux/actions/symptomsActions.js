import { 
    INPUT_CHANGE,
   } 
    from './types';    
    
export const symtominputChange = (name, value) => async dispatch => {
    try {       	
        dispatch({
            type: INPUT_CHANGE,
            payload:{
                name:name,
                value:value
            }
        }) 
    } catch (error) {
        console.error(error);
    }    

}

