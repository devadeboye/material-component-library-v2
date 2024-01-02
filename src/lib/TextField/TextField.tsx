import React from "react";
import TextFieldLeading from "./TextFieldLeading";
import TextFieldTrailing from "./TextFieldTrailing";
import TextFieldSupportingText from "./TextFieldSupportingText";
import TextFieldInputBox, { inputTypeEnum } from "./TextFieldInputBox";

export enum TextFieldStyleEnum {
	filled = "filled",
}

interface TextFieldState {
	focused: boolean;
	changed: boolean;
	error: {
		isError: boolean;
		message: string;
	};
}
interface TextFieldProps {
	leading?: string;
	trailing?: string;
	supportingText?: string;
	label: string;
	contentType: inputTypeEnum;
	style?: TextFieldStyleEnum; // TODO complete this
	className?: string;
	inputRef?: React.RefObject<HTMLInputElement>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	width?: string;
	state: {
		value: TextFieldState;
		setValue: React.Dispatch<React.SetStateAction<TextFieldState>>;
	};
	// TODO make textfield outline configurable
}

/**
 * This is a textfield component styled according to google's material design specification
 *
 * @param {Object} props - The properties for the TextField.
 * @param {string} [props.leading] - This is an optional icon to be displayed at the start of the textfield
 * @param {string} [props.trailing] - This is an optional icon to be displayed at the end of the textfield
 * @param {string} [props.supportingText] - This is an optional text that further explain the textfield
 * @param {string} props.label - This specify the label of the textfield
 * @param {string} props.contentType - The type of content the textfield is holding. This could be button, checkbox, date, color etc.
 * @param {string} [props.className] - A field to pass in additional tailwind class to still the textfield
 * @param {string} [props.width="w-full"] - The width of the textfield. This accept only tailwind classes
 * @param {Object} props.state - An object consisting a react state and the dispatch function to set the state.
 * @param {function} [props.onBlur] - Callback function to call when the textfield lose focus
 * @param {function} [props.onChange] - Callback function to call when the textfield content changes
 *
 * @returns {JSX.Element} The Textfield component.
 */
const TextField = ({
	leading,
	trailing,
	supportingText,
	label,
	contentType,
	style,
	className,
	inputRef,
	onBlur,
	onChange,
	state,
	width = "w-full",
}: TextFieldProps) => {
	const { changed, focused, error } = state.value;
	// TODO handle hover effect on text field according to google's spec

	function textFieldFocusedHandler() {
		state.setValue((prevState) => {
			return { ...prevState, focused: true };
		});
	}

	function textFieldBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
		state.setValue((prevState) => {
			return { ...prevState, focused: false };
		});
		if (onBlur) onBlur(event);
	}

	function textFieldChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		const input = event.target.value;
		if (input === "") {
			state.setValue((prevState) => {
				return { ...prevState, changed: false };
			});
		} else {
			state.setValue((prevState) => {
				return { ...prevState, changed: true };
			});
		}
		if (onChange) onChange(event);
	}

	return (
		<div
			className={`bg-transparent flex flex-col box-border ${width} ${className}`}
		>
			<div
				className={`flex flex-row ${width} items-center gap-0 pl-2 pb-1 bg-light-surfaceContainerHighest ${
					focused ? "border-b-2" : "border-b"
				} ${error.isError ? "text-light-error" : "text-light-primary"}`}
			>
				{leading && <TextFieldLeading leading={leading} />}

				<TextFieldInputBox
					label={label}
					type={contentType}
					focused={focused}
					changed={changed}
					textFieldFocusedHandler={textFieldFocusedHandler}
					textFieldBlurHandler={textFieldBlurHandler}
					textFieldChangeHandler={textFieldChangeHandler}
					inputRef={inputRef}
					error={error.isError}
				/>

				{trailing && <TextFieldTrailing trailing={trailing} />}
			</div>

			{error.isError ? (
				<TextFieldSupportingText
					supportingText={error.message}
					error={error.isError}
				/>
			) : (
				<TextFieldSupportingText
					supportingText={supportingText ?? ""}
					error={error.isError}
				/>
			)}
		</div>
	);
};

export default TextField;
