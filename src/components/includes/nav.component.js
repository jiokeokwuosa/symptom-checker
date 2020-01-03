import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "../pages/homepage/homepage.component";
import Patient from "../pages/patient/patient.component";
import Symptoms from "../pages/symptoms/symptoms.component";


//nav
const MyNav = props => {
	return (
		<Router>           	
	    	<Switch>				 
                <Route exact path='/' component={Homepage} /> 
				<Route path='/patient' component={Patient} /> 
				<Route path='/symptoms' component={Symptoms} />			             						
			</Switch>			
		</Router>
	);
};
export default MyNav;