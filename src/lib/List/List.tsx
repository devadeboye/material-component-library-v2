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

export interface ItemDto<T> {
	id: string | number;
	headline: string;
	overline?: string;
	supportingText?: string;
	meta: T;
}

interface ListProps<T> {
	className?: string;
	items: ItemDto<T>[];
	leading: string;
	trailing: string;
	divider: boolean;
	dividerStyle: {
		type: DividerStyleEnum;
		marginAfterDivider: boolean;
	};
	condition?: ListItemConditionEnum;
	onListItemClick?: (id: string | number, metadata: T) => void;
}

/**
 * Lists are continuous, vertical indexes of text and images
 *
 * @param {Object} props - The properties for the Segmented button.
 * @param {string} [props.className] - Additional classes for the list
 * @param {string} props.leading - Icon to display at the beginging of each list item. Its optional and it defaults to empty string
 * @param {string} props.trailing - Icon to display at the end of each list item. Its optional and it defaults to empty string
 * @param {boolean} props.divider - This indicates if the list is going to be seperated by dividers
 * @param {Array<ItemDto>} props.items - is the array of items to display in the list
 * @param {string | number} props.items.id - The id for each list item. This is necessary incases where you need to reference each item in the list uniquely
 * @param {string} props.items.headline - This is the main content in the list item
 * @param {string} props.items.[overline] - An overline drawing attention to the list item
 * @param {string} props.items.[supportingText] - Text explaining the list item
 * @param {GenericType} props.items.meta - Additional information about the list item
 * @param {Object} props.dividerStyle - Additional information about the list item
 * @param {string} props.dividerStyle.type - this describe the type of divider. values can be full-width, inset, middle-inset
 * @param {boolean} props.dividerStyle.marginAfterDivider - this determines if there is going to be a margin after the divider or not
 * @param {string} [props.condition] - this describe the type of list item. it can be one-line, two-lines, three-lines
 * @param {function} [props.onListItemClick] - this is an optional function to call on each list item when clicked. The list item component is going to pass the id of the item on this component to your click event handler. This can be used to handle things like deleting list item.
 *
 * @returns {JSX.Element} The List component.
 */
const List = <T,>({
	className,
	items,
	leading,
	trailing,
	divider,
	dividerStyle,
	condition = ListItemConditionEnum.oneLine,
	onListItemClick = () => {},
}: ListProps<T>) => {
	const listItems: JSX.Element[] = [];

	for (let i = 0; i < items.length; i++) {
		const lastItem = i + 1 === items.length;
		listItems.push(
			condition === ListItemConditionEnum.oneLine ? (
				<OneLineListItem
					id={items[i].id}
					key={items[i].id}
					leading={leading}
					headline={items[i].headline}
					trailing={trailing}
					className="bg-light-surface text-light-onSurface"
					divider={lastItem ? false : divider}
					dividerStyle={dividerStyle.type}
					marginAfterDivider={dividerStyle.marginAfterDivider}
					metadata={items[i]}
					onClick={onListItemClick}
				/>
			) : condition === ListItemConditionEnum.twoLines ? (
				<TwoLineListItem
					key={items[i].id}
					leading={leading}
					headline={items[i].headline}
					trailing={trailing}
					className="bg-light-surface text-light-onSurface"
					divider={lastItem ? false : divider}
					dividerStyle={dividerStyle.type}
					marginAfterDivider={dividerStyle.marginAfterDivider}
					overline={items[i].overline}
					supportingText={items[i].supportingText}
				/> // TODO these are dummy params for now
			) : (
				<ThreeLinesListItem
					key={items[i].id}
					leading={leading}
					headline={items[i].headline}
					trailing={trailing}
					className="bg-light-surface text-light-onSurface"
					divider={lastItem ? false : divider}
					dividerStyle={dividerStyle.type}
					marginAfterDivider={dividerStyle.marginAfterDivider}
					supportingText={items[i].supportingText}
				/>
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
