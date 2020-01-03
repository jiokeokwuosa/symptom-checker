import React from "react";
import { Provider } from "react-redux";
import store from './../../redux/store'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "./../includes/nav.component"
import  "./App.css";

const App = ()=>{
	return (
	<Provider store={store}>	
		<Nav/>
	</Provider>
	);	
}
export default App;