import React from "react";
import { Link } from 'react-router-dom';
import Slide from "./../../includes/slide.component";
import "./css/desktopStyle.css";

const Homepage = () => {	
	return (
			<>
			  	<div id="desktopHomepage" className="container desktopVersion">
					<div className="row row1">
						<div className="col-md-5 relative">
							<Slide/>
							<img src={require('./../../../assets/img/logo.png')} alt='White Logo' className="float1"/>
						</div>
						<div className="col-md-7">
							<span id="formHeader">
								<div id="firstSection" className="row">
									<div className="col-md-12">
										<h2>What concerns you<br/>about your health today?</h2>
										<h4>Check your symptoms and find out what could be causing them, it's fast, free and anonymous.</h4>
									</div>
								</div>

								<div id="secondSection" className="row">
									<div className="col-md-12">
										<div className="myButton">
											<Link to='/patient'>Start checkup</Link>
										</div>
									</div>
								</div>
															
							</span>
						</div>
					</div>
				</div>
	    </>
	);	
}
export default Homepage;