import React from "react";

const ageList = props => {
	return (
		<>
            <option value={props.age}>{props.age}</option>
        </>
	);
};
export default ageList;