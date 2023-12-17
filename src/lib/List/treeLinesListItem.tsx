import React from "react";
import Divider, { DividerStyleEnum } from "./Divider";

interface ThreeLineListItemProps {
	leading: string;
	headline: string;
	trailing: string;
	className: string;
	divider: boolean;
	dividerStyle: DividerStyleEnum | undefined;
	marginAfterDivider: boolean | undefined;
	supportingText: string | undefined;
}

function ThreeLinesListItem({
	leading,
	headline,
	trailing,
	className,
	divider,
	dividerStyle,
	marginAfterDivider,
	supportingText,
}: ThreeLineListItemProps) {
  if (!supportingText) throw new Error('supportingText must be provided when using three-line list')
  
	return (
		<li className="list-none box-border">
			<div
				className={`flex flex-row gap-5 h-20 items-center pl-3 pr-1 body-large ${className}`}
			>
				{leading && (
					<div className="w-1/12">
						<img src={leading} alt="leading-icon" />
					</div>
				)}

				<div className={`${leading ? "w-4/5" : "w-11/12"}`}>
					{/* This is the headline section */}
					<div>{headline}</div>

					{/* This is the supportingText section */}
					{supportingText && <div className="text-xs">{supportingText}</div>}
				</div>

				{trailing && (
					<div className="w-1/12">
						<img src={trailing} alt="trailing-icon" />
					</div>
				)}
			</div>
			{divider && dividerStyle && (
				<Divider
					dividerStyle={dividerStyle}
					marginAfterDivider={marginAfterDivider}
				/>
			)}
		</li>
	);
}

export default ThreeLinesListItem;
