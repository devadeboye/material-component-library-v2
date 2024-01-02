import React, { ButtonHTMLAttributes } from "react";

export enum FabTypeEnum {
	FAB = "FAB",
	SmallFAB = "Small FAB",
	LargeFAB = "Large FAB",
	ExtendedFAB = "Extended FAB",
}

interface FABState {
	ripple: boolean;
}

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string;
	fabType?: FabTypeEnum;
	buttonColour?: string;
	buttonTextColour?: string;
	label?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	buttonState: {
		value: FABState;
		updater: React.Dispatch<React.SetStateAction<FABState>>;
	};
}

/**
 * Floating action buttons (FABs) help people take primary actions
 *
 * Note: Label is only shown in extended FAB
 *
 * @param {Object} props - The properties for the button.
 * @param {string} props.icon - The icon to display on the button.
 * @param {string} [props.fabType=FabTypeEnum.FAB] - The type of FAB to render
 * @param {string} [props.buttonColour=""] - Colour of the button
 * @param {string} [props.buttonTextColour=""] - Colour of text on the button
 * @param {Function} [props.onClick] - Function to call when the FAB is clicked
 * @param {Object} props.buttonState - Object to manage the state of the FAB
 * @param {Object} props.buttonState.value - React state instance of the FAB
 * @param {Function} props.buttonState.updater - React dispatch function to update FAB state
 *
 * @returns {JSX.Element} The FAB component.
 */
const Fab: React.FC<FabProps> = ({
	icon,
	fabType = FabTypeEnum.FAB,
	buttonColour = "bg-light-primaryContainer",
	buttonTextColour = "text-light-onPrimaryContainer",
	buttonState,
	label = "Extended FAB",
	onClick = () => {},
	...buttonProps
}) => {
	const dimension =
		fabType === FabTypeEnum.FAB
			? "w-14 h-14 p-4 rounded-xl"
			: fabType === FabTypeEnum.SmallFAB
			? "w-10 h-10 p-3 rounded-lg"
			: fabType === FabTypeEnum.LargeFAB
			? "w-24 h-24 p-7 rounded-3xl"
			: "h-14 min-w-[107px] rounded-xl p-4"; // This is for extended FAB

	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// Set the ripple state to true to trigger the effect
		buttonState.updater((prevState) => {
			return { ...prevState, ripple: true };
		});

		// Reset the ripple state after a short delay (you can adjust the delay as needed)
		setTimeout(() => {
			buttonState.updater((prevState) => {
				return { ...prevState, ripple: false };
			});
		}, 500);

		// Call the onClick event handler if provided
		onClick(e);
	};

	return (
		<button
			className={`${dimension} ${buttonColour} ${buttonTextColour} m-4 ${
				fabType === FabTypeEnum.ExtendedFAB ? "flex-row" : "flex-col"
			} flex items-center justify-center ${
				buttonState.value.ripple
					? "shadow-sm hover:shadow"
					: "shadow hover:shadow-md"
			} shadow-light-shadow hover:shadow-light-shadow`}
			{...buttonProps}
			onClick={handleButtonClick}
		>
			<div
				className={`${
					fabType === FabTypeEnum.LargeFAB ? "w-9 h-9" : "w-6 h-6"
				} ${buttonTextColour}`}
			>
				<img
					className={`h-full w-full ${buttonTextColour}`}
					src={icon}
					alt=""
				></img>
			</div>
			{fabType === FabTypeEnum.ExtendedFAB && (
				<span className="label-large">{label}</span>
			)}
		</button>
	);
};

export default Fab;
