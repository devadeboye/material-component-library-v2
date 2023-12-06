import React, { useState } from "react";
import "./App.css";

import SegmentedButton, {
	SegmentedButtonStyleEnum,
	SegmentedButtonSizeEnum,
} from "./lib/Button/SegmentedButton";
import { SegmentedButtonState } from "./lib/Button/interfaces/button.interface";
import Button, { ButtonStyleEnum } from "./lib/Button/Button";

function App() {
	const [activeButton, setActiveButton] = useState<SegmentedButtonState>({
		first: true,
		second: false,
		third: false,
		fourth: false,
		fifth: false,
	});
	// const [activeButton, setActiveButton] = useState({
	// 	first: true,
	// 	second: false,
	// 	third: false,
	// 	fourth: false,
	// 	fifth: false,
	// });

	return (
		<div className="App">
			<div className="w-20 max-w-20">
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
					className="w-10"
					style={ButtonStyleEnum.outlined}
					onClick={() => {}}
				/>
			</div>
		</div>
	);
}

export default App;
