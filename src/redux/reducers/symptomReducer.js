import { 
    INPUT_CHANGE,
    IS_LOADING,
    LOADED,
    SEARCH_RESULT_LOADED,
    ADD_EVIDENCE,
    LOAD_QUESTION,
    SET_ANSWER,
    NEXT_QUESTION,
    PREPARE_REPORT 
   } from '../actions/types';

const initialState  = {
    keywords:'',
    isLoading:false, 
    searchResults:[],
    evidence:[],   
    question:[],
    extras: {
        enable_triage_5 : true,
        disable_groups: true,
        interview_mode: "triage"
    },
    redirect4:false,
    showSubmitButton:false,
    redirect5:false,
    redirectToReport:false,
    conditions:[{
        id:'ha',
        name:'Hypetension',
        common_name:'High Blood pressure',
        probability:'0.4555'
    }],
    lastQuestion:false  
};

const symptomReducer = (state= initialState, action) =>{
    switch(action.type){        
        case INPUT_CHANGE:
            return{
                ...state,
                [action.payload.name]:action.payload.value                              
            } 
        case IS_LOADING:
            return{
                ...state,
               isLoading:true                            
            } 
        case LOADED:
            return{
                ...state,
                isLoading:false                            
            } 
        case SEARCH_RESULT_LOADED:
            return{
                ...state,
                isLoading:false,  
                searchResults: action.payload,
                                          
            } 
        case ADD_EVIDENCE:
            state.evidence.push(action.payload);                   
            return{
                ...state                                       
            }  
        case LOAD_QUESTION: 
            state.question=[];
            state.question.push(action.payload);              
            return{
                ...state,
                showSubmitButton:false                                                       
            } 
        case SET_ANSWER: 
            state.question[0].choice_id=(action.payload);              
            return{
                ...state,
                showSubmitButton:true                                                     
            } 
        case NEXT_QUESTION:                           
            return{
                ...state,
                redirect4:true,
                redirect5:true                                                     
            } 
        case PREPARE_REPORT:                           
            return{
                ...state,
                lastQuestion:true,               
                conditions: action.payload,
                keywords:'',
                isLoading:false, 
                searchResults:[],
                evidence:[], 
                redirect4:false,
                showSubmitButton:false,
                redirect5:false                                                              
            }             
                          
        default:
            return state;
        
    }
}
export default symptomReducer;