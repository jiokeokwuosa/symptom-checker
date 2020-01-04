import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { symtominputChange, loadSearchResult,  addEvidence, getNextQuestion } from '../../../redux/actions/symptomsActions';
import { inputChange } from '../../../redux/actions/patientActions';
import PropTypes from "prop-types";
import Slide from "./../../includes/slide.component";
import "./css/desktopStyle.css";

class Symptoms extends Component {
	constructor(props){
        super(props); 
		this.validator = new SimpleReactValidator(); 
		this.handleChange=this.handleChange.bind(this);   
		this.handleSubmit=this.handleSubmit.bind(this);  
		this.handleAddEvidence=this.handleAddEvidence.bind(this);  
    }
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.inputChange('redirect1', false);		
	}	
	handleChange(e){
        const target = e.target;
		const name = target.name;
		const value = target.value;
		this.props.symtominputChange(name, value);
		 if(this.props.keywords.length > 1){
			this.props.symtominputChange('isLoading', true);
			 const data ={
				phrase: this.props.keywords,
				sex: this.props.sex				
			 }
			 this.props.loadSearchResult(data);			 
		 }else if(this.props.keywords.length < 3){
			const clearSearch = [];
			this.props.symtominputChange('searchResults', clearSearch);
		   }
	}
	handleAddEvidence(id, label, e){
		e.preventDefault();  
		const clearSearch = [];
		this.props.symtominputChange('searchResults', clearSearch);
		this.props.symtominputChange('keywords', '');
		const data ={
			id:id,
			choice_id:'present',
			initial:true,
			label: label
		}
			
		this.props.addEvidence(data)		
	}		
	handleSubmit(e){
        e.preventDefault();
        if (this.validator.allValid()) {				
			let {sex, age, evidence, extras, p_7, p_8, p_9, p_28} =this.props;
			evidence = evidence.map(item=>{
				return{
					id:item.id,
					initial:item.initial,
					choice_id:item.choice_id
				}
			})			
			const risk1 ={
				id:'p_7',
				choice_id:p_7
			}
			const risk2 ={
				id:'p_8',
				choice_id:p_8
			}
			const risk3 ={
				id:'p_9',
				choice_id:p_9
			}
			const risk4 ={
				id:'p_28',
				choice_id:p_28
			}	
			if(p_7 === 'present' || p_7 === 'absent' || p_7 === 'unknown'){
				evidence.push(risk1);
			}			
			if(p_8 === 'present' || p_8 === 'absent' || p_8 === 'unknown'){
				evidence.push(risk2);
			}
			if(p_9 === 'present' || p_9 === 'absent' || p_9 === 'unknown'){
				evidence.push(risk3);
			}
			if(p_28 === 'present' || p_28 === 'absent' || p_28 === 'unknown'){
				evidence.push(risk4);
			}		
			
			this.props.symtominputChange('evidence', evidence);
			let request = {
				sex,
				age,
				evidence,
				extras
			}		
			console.log(request);
			this.props.getNextQuestion(request);
			
        } else {
            this.validator.showMessages();           
            this.forceUpdate();
        }
    }
	render(){	
			const mySearchResults = this.props.searchResults.map(item =>{
				return <li><Link to='/' alt={item.label} onClick={this.handleAddEvidence.bind(this, item.id, item.label)}>{item.label}</Link> </li>
			})
			const evidenceList = this.props.evidence.map(item =>{
				return <li>{item.label}</li>
			})
		return (
			<>
			 	{this.props.redirect4 ? <Redirect to="/question" /> : null}
			  	<div id="desktopSymptoms" className="container desktopVersion">
					<div className="row row1">
						<div className="col-md-7">
							<span id="formHeader">
								<div id="firstSection" className="row">
									<div className="col-md-12">
										<h2>Add your symptoms</h2>	
										<h4>Please use the searchbox. Add as many symptoms as you can for the most accurate result</h4>										
									</div>
								</div>
								<form>									
									<div id="thirdSection" className="row">
										<div className="col-md-12 evidence">
										 	<ul>
												{evidenceList}
											</ul>
										</div>
									</div>
									<div id="thirdSection" className="row">
										<div className="col-md-12">
											<input type="text" name="keywords" placeholder="Search e.g Headache" value={ this.props.symptoms } onChange={this.handleChange}/>
											{this.validator.message('Symptoms', this.props.evidence, 'required')}
										</div>
									</div>
									{this.props.isLoading ?  
										<div id="loader" className="row">
											<div className="col-md-12">
												<img src={require('./../../../assets/img/loading.gif')} alt='Loading'/>
											</div>
										</div>
									: null}
									<div id="thirdSection" className="row">
										<div className="col-md-12">											
											<ul>
												{mySearchResults}												
											</ul>
										</div>
									</div>
								</form>	
								<div id="secondSection" className="row">
									<div className="col-md-12">
										<div className="myButton">
											<Link to='/' onClick={this.handleSubmit}>Next</Link>
										</div>
									</div>
								</div>
															
							</span>
						</div>			
						<div className="col-md-5 relative">
							<Slide/>
							<img src={require('./../../../assets/img/logo.png')} alt='White Logo' className="float1"/>
						</div>
					</div>
				</div>
	    </>
		);
	}
	
};

Symptoms.propTypes= {	
	symtominputChange:PropTypes.func.isRequired,
	getNextQuestion:PropTypes.func.isRequired,
	loadEvidence:PropTypes.func.isRequired,
	inputChange:PropTypes.func.isRequired,
	keywords: PropTypes.string.isRequired,
	searchResults: PropTypes.array     
}
const mapStateToProps = state => ({
	keywords: state.symptom.keywords,
	sex: state.patient.sex,   
	age: state.patient.age,
	searchResults : state.symptom.searchResults,
	evidence : state.symptom.evidence,	
	p_7: state.patient.p_7, 
    p_8: state.patient.p_8, 
    p_9: state.patient.p_9, 
	p_28:state.patient.p_28, 
	redirect4:state.symptom.redirect4,
	extras:state.symptom.extras,
	isLoading:state.symptom.isLoading
})
export default connect(mapStateToProps, {getNextQuestion, symtominputChange, inputChange, addEvidence, loadSearchResult})(Symptoms);