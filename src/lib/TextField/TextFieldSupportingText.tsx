
import React from "react";
interface TextFieldSupportingTextProps {
	supportingText: string;
	error: boolean;
}

const TextFieldSupportingText = ({supportingText, error}: TextFieldSupportingTextProps) => {
	return (
		<div className={`${error ? "text-light-error" : "text-light-onSurfaceVariant"} body-small pl-2`}>
			{supportingText}
		</div>
	);
};

export default TextFieldSupportingText;
