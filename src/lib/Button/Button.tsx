interface ButtonProps {
	className?: string;
	name: string;
	style: ButtonStyleEnum;
	borderRadius?: ButtonBorderEnum;
	height?: string; // in px, em, or %
	icon?: string;
	onClick: (event: any) => void;
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

const Button = (props: ButtonProps) => {
	let buttonStyle;
	const buttonHeight = `h-[${props.height}]`;
	const borderRadius =
		props.borderRadius === ButtonBorderEnum.slightly
			? "rounded-lg"
			: "rounded-full";

	switch (props.style) {
		case ButtonStyleEnum.outlined: {
			buttonStyle = "outline outline-1 text-light-outline label-large";
			break;
		}
	}

	return (
		<div
			className={`${buttonStyle} ${
				props.height ? buttonHeight : "h-10"
			} ${borderRadius} relative select-none`}
		>
			<input
				className={`flex flex-col items-center justify-center h-full ${props.className} ${borderRadius}  hover:bg-light-primary hover:opacity-[8%] focus:bg-light-primary focus:opacity-[12%]`}
				onClick={props.onClick}
			/>

			<div
				className={`flex w-full m-auto justify-center items-center gap-0 absolute top-2.5`}
			>
				<img src={props?.icon ?? ""} alt="" />
				<span className="text-light-primary">{props.name}</span>
			</div>
		</div>
	);
};

export default Button;
