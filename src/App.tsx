import React, { useState } from "react";
import "./App.css";

import SegmentedButton, {
	SegmentedButtonStyleEnum,
	SegmentedButtonSizeEnum,
} from "./lib/Button/SegmentedButton";
import { SegmentedButtonState } from "./lib/Button/interfaces/button.interface";
import Button, { ButtonStyleEnum } from "./lib/Button/Button";
import List, { ItemDto, ListItemConditionEnum } from "./lib/List/List";
import { DividerStyleEnum } from "./lib/List/Divider";
import TextField from "./lib/TextField/TextField";
import { inputTypeEnum } from "./lib/TextField/TextFieldInputBox";
import { histories } from "./constant";
import Slideshow from "./lib/slideShow/slideShow";
import Modal from "./lib/Modal/Modal";

type HistoryType = (typeof histories)[0];

function formatListData(): ItemDto<HistoryType>[] {
	const data: ItemDto<HistoryType>[] = [
		{
			headline: histories[0].workload.toString(),
			overline: "workload",
			id: histories[0].id,
			meta: histories[0],
		},
	];
	for (const [key, value] of Object.entries(histories[0].estimateResult)) {
		if (key !== "powerInverterBatteryCable")
			data.push({
				headline: value.toString(),
				overline: key,
				id: key,
				meta: histories[0],
			});
	}
	return data;
}

function App() {
	const [activeButton, setActiveButton] = useState<SegmentedButtonState>({
		first: true,
		second: false,
		third: false,
		fourth: false,
		fifth: false,
	});
	const [textFieldState, setTextFieldState] = useState({
		focused: false,
		changed: false,
		error: {
			isError: false,
			message: "",
		},
	});
	const [showModal, setShowModal] = useState(false);

	function showModalClickHandler(status: boolean) {
		setShowModal(status);
	}

	function textFieldInputValidator() {
		setTextFieldState((prevState) => {
			return {
				...prevState,
				error: { isError: true, message: "please fill in some value" },
			};
		});
	}

	const oneLineListData = histories.map((history) => {
		return { headline: history.name, id: history.id, meta: history };
	});
	const twoLineListData = [];

	function listItemClickHandler(id: string | number) {
		alert(`list item id is ${id}`);
	}

	return (
		<div className="w-1/2 box-border mx-5">
			<h1>Component Gallery</h1>

			<div className="">
				<h3>Segmented Button</h3>
				<SegmentedButton
					className="px-5 w-9/12 mt-[5.3rem] sm:mt-0 min-w-full"
					size={SegmentedButtonSizeEnum.two}
					style={SegmentedButtonStyleEnum.fullyRound}
					buttonState={activeButton}
					buttonStateUpdater={setActiveButton}
					buttonsConfiguration={{
						firstButton: {
							name: "Projects",
							icon: "",
							callback: () => {},
						},
						fifthButton: {
							name: "New",
							icon: "",
							callback: () => {},
						},
					}}
				/>
				h
			</div>
			<br></br>

			<div>
				<h3>Button</h3>
				<Button
					name="Add"
					className=""
					style={ButtonStyleEnum.outlined}
					onClick={() => console.log("add button clicked")}
					width="w-20"
				/>
				<br />
				<Button
					name="Disabled"
					className=""
					style={ButtonStyleEnum.outlined}
					onClick={() => console.log("add button clicked")}
					width="w-20"
					disabled={true}
				/>
			</div>
			<br></br>

			<div>
				<h3>List</h3>
				<h4>One-line list</h4>
				<List
					className="h-full"
					leading=""
					trailing={""}
					divider={true}
					dividerStyle={{
						type: DividerStyleEnum.middleInset,
						marginAfterDivider: false,
					}}
					items={oneLineListData}
					condition={ListItemConditionEnum.oneLine}
					onListItemClick={listItemClickHandler}
				/>

				<br></br>
				<h4>two-line list</h4>
				<List
					className="h-full"
					leading=""
					trailing={""}
					divider={true}
					dividerStyle={{
						type: DividerStyleEnum.middleInset,
						marginAfterDivider: false,
					}}
					items={formatListData()}
					condition={ListItemConditionEnum.twoLines}
				/>
			</div>

			<div>
				<h3>TextField</h3>
				<TextField
					leading={undefined}
					label="Device name"
					supportingText="Name of electrical appliance"
					trailing={undefined}
					contentType={inputTypeEnum.text}
					className="my-2"
					onBlur={(event) => {
						textFieldInputValidator();
					}}
					state={{ value: textFieldState, setValue: setTextFieldState }}
				/>
			</div>

			<div>
				<h3>Slider</h3>
				<Slideshow contents={[1, 2, 3]} />
			</div>

			<div>
				<h1>modal</h1>
				<Button
					name="Show Modal"
					className=""
					style={ButtonStyleEnum.outlined}
					onClick={() => showModalClickHandler(true)}
					width="w-28"
				/>
				{showModal && (
					<Modal
						onHideOverlay={() => showModalClickHandler(false)}
						overlayRoot="overlay-root"
						backdropColour="bg-light-primary/75"
					>
						<TextField
							leading={undefined}
							label="Device name"
							supportingText="Name of electrical appliance"
							trailing={undefined}
							contentType={inputTypeEnum.text}
							className="my-2"
							onBlur={(event) => {}}
							// value="ApplianceName"
							state={{ value: textFieldState, setValue: setTextFieldState }}
						/>
						<List
							className="h-full"
							leading=""
							trailing={""}
							divider={true}
							dividerStyle={{
								type: DividerStyleEnum.middleInset,
								marginAfterDivider: false,
							}}
							items={formatListData()}
							condition={ListItemConditionEnum.twoLines}
						/>
						<List
							className="h-full"
							leading=""
							trailing={""}
							divider={true}
							dividerStyle={{
								type: DividerStyleEnum.middleInset,
								marginAfterDivider: false,
							}}
							items={formatListData()}
							condition={ListItemConditionEnum.twoLines}
						/>
					</Modal>
				)}
			</div>
			<br></br>
			<br></br>
		</div>
	);
}

export default App;
