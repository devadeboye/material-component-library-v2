import { useState } from "react";
import React from "react";
import TextFieldLeading from "./TextFieldLeading";
import TextFieldTrailing from "./TextFieldTrailing";
import TextFieldSupportingText from "./TextFieldSupportingText";
import TextFieldInputBox, { inputTypeEnum } from "./TextFieldInputBox";

export enum TextFieldStyleEnum {
	filled = "filled",
}
interface TextFieldProps {
	leading?: string;
	trailing?: string;
	supportingText?: string;
	label: string;
	contentType: inputTypeEnum;
	style?: TextFieldStyleEnum;
	className?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	value?: string | number;
}

/**
 * This is a textfield component styled according to google's material design specification
 * @param props properties of the textfield
 * @returns textfield jsx element
 */
const TextField = (props: TextFieldProps) => {
	// TODO handle hover effect on text field according to google's spec
	const [focused, setFocused] = useState(false);
	const [changed, setChanged] = useState(false);

	function textFieldFocusedHandler() {
		setFocused(true);
	}

	function textFieldBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
		setFocused(false);
		if (props.onBlur) props.onBlur(event);
	}

	function textFieldChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		const input = event.target.value;
		if (input === "") {
			setChanged(false);
		} else {
			setChanged(true);
		}
		if (props.onChange) props.onChange(event);
	}

	return (
		<div
			className={`bg-transparent flex flex-col box-border w-full ${props.className}`}
		>
			<div className="flex flex-row w-full items-center gap-0 pl-2 pb-1 bg-light-surfaceContainerHighest">
				{props.leading && <TextFieldLeading leading={props.leading} />}

				<TextFieldInputBox
					label={props.label}
					type={props.contentType}
					focused={focused}
					changed={changed}
					textFieldFocusedHandler={textFieldFocusedHandler}
					textFieldBlurHandler={textFieldBlurHandler}
					textFieldChangeHandler={textFieldChangeHandler}
				/>

				{props.trailing && <TextFieldTrailing trailing={props.trailing} />}
			</div>

			{/** active indicator */}
			<hr
				className={` ${
					focused ? " text-light-primary" : "text-light-onSurfaceVariant"
				}`}
			/>

			{props.supportingText && (
				<TextFieldSupportingText supportingText={props.supportingText} />
			)}
		</div>
	);
};

export default TextField;
