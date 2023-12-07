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
	ref?: React.MutableRefObject<null>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	value?: string | number;
	state: {
		value: {
			focused: boolean;
			changed: boolean;
		};
		setValue: React.Dispatch<
			React.SetStateAction<{
				focused: boolean;
				changed: boolean;
			}>
		>;
	};
}

/**
 * This is a textfield component styled according to google's material design specification
 * @param props properties of the textfield
 * @returns textfield jsx element
 */
const TextField = (props: TextFieldProps) => {
	const { changed, focused } = props.state.value;
	// TODO handle hover effect on text field according to google's spec

	function textFieldFocusedHandler() {
		props.state.setValue((prevState) => {
			return { ...prevState, focused: true };
		});
	}

	function textFieldBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
		props.state.setValue((prevState) => {
			return { ...prevState, focused: false };
		});
		if (props.onBlur) props.onBlur(event);
	}

	function textFieldChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		const input = event.target.value;
		if (input === "") {
			props.state.setValue((prevState) => {
				return { ...prevState, changed: false };
			});
		} else {
			props.state.setValue((prevState) => {
				return { ...prevState, changed: true };
			});
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
					ref={props.ref}
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
