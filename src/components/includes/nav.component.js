import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "../pages/homepage/homepage.component";
import Patient from "../pages/patient/patient.component";
import Symptoms from "../pages/symptoms/symptoms.component";
import RiskFactor from "../pages/riskFactor/riskFactor.component";
import Question from "../pages/question/question.component";
import Report from "../pages/report/report.component";


//nav
const MyNav = props => {
	return (
		<Router>           	
	    	<Switch>				 
                <Route exact path='/' component={Homepage} /> 
				<Route path='/patient' component={Patient} /> 
				<Route path='/symptoms' component={Symptoms} />	
				<Route path='/risk-factors' component={RiskFactor} />
				<Route path='/question' component={Question} />	
				<Route path='/report' component={Report} />		             						
			</Switch>			
		</Router>
	);
};
export default MyNav;