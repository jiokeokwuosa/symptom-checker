import React from "react";
import { CustomInput } from 'reactstrap';

const riskOptions = props => {
	return (
		<>
           <div className="row">
                <div className="col-md-4">
                    <CustomInput type="radio" name={props.name} id={props.name+'1'} myValue="present" label="Yes" onChange={props.handler}/>
                </div>
                <div className="col-md-4">
                    <CustomInput type="radio" name={props.name} id={props.name+'2'} myValue="absent" label="No" onChange={props.handler}/>
                </div>
                <div className="col-md-4">
                    <CustomInput type="radio" name={props.name} id={props.name+'3'} myValue="unknown" label="NotAware" onChange={props.handler}/>																					
                </div>
            </div>
        </>
	);
};
export default riskOptions;