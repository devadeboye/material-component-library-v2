import React, { useState } from "react";
import "./App.css";

import SegmentedButton, {
	SegmentedButtonStyleEnum,
	SegmentedButtonSizeEnum,
} from "./lib/Button/SegmentedButton";

function App() {
	// const [activeButton, setActiveButton] = useState<SegmentedButtonState>({
	// 	first: true,
	// 	second: false,
	// 	third: false,
	// 	fourth: false,
	// 	fifth: false,
	// });
	const [activeButton, setActiveButton] = useState({
		first: true,
		second: false,
		third: false,
		fourth: false,
		fifth: false,
	});

	return (
		<div className="App">
			{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

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
	);
}

export default App;
