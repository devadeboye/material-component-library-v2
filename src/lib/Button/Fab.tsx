import React, { ButtonHTMLAttributes } from "react";

enum FabTypeEnum {
	FAB = "FAB",
	SmallFAB = "Small FAB",
	LargeFAB = "Large FAB",
	ExtendedFAB = "Extended FAB",
}

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string;
	fabType?: FabTypeEnum;
}

/**
 * Floating action buttons (FABs) help people take primary actions
 *
 * @param {Object} props - The properties for the button.
 * @param {string} [props.icon] - The icon to display on the button.
 * @param {string} [props.fabType=FabTypeEnum.FAB] - The type of FAB to render
 *
 * @returns {JSX.Element} The FAB component.
 */
const Fab: React.FC<FabProps> = ({ icon, ...buttonProps }) => {
	return (
		<button {...buttonProps}>
			<img src={icon} alt=""></img>
		</button>
	);
};

export default Fab;
