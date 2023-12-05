import React from "react";
import "../../index.css";
import { SegmentedButtonState } from "./interfaces/button.interface";

export enum SegmentedButtonSizeEnum {
	two = 2,
	three = 3,
	four = 4,
	five = 5,
}

/**
 * This tells how the corner of the button is going to be styled
 */
export enum SegmentedButtonStyleEnum {
	round = "lg",
	fullyRound = "full",
}

export interface SegmentedButtonProps {
	className?: string;
	size?: SegmentedButtonSizeEnum;
	style?: SegmentedButtonStyleEnum;
	activeButtonColour?: string;
	buttonState: SegmentedButtonState;
	buttonStateUpdater: React.Dispatch<React.SetStateAction<SegmentedButtonState>>;
	buttonsConfiguration: {
		firstButton: {
			name: string;
			icon?: string;
			disabled?: boolean;
			callback: () => void;
		};
		secondButton?: {
			name: string;
			icon?: string;
			disabled?: boolean;
			callback: () => void;
		};
		thirdButton?: {
			name: string;
			icon?: string;
			disabled?: boolean;
			callback: () => void;
		};
		fourthButton?: {
			name: string;
			icon?: string;
			disabled?: boolean;
			callback: () => void;
		};
		fifthButton: {
			name: string;
			icon?: string;
			disabled?: boolean;
			callback: () => void;
		};
	};
}

const selectedIcon = (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="text-light-onSecondaryContainer"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" />
	</svg>
);

/**
 * Segmented buttons help people select options, switch views, or sort elements
 *
 * The number of buttons shown depends on the size passed in.
 * NOTE:
 * - when size is two, only first and fifth buttons are shown.
 * - when size is three, only first, second and fifth buttons are shown.
 * - when size is four, only first, second, third and fifth buttons are shown
 * - when size is five, all buttons are shown
 *
 * You need to keep this in mind when passing callbacks for each buttons
 *
 * to learn more about material design segmented button visit https://m3.material.io/components/segmented-buttons/specs
 * 
 * **NOTE:**
 * For buttonConfiguration parameter, the description of each field is as follows:
 * ```
 * buttonsConfiguration: {
		firstButton: {
			name: string; // name or the label of the button, this is what will show on the button
			icon?: string; // the icon of the button
			disabled?: boolean; // this specify if the button is disabled or enabled
			callback: () => void; // a function to call when the button is clicked
		};
	}
	```
 */
