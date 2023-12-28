import React from "react";

export enum inputTypeEnum {
	button = "button",
	checkbox = "checkbox",
	color = "color",
	date = "date",
	dateTimeLocal = "datetime-local",
	email = "email",
	file = "file",
	hidden = "hidden",
	image = "image",
	month = "month",
	number = "number",
	password = "password",
	radio = "radio",
	range = "range",
	reset = "reset",
	search = "search",
	submit = "submit",
	tel = "tel",
	text = "text",
	time = "time",
	url = "url",
	week = "week",
}

interface TextFieldInputBoxProps {
	label: string;
	focused: boolean;
	changed: boolean;
	type: inputTypeEnum;
	error: boolean;
	inputRef?: React.RefObject<HTMLInputElement>;
	textFieldFocusedHandler: () => void;
	textFieldBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
	textFieldChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldInputBox = (props: TextFieldInputBoxProps) => {
	const displayLabel = props.focused || props.changed;
	const id = Math.random().toString();

	return (
		<div className="w-full h-12">
			{
				// label when populated
				displayLabel && (
					<label
						htmlFor={id}
						className={`${
							props.error ? "" : "text-light-onSurfaceVariant"
						} body-small`}
					>
						{props.label}
					</label>
				)
			}

			<input
				id={id}
				placeholder={props.focused ? "" : props.label}
				className={`w-full bg-transparent body-large text-light-onSurfaceVariant justify-center ${
					!displayLabel && "h-full"
				}`}
				onFocus={props.textFieldFocusedHandler}
				onBlur={props.textFieldBlurHandler}
				onChange={props.textFieldChangeHandler}
				type={props.type}
				ref={props.inputRef}
			/>
		</div>
	);
};

export default TextFieldInputBox;
