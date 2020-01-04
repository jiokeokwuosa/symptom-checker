import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { inputChange } from '../../../redux/actions/patientActions';
import PropTypes from "prop-types";
import Slide from "./../../includes/slide.component";
import AgeList from "./../../includes/ageLIst.component";
import "./css/desktopStyle.css";

class Patient extends Component {
	constructor(props){
        super(props); 
		this.validator = new SimpleReactValidator(); 
		this.handleChange=this.handleChange.bind(this);   
		this.handleSubmit=this.handleSubmit.bind(this);     
    }
	componentDidMount() {
		window.scrollTo(0, 0)
	}		
	handleChange(e){
        const target = e.target;
		const name = target.name;
		const value = target.value;
		this.props.inputChange(name, value);	
	}	
	handleSubmit(e){
        e.preventDefault();
        if (this.validator.allValid()) {
			this.props.inputChange('redirect', true);
        } else {
            this.validator.showMessages();           
            this.forceUpdate();
        }
    }
	render(){	
		let myArray=[];
		for(let i=1; i<=100;i++){
			myArray[i] = i;
		}
		myArray.reverse();		
		return (
			<>
			  {this.props.redirect ? <Redirect to="/risk-factors" /> : null}
			  	<div id="desktopPatient" className="container desktopVersion">
					<div className="row row1">
						<div className="col-md-7">
							<span id="formHeader">
								<div id="firstSection" className="row">
									<div className="col-md-12">
										<h2>Introduction</h2>	
										<h4>Please select your sex and age</h4>										
									</div>
								</div>
								<form>
									<div id="thirdSection" className="row">
										<div className="col-md-12">
											<select name="sex" value={this.props.sex} onChange={this.handleChange}>
												<option value="">Select gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
											{this.validator.message('Sex', this.props.sex, 'required')}
										</div>
									</div>

									<div id="thirdSection" className="row">
										<div className="col-md-12">
											<select name="age" value={this.props.age} onChange={this.handleChange}>
												<option value="">Select age</option>
												{myArray.map(item =>{
													return <AgeList age={item}/>;
												})}
											</select>
											{this.validator.message('Age', this.props.age, 'required')}
										</div>
									</div>
								</form>	
								<div id="secondSection" className="row">
									<div className="col-md-12">
										<div className="myButton">
											<Link to='/risk-factor'onClick={this.handleSubmit} >Next</Link>
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

Patient.propTypes= {	
    inputChange:PropTypes.func.isRequired,
	sex: PropTypes.string.isRequired,
	age: PropTypes.string.isRequired   
}
const mapStateToProps = state => ({
	sex: state.patient.sex,
	age: state.patient.age,
	redirect: state.patient.redirect	 	    
})
export default connect(mapStateToProps, {inputChange})(Patient);