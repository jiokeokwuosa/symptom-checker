import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { setAnswer, symtominputChange, getNextQuestion } from '../../../redux/actions/symptomsActions';
import { inputChange } from '../../../redux/actions/patientActions';
import PropTypes from "prop-types";
import Slide from "./../../includes/slide.component";
import "./css/desktopStyle.css";

class Question extends Component {
	constructor(props){
        super(props); 
		this.validator = new SimpleReactValidator(); 
		this.handleChange=this.handleChange.bind(this);   
		this.handleSubmit=this.handleSubmit.bind(this);			     
    }
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.inputChange('redirect2', false);	
		this.props.symtominputChange('redirect5', false);		
	}		
	handleChange(e){		
        const target = e.target;
		const value = target.value;				
		this.props.setAnswer(value);	
	}	
	handleSubmit(e){
        e.preventDefault();
        if (this.validator.allValid()) {			
			let {sex, age, evidence, extras, question, lastQuestion} =this.props;
			question = question.map(item=>{
				return{
					id:item.id,					
					choice_id:item.choice_id
				}
			})
			evidence.push(question[0]);
			this.props.symtominputChange('evidence', evidence);
			let request = {
				sex,
				age,
				evidence,
				extras
			}			
			if(lastQuestion){
				this.props.symtominputChange('redirectToReport', true);
			}else{
				this.props.getNextQuestion(request);
			}
					
        } else {
            this.validator.showMessages();           
            this.forceUpdate();
        }
    }
	render(){				
		return (
			<>
			  {this.props.redirectToReport ? <Redirect to="/report" /> : this.props.redirect5 ? <Redirect to="/question" /> : null}			 
			  	<div id="desktopQuestion" className="container desktopVersion">
					<div className="row row1">
						<div className="col-md-7">
							<span id="formHeader">
								<div id="firstSection" className="row">
									<div className="col-md-12">
										<h4>{this.props.question.length ? this.props.question[0].text:'b'}</h4>										
									</div>
								</div>
								<form>
									<div id="sixthSection" className="row radio-toolbar">
										<div className="col-md-12">
											<input type="radio" id="radio1" name="answer" value="present" onChange={this.handleChange}/>
											<label for="radio1">Yes</label>
										</div>
										<div className="col-md-12 push30">
											<input type="radio" id="radio2" name="answer"  value="absent" onChange={this.handleChange}/>
											<label for="radio2">No</label>
										</div>
										<div className="col-md-12 push30">										
											<input type="radio" id="radio3" name="answer"  value="unknown" onChange={this.handleChange}/>
											<label for="radio3">Don't Know</label>
										</div>
									</div>
								</form>	
								{this.props.showSubmitButton ? 
								<div id="secondSection" className="row">
									<div className="col-md-12">
										<div className="myButton">
											<Link to='/symptoms'onClick={this.handleSubmit}>Next >></Link>
										</div>
									</div>
								</div>
								: null}
															
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

Question.propTypes= {	
    setAnswer:PropTypes.func.isRequired,	
	  
}
const mapStateToProps = state => ({	
	question: state.symptom.question,
	sex: state.patient.sex,   
	age: state.patient.age,	
	evidence : state.symptom.evidence,	
	extras:state.symptom.extras,
	showSubmitButton:state.symptom.showSubmitButton,
	redirect5:state.symptom.redirect5,
	lastQuestion:state.symptom.lastQuestion,
	redirectToReport:state.symptom.redirectToReport	    
})
export default connect(mapStateToProps, {setAnswer, inputChange, symtominputChange, getNextQuestion })(Question);