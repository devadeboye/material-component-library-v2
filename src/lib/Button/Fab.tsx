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

// Button component
const Fab: React.FC<FabProps> = ({ icon, ...buttonProps }) => {
	return (
		<button {...buttonProps}>
			{/* {icon} */}
			<img src={icon} alt=""></img>
		</button>
	);
};

export default Fab;
