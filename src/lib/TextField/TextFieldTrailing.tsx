interface TextFieldTrailingProps {
	trailing: string;
}

const TextFieldTrailing = (props: TextFieldTrailingProps) => {
	return (
		<div className="px-1 text-light-onSurfaceVariant">
			<img src={props.trailing} alt="leadingIcon" className="h-6 w-6" />
		</div>
	);
};

export default TextFieldTrailing;
