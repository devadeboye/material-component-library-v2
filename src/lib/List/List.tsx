import React from "react";
import { DividerStyleEnum } from "./Divider";
import OneLineListItem from "./oneLineListItem";
import TwoLineListItem from "./twoLineListItem";
import ThreeLinesListItem from "./treeLinesListItem";

export enum ListItemConditionEnum {
	oneLine = "one-line",
	twoLines = "two-lines",
	threeLines = "three-lines",
}

interface ListProps {
	className?: string;
	items: string[];
	leading: string;
	trailing: string;
	divider: boolean;
	dividerStyle: {
		type: DividerStyleEnum;
		marginAfterDivider: boolean;
	};
	condition?: ListItemConditionEnum;
	overline?: boolean;
	supportingText?: boolean;
}

/**
 * @param className are custom css classes you want to pass to the list
 * @param leading this indicate if the list item is going to have a leading icon. its optional and it defaults to empty string
 * @param headline this is the main content in the list item
 * @param trailing this indicate if the list item is going to have a trailing icon. its optional and it defaults to empty string
 * @param divider this indicates if the list is going to be seperated by dividers
 * @param dividerStyle.type this describe the type of divider. values can be full-width, inset, middle-inset
 * @param dividerStyle.marginAfterDivider this determines if there is going to be a margin after the divider or not
 * @param items is the array of items to display in the list
 * @param condition this describe the type of list item. it can be one-line, two-lines, three-lines
 * @param overline this indicate if overline should be shown on the list item. NOTE: when overline is shown, supporting text cannot be shown. only the headline and the overline will be shown. Also overline only exist on two-line list items
 * @param supportingText this is an accompanying text displayed with the headline. it further explains the headline
 *
 * @returns
 */
const List = ({
	className,
	items,
	leading,
	trailing,
	divider,
	dividerStyle,
	condition = ListItemConditionEnum.oneLine,
	overline = false,
	supportingText = false,
}: ListProps) => {
	const listItems: JSX.Element[] = [];
	const twoOrThreeLinesListItem =
		condition === ListItemConditionEnum.twoLines ||
		condition === ListItemConditionEnum.threeLines;
	if (twoOrThreeLinesListItem) supportingText = true;

	for (let i = 0; i < items.length; i++) {
		const lastItem = i + 1 === items.length;
		listItems.push(
			condition === ListItemConditionEnum.oneLine ? (
				<OneLineListItem
					key={i}
					leading={leading}
					headline={items[i]}
					trailing={trailing}
					className="bg-light-surface text-light-onSurface"
					divider={lastItem ? false : divider}
					dividerStyle={dividerStyle.type}
					marginAfterDivider={dividerStyle.marginAfterDivider}
				/>
			) : condition === ListItemConditionEnum.twoLines || overline ? (
				<TwoLineListItem
					key={i}
					leading={leading}
					headline={items[i]}
					trailing={trailing}
					className="bg-light-surface text-light-onSurface"
					divider={lastItem ? false : divider}
					dividerStyle={dividerStyle.type}
					marginAfterDivider={dividerStyle.marginAfterDivider}
					overline={overline}
				/> // TODO these are dummy params for now
			) : (
				<ThreeLinesListItem />
			)
		);
	}

	return (
		<ul className={`bg-light-surface box-border ${className && className}`}>
			{listItems}
		</ul>
	);
};

export default List;
