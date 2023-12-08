import Divider, { DividerStyleEnum } from "./Divider";
import React from "react";

export enum ListItemConditionEnum {
	oneLine = "one-line",
	twoLines = "two-lines",
	threeLines = "three-lines",
}

interface OneLineListItemProps {
	leading: string;
	headline: string;
	trailing: string;
	className: string;
	divider: boolean;
	dividerStyle: DividerStyleEnum | undefined;
	marginAfterDivider: boolean | undefined;
}

function OneLineListItem({
	leading,
	headline,
	trailing,
	className,
	divider,
	dividerStyle,
	marginAfterDivider,
}: OneLineListItemProps) {
	return (
		<li className="list-none box-border">
			<div
				className={`flex flex-row gap-5 h-14 items-center pl-3 pr-1 body-large ${className}`}
			>
				{leading && (
					<div className="w-1/12">
						<img src={leading} alt="leading-icon" />
					</div>
				)}

				<div className={`${leading ? "w-4/5" : "w-11/12"}`}>{headline}</div>

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

export default OneLineListItem;
