import React from "react";
import Divider, { DividerStyleEnum } from "./Divider";
import { ItemDto } from "./List";

interface OneLineListItemProps<T> {
	id: string | number;
	leading: string;
	headline: string;
	trailing: string;
	className: string;
	divider: boolean;
	dividerStyle: DividerStyleEnum | undefined;
	marginAfterDivider: boolean | undefined;
	onClick?: (id: string | number, metadata: T) => void;
	metadata: ItemDto<T>;
}

function OneLineListItem<T>({
	id,
	leading,
	headline,
	trailing,
	className,
	divider,
	dividerStyle,
	marginAfterDivider,
	onClick = () => {},
	metadata,
}: OneLineListItemProps<T>) {
	function onClickHandler(event: React.MouseEvent<HTMLElement>) {
		const { meta } = metadata;
		event.preventDefault();

		onClick(id, meta);
	}

	return (
		<li className="list-none box-border" onClick={onClickHandler}>
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
