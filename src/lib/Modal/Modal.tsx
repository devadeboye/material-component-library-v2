import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
	onHideOverlay: () => void;
	backdropColour: string;
}
interface ModalOverlayProps {
	children: ReactNode | ReactNode[];
	maxHeight: string;
	topPosition: string;
	leftPosition: string;
	width: string;
}
interface ModalProps {
	onHideOverlay: () => void;
	children: ReactNode | ReactNode[];
	overlayRoot: string;
	backdropColour?: string;
	maxHeight?: string;
	topPosition?: string;
	leftPosition?: string;
	width?: string;
}

const Backdrop = ({ onHideOverlay, backdropColour }: BackdropProps) => {
	return (
		<div
			className={`fixed z-10 w-full h-screen ${backdropColour}`}
			onClick={onHideOverlay}
		/>
	);
};

const ModalOverlay = ({
	children,
	maxHeight,
	topPosition,
	leftPosition,
	width,
}: ModalOverlayProps) => {
	return (
		<div
			className={`fixed ${topPosition} ${leftPosition} ${width} z-50 overflow-hidden bg-light-surface rounded-lg ${maxHeight}`}
		>
			{children}
		</div>
	);
};

/**
 *
 * @param onHideOverlay *(func)* this is a callback function that contains logic to hide the overlay on click
 * @param children *(ReactNode | ReactNode[])* this are the elements to display in the modal
 * @param overlayRoot *(string)* location in the dom where the modal should be displayed... its a string
 * @param backdropColour *(string)* optional tailwindcss class to be used to style the backdrop colour. It should be passed with its opacity value e.g bg-dark-scrim/75. it defaults to black at 75% opacity
 * @param maxHeight *(string)* maximum height of the modal
 * @param topPosition *(string)* the position of the modal on the top side of the screen
 * @param leftPosition *(string)* the position of the modal on the left side of the screen
 *
 * @returns
 */
const Modal = ({
	onHideOverlay,
	children,
	overlayRoot,
	backdropColour = "bg-dark-scrim/75",
	maxHeight = "max-h-[70%] sm:max-h-[60%]",
	topPosition = "top-[32vh] sm:top-[30vh]",
	leftPosition = "left-0 sm:left-[30%]",
	width = "w-full sm:w-2/5",
}: ModalProps) => {
	const modalOverlayRoot = document.getElementById(overlayRoot);
	if (!modalOverlayRoot) {
		throw new Error("please provide modal overlay root");
	}

	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop
					onHideOverlay={onHideOverlay}
					backdropColour={backdropColour}
				/>,
				modalOverlayRoot
			)}

			{ReactDOM.createPortal(
				<ModalOverlay
					maxHeight={maxHeight}
					width={width}
					topPosition={topPosition}
					leftPosition={leftPosition}
				>
					{children}
				</ModalOverlay>,
				modalOverlayRoot
			)}
		</Fragment>
	);
};

export default Modal;
