import React from "react";

export enum DividerStyleEnum {
	fullWidth = "full-width",
	inset = "inset",
	middleInset = "middle-inset",
}

interface DividerProps {
	dividerStyle: DividerStyleEnum;
	marginAfterDivider: boolean | undefined;
}

const Divider = (props: DividerProps) => {
	const marginAfterDivider = props.marginAfterDivider && "mb-2";
	return (
		<hr
			className={`h-px border-light-outlineVariant ${marginAfterDivider} ${
				props.dividerStyle === DividerStyleEnum.middleInset
					? "mx-4"
					: props.dividerStyle === DividerStyleEnum.inset
					? "ml-4 mr-0"
					: "mr-2"
			}`}
		/>
	);
};

export default Divider;
