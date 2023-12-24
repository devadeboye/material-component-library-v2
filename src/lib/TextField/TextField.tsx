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
	style?: TextFieldStyleEnum; // TODO complete this
	className?: string;
	inputRef?: React.RefObject<HTMLInputElement>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	// value?: string | number;
	width?: string;
	state: {
		value: {
			focused: boolean;
			changed: boolean;
			error: {
				isError: boolean;
				message: string;
			};
		};
		setValue: React.Dispatch<
			React.SetStateAction<{
				focused: boolean;
				changed: boolean;
				error: {
					isError: boolean;
					message: string;
				};
			}>
		>;
	};
	// TODO make textfield outline configurable
}

/**
 * This is a textfield component styled according to google's material design specification
 *
 * @param leading this is an optional icon to be displayed at the start of the textfield
 * @param trailing this is an optional icon to be displayed at the end of the textfield
 * @param supportingText this is an optional text that further explain the textfield
 * @param label this specify the label of the textfield
 * @param contentType the type of content the textfield is holding. This could be button, checkbox, date, color etc.
 * @param className a field to pass in additional tailwind class to still the textfield
 * @param width the width of the textfield. This accept only tailwind classes
 * @param state react useState instance to manage the state of the textfield
 * @param onBlur callback function to call when the textfield lose focus
 * @param onChange callback function to call when the textfield content changes
 *
 * @returns textfield jsx element
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
