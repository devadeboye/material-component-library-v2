import { useState, useEffect } from "react";
import style from "./slideShow.module.css";

interface SliceshowProps {
	contents: number[] | string[] | React.ReactNode[];
	interval?: number;
}

const Slideshow = ({ contents, interval = 3000 }: SliceshowProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const dots = [];

	useEffect(() => {
		const slideInterval = setInterval(() => {
			// Calculate the next index, returns to zero if index overflow
			setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
		}, interval);

		return () => {
			clearInterval(slideInterval);
		};
	}, [contents, interval]);

	for (let index = 0; index < contents.length; index++) {
		dots.push(
			<span
				className={`${style.dot} ${index === currentIndex ? style.active : ""}`}
				key={index}
			></span>
		);
	}

	return (
		<div>
			<div className="slideshow">
				{contents.map((content, index) => (
					<div
						key={index}
						className={`${style.slide} ${
							index === currentIndex ? style["active-slide"] : ""
						}`}
					>
						{content}
					</div>
				))}
			</div>

			<br />
			<div style={{ textAlign: "center" }}>{dots}</div>
		</div>
	);
};

export default Slideshow;
