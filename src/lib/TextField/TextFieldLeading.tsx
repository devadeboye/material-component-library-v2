
import React from "react";
interface TextFieldLeadingProps {
	leading: string;
}

const TextFieldLeading = (props: TextFieldLeadingProps) => {
	return (
		<div className="px-1">
			<img
				src={props.leading}
				alt="leadingIcon"
				className="text-light-onSurfaceVariant h-6 w-6"
			/>
		</div>
	);
};

export default TextFieldLeading;
