import React from "react";
import { SegmentedButtonState } from "./interfaces/button.interface";

export enum SegmentedButtonNumberOfSegmentsEnum {
	two = 2,
	three = 3,
	four = 4,
	five = 5,
}

export enum SegmentedButtonStyleEnum {
	round = "lg",
	fullyRound = "full",
}

export interface SegmentedButtonProps {
	className?: string;
	numberOfSegments?: SegmentedButtonNumberOfSegmentsEnum;
	edgeStyle?: SegmentedButtonStyleEnum;
	activeButtonColour?: string;
	buttonState: SegmentedButtonState;
	buttonStateUpdater: React.Dispatch<
		React.SetStateAction<SegmentedButtonState>
	>;
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
 * To learn more about material design segmented button visit https://m3.material.io/components/segmented-buttons/specs
 *
 * @param {Object} props - The properties for the Segmented button.
 * @param {string} [props.className] - Additional classes for the button.
 * @param {string} [props.numberOfSegments=SegmentedButtonNumberOfSegmentsEnum.two] - The number of segments the button should contain. The number of buttons shown depends on the numberOfSegments passed in.
 * - when numberOfSegments is two, only first and fifth buttons are shown.
 * - when numberOfSegments is three, only first, second and fifth buttons are shown.
 * - when numberOfSegments is four, only first, second, third and fifth buttons are shown.
 * - when numberOfSegments is five, all buttons are shown.
 *
 * You need to keep this in mind when passing callbacks for each buttons
 *
 * @param {string} [props.edgeStyle=SegmentedButtonStyleEnum.round] - This tells how the corner of the button is going to be styled. This could be round or fully round
 * - when you pass in round, the edge will be slightly rounded. This uses the "lg" class in tailwindcss
 * - when you pass in fully round, the edge will be fully rounded. This uses the "full" class in tailwindcss
 *
 * @param {string} [props.activeButtonColour="bg-light-secondaryContainer"] - The colour the active button/segment should have; defaults to the material secondary container colour token.
 * @param {Object} [props.buttonsConfiguration] - Configuration for each segment in the button.
 * @param {string} [props.buttonsConfiguration.segment.name] - This is the name of the segment. Segment here could be the firstButton, secondButton etc.
 * @param {string} [props.buttonsConfiguration.segment.icon] - This is the icon of the segment and its optional.
 * @param {boolean} [props.buttonsConfiguration.segment.disabled] - This specify if the button is disabled or enabled. It defaults to false.
 * @param {function} [props.buttonsConfiguration.segment.callback] - The function to call when the button is clicked.
 *
 * @returns {JSX.Element} The segmented button component.
 */
const SegmentedButton = ({
	className = "",
	numberOfSegments = SegmentedButtonNumberOfSegmentsEnum.two,
	edgeStyle = SegmentedButtonStyleEnum.round,
	activeButtonColour = "bg-light-secondaryContainer",
	buttonsConfiguration,
	buttonState,
	buttonStateUpdater,
}: SegmentedButtonProps) => {
	const gridColumns =
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.three
			? "grid-cols-3"
			: numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.four
			? "grid-cols-4"
			: numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.five
			? "grid-cols-5"
			: "grid-cols-2";

	const firstButtonStyle =
		edgeStyle === SegmentedButtonStyleEnum.round
			? "rounded-tl-lg rounded-bl-lg"
			: "rounded-tl-full rounded-bl-full";

	const lastButtonStyle =
		edgeStyle === SegmentedButtonStyleEnum.round
			? "rounded-tr-lg rounded-br-lg"
			: "rounded-tr-full rounded-br-full";

	const threeSegment =
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.three ||
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.four ||
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.five;

	const fourSegments =
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.four ||
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.five;

	const fiveSegments =
		numberOfSegments === SegmentedButtonNumberOfSegmentsEnum.five;

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

				{threeSegment && (
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

				{fourSegments && (
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

				{fiveSegments && (
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
};

export default SegmentedButton;
