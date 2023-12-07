import React, { useState } from "react";
import "./App.css";

import SegmentedButton, {
	SegmentedButtonStyleEnum,
	SegmentedButtonSizeEnum,
} from "./lib/Button/SegmentedButton";
import { SegmentedButtonState } from "./lib/Button/interfaces/button.interface";
import Button, { ButtonStyleEnum } from "./lib/Button/Button";
import List from "./lib/List/List";
import { DividerStyleEnum } from "./lib/List/Divider";
import TextField from "./lib/TextField/TextField";
import { inputTypeEnum } from "./lib/TextField/TextFieldInputBox";

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
	});

	const histories = [
		{
			name: "Babe home - macbook and phones - 10 hours",
			workload: 1508,
			appliances: [
				{
					applianceName: "macbook pro 2022",
					powerRating: 61,
					desiredRuntime: 10,
					applianceWattHour: 610,
				},
				{
					applianceName: "babe's phone",
					powerRating: 10,
					desiredRuntime: 10,
					applianceWattHour: 100,
				},
				{
					applianceName: "my iphone",
					powerRating: 45,
					desiredRuntime: 10,
					applianceWattHour: 450,
				},
			],
			estimateResult: {
				solarPanel: 377,
				battery: 247,
				chargeController: 38,
				inverter: 163,
				powerInverterBatteryCable: {
					continuousWatt: 600,
					maxInverterInputAmps: 80,
					fuseSize: 80,
					circuitBreaker: 80,
					wireSize: "2",
				},
			},
			createdAt: "2023-10-13T20:21:39.498Z",
			updatedAt: "2023-10-13T20:21:39.498Z",
			id: "6529a6d31c66c42acc633b63",
		},
		{
			name: "Babe home - macbook and phones - 5 hours",
			workload: 754,
			appliances: [
				{
					applianceName: "macbook pro 2022",
					powerRating: 61,
					desiredRuntime: 5,
					applianceWattHour: 305,
				},
				{
					applianceName: "babe's phone",
					powerRating: 10,
					desiredRuntime: 5,
					applianceWattHour: 50,
				},
				{
					applianceName: "my iphone",
					powerRating: 45,
					desiredRuntime: 5,
					applianceWattHour: 225,
				},
			],
			estimateResult: {
				solarPanel: 189,
				battery: 124,
				chargeController: 19,
				inverter: 163,
				powerInverterBatteryCable: {
					continuousWatt: 600,
					maxInverterInputAmps: 80,
					fuseSize: 80,
					circuitBreaker: 80,
					wireSize: "2",
				},
			},
			createdAt: "2023-10-13T20:22:19.522Z",
			updatedAt: "2023-10-13T20:22:19.522Z",
			id: "6529a6fb1c66c42acc633b65",
		},
		{
			name: "Babe home - full house - 10 hours",
			workload: 2691,
			appliances: [
				{
					applianceName: "macbook pro 2022",
					powerRating: 61,
					desiredRuntime: 10,
					applianceWattHour: 610,
				},
				{
					applianceName: "bro vic pc",
					powerRating: 61,
					desiredRuntime: 10,
					applianceWattHour: 610,
				},
				{
					applianceName: "babe's phone",
					powerRating: 10,
					desiredRuntime: 10,
					applianceWattHour: 100,
				},
				{
					applianceName: "my iphone",
					powerRating: 45,
					desiredRuntime: 10,
					applianceWattHour: 450,
				},
				{
					applianceName: "3 bulbs",
					powerRating: 30,
					desiredRuntime: 10,
					applianceWattHour: 300,
				},
			],
			estimateResult: {
				solarPanel: 673,
				battery: 440,
				chargeController: 68,
				inverter: 290,
				powerInverterBatteryCable: {
					continuousWatt: 600,
					maxInverterInputAmps: 80,
					fuseSize: 80,
					circuitBreaker: 80,
					wireSize: "2",
				},
			},
			createdAt: "2023-10-14T15:21:21.303Z",
			updatedAt: "2023-10-14T15:21:21.303Z",
			id: "652ab1f11c66c42acc633b67",
		},
		{
			name: "Babe home - two phones - 5 hours",
			workload: 228,
			appliances: [
				{
					applianceName: "my phone",
					powerRating: 25,
					desiredRuntime: 5,
					applianceWattHour: 125,
				},
				{
					applianceName: "babe phone",
					powerRating: 10,
					desiredRuntime: 5,
					applianceWattHour: 50,
				},
			],
			estimateResult: {
				solarPanel: 57,
				battery: 38,
				chargeController: 6,
				inverter: 49,
				powerInverterBatteryCable: {
					continuousWatt: 600,
					maxInverterInputAmps: 80,
					fuseSize: 80,
					circuitBreaker: 80,
					wireSize: "2",
				},
			},
			createdAt: "2023-10-14T16:06:09.805Z",
			updatedAt: "2023-10-14T16:06:09.805Z",
			id: "652abc711c66c42acc633b69",
		},
	];
	const projectNames = histories.map((history) => history.name);

	return (
		<div className="w-1/2 box-border mx-5">
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
			</div>

			<div>
				<h3>Button</h3>
				<Button
					name="Add"
					className="w-3"
					style={ButtonStyleEnum.outlined}
					onClick={() => {}}
				/>
			</div>

			<div>
				<h3>List</h3>
				<List
					className="h-full"
					leading=""
					trailing={""}
					divider={true}
					dividerStyle={{
						type: DividerStyleEnum.middleInset,
						marginAfterDivider: false,
					}}
					items={projectNames}
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
					onBlur={(event) => {}}
					value="ApplianceName"
					state={{ value: textFieldState, setValue: setTextFieldState }}
				/>
			</div>
		</div>
	);
}

export default App;
