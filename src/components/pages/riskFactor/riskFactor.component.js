import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { inputChange } from '../../../redux/actions/patientActions';
import PropTypes from "prop-types";
import Slide from "./../../includes/slide.component";
import RiskOptions from "./../../includes/riskOptions";
import "./css/desktopStyle.css";

class Risk extends Component {
	constructor(props){
        super(props); 
		this.validator = new SimpleReactValidator(); 
		this.handleChange=this.handleChange.bind(this);   
		this.handleSubmit=this.handleSubmit.bind(this);			     
    }
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.inputChange('redirect', false);			
	}		
	handleChange(e){		
        const target = e.target;
		const name = target.name;		
		const value = target.getAttribute('myValue');		
		this.props.inputChange(name, value);	
	}	
	handleSubmit(e){
        e.preventDefault();
        if (this.validator.allValid()) {
			this.props.inputChange('redirect1', true);
        } else {
            this.validator.showMessages();           
            this.forceUpdate();
        }
    }
	render(){				
		return (
			<>
			  {this.props.redirect1 ? <Redirect to="/symptoms" /> : null}
			  	<div id="desktopRisk" className="container desktopVersion">
					<div className="row row1">
						<div className="col-md-7">
							<span id="formHeader">
								<div id="firstSection" className="row">
									<div className="col-md-12">
										<h3>Please check all the statements below that applies to you</h3>	
										<h5>Please select one answer for each question</h5>																
									</div>
								</div>
								<form>
									<div id="thirdSection" className="row push">
										<div className="col-md-5">
											<h5>I am overweight or obese</h5>
										</div>
										<div className="col-md-7">
											<RiskOptions name="p_7" handler={this.handleChange}/>																							
										</div>
										{this.validator.message('Question', this.props.p_7, 'required')}
									</div>
									<div id="thirdSection" className="row">
										<div className="col-md-5">
											<h5>I smoke cigarettes</h5>
										</div>
										<div className="col-md-7">
											<RiskOptions name="p_28" handler={this.handleChange}/>	
							     		</div>
										{this.validator.message('Question', this.props.p_28, 'required')}
									</div>
									<div id="thirdSection" className="row push1">
										<div className="col-md-5">
											<h5 className="push2">I have hypertension</h5>
										</div>
										<div className="col-md-7">
											<RiskOptions name="p_9" handler={this.handleChange}/>	
										</div>
										{this.validator.message('Question', this.props.p_9, 'required')}
									</div>
									<div id="thirdSection" className="row">
										<div className="col-md-5">
											<h5>I have diabetics</h5>
										</div>
										<div className="col-md-7">
											<RiskOptions name="p_8" handler={this.handleChange}/>	
										</div>
										{this.validator.message('Question', this.props.p_8, 'required')}
									</div>
								
								</form>	
								<div id="secondSection" className="row">
									<div className="col-md-12">
										<div className="myButton">
											<Link to='/symptoms'onClick={this.handleSubmit} >Next</Link>
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

Risk.propTypes= {	
    inputChange:PropTypes.func.isRequired,	
	p_7: PropTypes.string,
	p_8: PropTypes.string,
	p_9: PropTypes.string,
	p_28: PropTypes.string	  
}
const mapStateToProps = state => ({
	p_7: state.patient.p_7,
	p_8: state.patient.p_8,
	p_9: state.patient.p_9,
	p_28: state.patient.p_28,
	redirect1:state.patient.redirect1		    
})
export default connect(mapStateToProps, {inputChange})(Risk);