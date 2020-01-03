import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { symtominputChange } from '../../../redux/actions/symptomsActions';
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
    }
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.inputChange('redirect', false);
	}	
	handleChange(e){
        const target = e.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.props.symtominputChange(name, value);	
	}	
	handleSubmit(e){
        e.preventDefault();
        if (this.validator.allValid()) {
            alert('We are good to go');
        } else {
            this.validator.showMessages();           
            this.forceUpdate();
        }
    }
	render(){	
		return (
			<>
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
										<div className="col-md-12">
											<input type="text" name="keywords" placeholder="Search e.g Headache" value={ this.props.symptoms } onChange={this.handleChange}/>
											{this.validator.message('Symptoms', this.props.keywords, 'required')}
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
	inputChange:PropTypes.func.isRequired,
    keywords: PropTypes.string.isRequired     
}
const mapStateToProps = state => ({
	keywords: state.symptom.keywords	    
})
export default connect(mapStateToProps, {symtominputChange, inputChange})(Symptoms);