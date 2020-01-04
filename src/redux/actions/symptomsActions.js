import Api from "./../../assets/js/api";
import { returnErrors } from "./errorActions";
import { 
    INPUT_CHANGE,
    IS_LOADING,
    SEARCH_RESULT_LOADED,
    AUTH_ERROR,
    ADD_EVIDENCE,
    LOAD_QUESTION,
    SET_ANSWER,
    NEXT_QUESTION,
    PREPARE_REPORT  
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
export const addEvidence = (item) => async dispatch => {
    try {         	
        dispatch({
            type: ADD_EVIDENCE,
            payload:item
        }) 
    } catch (error) {
        console.error(error);
    }    

}
export const loadSearchResult = (data) => async dispatch => {
    try { 
        //user loading      	
        dispatch({
            type:  IS_LOADING            
        }); 

        const result = await Api.search(data);        
        console.log(result.data);       
        dispatch({
            type: SEARCH_RESULT_LOADED,
            payload:result.data
        })	
    } catch (err) {
        if(err.response){
            console.log(err.response.data);            
            dispatch(returnErrors(err.response.data.error, err.response.data.status));
        }else{
            console.log('Something went wrong while loading search result');
        }
        dispatch({
            type: AUTH_ERROR            
        })	
    }    

}
export const getNextQuestion = (data) => async dispatch => {
    try { 
        document.body.classList.add('loading-indicator');	
        const result = await Api.diagnosis(data);        
        if (result.data.should_stop){
            dispatch({
                type: PREPARE_REPORT,
                payload: result.data.conditions          
            }) 
        }  
        console.log()  
        dispatch({
            type: LOAD_QUESTION,
            payload:{
                id:result.data.question.items[0].id,
                text:result.data.question.text,
                choice_id:null
            }
        })	
        document.body.classList.remove('loading-indicator');
        dispatch({
            type: NEXT_QUESTION            
        })
    } catch (err) {
        if(err.response){
            console.log(err.response.data);            
            dispatch(returnErrors(err.response.data.error, err.response.data.status));
        }else{
            console.log('Something went wrong while loading question');
        }
        dispatch({
            type: AUTH_ERROR            
        })	
    }    

}
export const setAnswer = (answer) => async dispatch => {
    try {         	
        dispatch({
            type: SET_ANSWER,
            payload:answer
        }) 
    } catch (error) {
        console.error(error);
    }    

}



