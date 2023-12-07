import { DividerStyleEnum } from "./Divider";
import ListItem from "./ListItem";

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
}

const List = (props: ListProps) => {
	const items: JSX.Element[] = [];

	for (let i = 0; i < props.items.length; i++) {
		const lastItem = i + 1 === props.items.length;
		items.push(
			<ListItem
				key={i}
				leading={props.leading}
				value={props.items[i]}
				trailing={props.trailing}
				className="bg-light-surface text-light-onSurface"
				divider={lastItem ? false : props.divider}
				dividerStyle={props.dividerStyle.type}
				marginAfterDivider={props.dividerStyle.marginAfterDivider}
			/>
		);
	}

	return (
		<ul
			className={`bg-light-surface box-border ${
				props.className && props.className
			}`}
		>
			{items}
		</ul>
	);
};

export default List;