function SegmentedButton({
	className = "",
	size = SegmentedButtonSizeEnum.two,
	style = SegmentedButtonStyleEnum.round,
	activeButtonColour = "bg-light-secondaryContainer",
	buttonsConfiguration,
	buttonState,
	buttonStateUpdater,
}: SegmentedButtonProps) {
	// const [activeButton, setActiveButton] = useState({
	// 	first: true,
	// 	second: false,
	// 	third: false,
	// 	fourth: false,
	// 	fifth: false,
	// });

	const gridColumns =
		size === SegmentedButtonSizeEnum.three
			? "grid-cols-3"
			: size === SegmentedButtonSizeEnum.four
			? "grid-cols-4"
			: size === SegmentedButtonSizeEnum.five
			? "grid-cols-5"
			: "grid-cols-2";

	const firstButtonStyle =
		style === SegmentedButtonStyleEnum.round
			? "rounded-tl-lg rounded-bl-lg"
			: "rounded-tl-full rounded-bl-full";

	const lastButtonStyle =
		style === SegmentedButtonStyleEnum.round
			? "rounded-tr-lg rounded-br-lg"
			: "rounded-tr-full rounded-br-full";

	const sizeIsThree =
		size === SegmentedButtonSizeEnum.three ||
		size === SegmentedButtonSizeEnum.four ||
		size === SegmentedButtonSizeEnum.five;

	const sizeIsFour =
		size === SegmentedButtonSizeEnum.four ||
		size === SegmentedButtonSizeEnum.five;

	const sizeIsFive = size === SegmentedButtonSizeEnum.five;

	const firstButtonClickHandler = () => {
		buttonStateUpdater({
			first: true,
			second: false,
			third: false,
			fourth: false,
			fifth: false,
		});
		buttonsConfiguration.firstButton.callback();
	};

	const secondButtonClickHandler = () => {
		buttonStateUpdater({
			first: false,
			second: true,
			third: false,
			fourth: false,
			fifth: false,
		});
		buttonsConfiguration.secondButton?.callback();
	};

	const thirdButtonClickHandler = () => {
		buttonStateUpdater({
			first: false,
			second: false,
			third: true,
			fourth: false,
			fifth: false,
		});
		buttonsConfiguration.thirdButton?.callback();
	};

	const fourthButtonClickHandler = () => {
		buttonStateUpdater({
			first: false,
			second: false,
			third: false,
			fourth: true,
			fifth: false,
		});
		buttonsConfiguration.fourthButton?.callback();
	};

	const fifthButtonClickHandler = () => {
		buttonStateUpdater({
			first: false,
			second: false,
			third: false,
			fourth: false,
			fifth: true,
		});
		buttonsConfiguration.fifthButton.callback();
	};

	return (
		<>
			{/* <Global
				styles={css`
					@import "./tailwind.css";
				`}
			/> */}
			<div className={`${className} grid ${gridColumns} gap-0`}>
				<button
					className={`flex flex-row gap-2 outline outline-1 h-10 text-light-outline items-center justify-center hover:bg-light-surfaceContainerHigh ${firstButtonStyle} ${
						buttonState.first && activeButtonColour
					}`}
					onClick={firstButtonClickHandler}
					disabled={buttonsConfiguration.firstButton.disabled}
				>
					{buttonState.first ? (
						selectedIcon
					) : (
						<img
							src={buttonsConfiguration.firstButton?.icon}
							alt=""
							className="h-6"
						/>
					)}

					<span
						className={`select-none ${
							buttonState.first
								? "text-light-onSecondaryContainer"
								: "text-light-onSurface"
						}`}
					>
						{buttonsConfiguration.firstButton.name}
					</span>
				</button>

				{sizeIsThree && (
					<button
						className={`flex flex-row outline outline-1 h-10 text-light-outline items-center justify-center  hover:bg-light-surfaceContainerHigh ${
							buttonState.second && activeButtonColour
						}`}
						onClick={secondButtonClickHandler}
					>
						{buttonState.second ? (
							selectedIcon
						) : (
							<img
								src={buttonsConfiguration.secondButton?.icon}
								alt=""
								className="h-6"
							/>
						)}

						<span
							className={`select-none ${
								buttonState.second
									? "text-light-onSecondaryContainer"
									: "text-light-onSurface"
							}`}
						>
							{buttonsConfiguration.secondButton?.name}
						</span>
					</button>
				)}

				{sizeIsFour && (
					<button
						className={`flex flex-row outline outline-1 h-10 text-light-outline items-center justify-center hover:bg-light-surfaceContainerHigh ${
							buttonState.third && activeButtonColour
						}`}
						onClick={thirdButtonClickHandler}
					>
						{buttonState.third ? (
							selectedIcon
						) : (
							<img
								src={buttonsConfiguration.thirdButton?.icon}
								alt=""
								className="h-6"
							/>
						)}

						<span
							className={`select-none ${
								buttonState.third
									? "text-light-onSecondaryContainer"
									: "text-light-onSurface"
							}`}
						>
							{buttonsConfiguration.thirdButton?.name}
						</span>
					</button>
				)}

				{sizeIsFive && (
					<button
						className={`flex flex-row outline outline-1 h-10 text-light-outline items-center justify-center hover:bg-light-surfaceContainerHigh ${
							buttonState.fourth && activeButtonColour
						}`}
						onClick={fourthButtonClickHandler}
					>
						{buttonState.fourth ? (
							selectedIcon
						) : (
							<img
								src={buttonsConfiguration.fourthButton?.icon}
								alt=""
								className="h-6"
							/>
						)}
						<span
							className={`select-none ${
								buttonState.fourth
									? "text-light-onSecondaryContainer"
									: "text-light-onSurface"
							}`}
						>
							{buttonsConfiguration.fourthButton?.name}
						</span>
					</button>
				)}

				<button
					className={`flex flex-row outline outline-1 h-10 text-light-outline items-center justify-center hover:bg-light-surfaceContainerHigh ${lastButtonStyle} ${
						buttonState.fifth && activeButtonColour
					}`}
					onClick={fifthButtonClickHandler}
				>
					{buttonState.fifth ? (
						selectedIcon
					) : (
						<img
							src={buttonsConfiguration.fifthButton.icon}
							alt=""
							className="h-6"
						/>
					)}
					<span
						className={`select-none ${
							buttonState.fifth
								? "text-light-onSecondaryContainer"
								: "text-light-onSurface"
						}`}
					>
						{buttonsConfiguration.fifthButton.name}
					</span>
				</button>
			</div>
		</>
	);
}

export default SegmentedButton;
