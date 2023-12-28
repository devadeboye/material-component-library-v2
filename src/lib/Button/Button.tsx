import React from "react";

interface ButtonProps {
	className?: string;
	name: string;
	variant: ButtonVariantEnum;
	borderRadius?: ButtonBorderEnum;
	height?: string;
	width?: string;
	icon?: string;
	onClick: (event: any) => void;
	disabled?: boolean;
}

export enum ButtonVariantEnum {
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
 * Common button component for UI actions.
 *
 * @param {Object} props - The properties for the button.
 * @param {string} [props.height="h-10"] - Tailwind height command to configure the height of the button.
 * @param {string} [props.borderRadius=ButtonBorderEnum.full] - The border radius of the button. Default is ButtonBorderEnum.full.
 * @param {string} [props.variant] - The variant of the button. This could be filled, outlined etc.
 * @param {string} [props.className] - Additional classes for the button.
 * @param {string} [props.name] - The name or label of the button.
 * @param {string} [props.icon] - The icon to be displayed on the button.
 * @param {string} [props.width="w-full"] - The width of the button.
 * @param {function} [props.onClick] - The function to be executed on button click.
 * @param {boolean} [props.disabled=false] - Indicates whether the button is disabled.
 *
 * @returns {JSX.Element} The button component.
 */
const Button = ({
	height = "h-10",
	borderRadius = ButtonBorderEnum.full,
	variant,
	className,
	name,
	icon,
	width = "w-full",
	onClick,
	disabled = false,
}: ButtonProps) => {
	let buttonVariantValue;
	const borderRadiusValue =
		borderRadius === ButtonBorderEnum.slightly ? "rounded-lg" : "rounded-full";

	switch (variant) {
		case ButtonVariantEnum.outlined: {
			buttonVariantValue = `outline outline-1 text-light-outline label-large ${
				disabled && "opacity-[0.38] cursor-none"
			}`;
			break;
		}
	}

	return (
		<div
			className={`${buttonVariantValue} ${height} ${borderRadiusValue} relative select-none flex justify-center ${width}`}
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
