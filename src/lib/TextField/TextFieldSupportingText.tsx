interface TextFieldSupportingTextProps {
	supportingText: string;
}

const TextFieldSupportingText = (props: TextFieldSupportingTextProps) => {
	return (
		<div className="text-light-onSurfaceVariant body-small pl-2">
			{props.supportingText}
		</div>
	);
};

export default TextFieldSupportingText;
