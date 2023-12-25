import React from "react";

interface ButtonProps {
	className?: string;
	name: string;
	style: ButtonStyleEnum;
	borderRadius?: ButtonBorderEnum;
	height?: string;
	width?: string;
	icon?: string;
	onClick: (event: any) => void;
	disabled?: boolean;
}

export enum ButtonStyleEnum {
	filled = "filled",
	outlined = "outlined",
	filledTonal = "filled tonal",
	elevated = "elevated",
	text = "text",
}

export enum ButtonBorderEnum {
	slightly = "slightly rounded",
	full = "fully rounded",
}

/**
 *
 * @param height (string) is a tailwind height command to configure the height of the button. The default is h-10
 * @returns
 */
const Button = ({
	height = "h-10",
	borderRadius = ButtonBorderEnum.full,
	style,
	className,
	name,
	icon,
	width = "w-full",
	onClick,
	disabled = false,
}: ButtonProps) => {
	let buttonStyleValue;
	const borderRadiusValue =
		borderRadius === ButtonBorderEnum.slightly ? "rounded-lg" : "rounded-full";

	switch (style) {
		case ButtonStyleEnum.outlined: {
			buttonStyleValue = `outline outline-1 text-light-outline label-large ${
				disabled && "opacity-[0.38] cursor-none"
			}`;
			break;
		}
	}

	return (
		<div
			className={`${buttonStyleValue} ${height} ${borderRadiusValue} relative select-none flex justify-center ${width}`}
			onClick={disabled ? undefined : onClick}
		>
			<input
				className={`flex flex-col items-center justify-center h-full ${className} ${borderRadiusValue} ${
					!disabled &&
					"hover:bg-light-primary hover:opacity-[8%] focus:bg-light-primary focus:opacity-[12%] select-none cursor-default"
				} ${width}`}
				disabled={disabled}
			/>

			<div
				className={`flex m-auto justify-center items-center gap-0 absolute top-2.5 select-none`}
			>
				<img src={icon ?? ""} alt="" />
				<span
					className={`${
						disabled
							? "text-light-onSurface opacity-[0.38]`"
							: "text-light-primary"
					}`}
				>
					{name}
				</span>
			</div>
		</div>
	);
};

export default Button;
