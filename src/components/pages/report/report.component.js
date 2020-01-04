import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { symtominputChange } from '../../../redux/actions/symptomsActions';
import PropTypes from "prop-types";
import Slide from "../../includes/slide.component";
import "./css/desktopStyle.css";

    const Report= (props) =>  {
	
		useEffect(()=>{
			window.scrollTo(0, 0);		
			props.symtominputChange('lastQuestion', false);	
			props.symtominputChange('redirectToReport', false);	
		}) 

		const conditionList = props.conditions.map(item =>{
			return <li>{item.name}</li>
		})	
					
		return (
			<>			
				<div id="desktopReport" className="container desktopVersion">
					<div className="row row1">
						<div className="col-md-7">
							<span id="formHeader">
								<div id="firstSection" className="row">
									<div className="col-md-12">
										<h4 className="center">Medical attention recommended</h4>
										<h6 className="center">Consulting a medical professional is advised.</h6>										
									</div>
								</div>

								<div id="thirdSection" className="row">
									<div className="col-md-12">
										<h4>Results:</h4>
										<h6>Please note that the list below may not be complete and is provided solely for informational purposes and is not a qualified medical opinion.</h6>
									</div>
								</div>

								<div id="fourthSection" className="row">
									<div className="col-md-12">
										<ul>
											{conditionList}
										</ul>
									</div>
								</div>	
								<div id="secondSection" className="row">
										<div className="col-md-12">
											<div className="myButton">
												<Link to='/'>Thanks</Link>
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
};

Report.propTypes= {	
	symtominputChange:PropTypes.func.isRequired 
}
const mapStateToProps = state => ({		
	conditions:state.symptom.conditions		    
})
export default connect(mapStateToProps, {symtominputChange})(Report);