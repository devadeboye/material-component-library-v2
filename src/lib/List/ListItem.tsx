import Divider, { DividerStyleEnum } from "./Divider";
import React from "react";

interface ListItemProps {
	leading: string;
	value: string;
	trailing: string;
	className: string;
	divider: boolean;
	dividerStyle: DividerStyleEnum | undefined;
	marginAfterDivider: boolean | undefined;
}

function ListItem(props: ListItemProps) {
	return (
		<li className="list-none box-border">
			<div
				className={`flex flex-row gap-5 h-14 items-center pl-3 pr-1 body-large ${props.className}`}
			>
				{props.leading && (
					<div className="w-1/12">
						<img src={props.leading} alt="leading-icon" />
					</div>
				)}

				<div className={`${props.leading ? "w-4/5" : "w-11/12"}`}>
					{props.value}
				</div>

				{props.trailing && (
					<div className="w-1/12">
						<img src={props.trailing} alt="trailing-icon" />
					</div>
				)}
			</div>
			{props.divider && props.dividerStyle && (
				<Divider
					dividerStyle={props.dividerStyle}
					marginAfterDivider={props.marginAfterDivider}
				/>
			)}
		</li>
	);
}

export default ListItem;
