import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
	onHideOverlay: () => void;
	backdropColour: string;
	topMargin: string;
	leftMargin: string;
}
interface ModalOverlayProps {
	children: ReactNode | ReactNode[];
	maxHeight: string;
}
interface ModalProps {
	onHideOverlay: () => void;
	children: ReactNode | ReactNode[];
	overlayRoot: string;
	backdropColour?: string;
	maxHeight?: string;
	topMargin?: string;
	leftMargin?: string;
}

const Backdrop = ({
	onHideOverlay,
	backdropColour,
	topMargin,
	leftMargin,
}: BackdropProps) => {
	return (
		<div
			className={`fixed z-10 w-full h-screen ${topMargin} ${leftMargin} ${backdropColour}`}
			onClick={onHideOverlay}
		/>
	);
};

const ModalOverlay = ({ children, maxHeight }: ModalOverlayProps) => {
	return (
		<div
			className={`fixed top-[30vh] left-[30%] w-2/5 z-50 overflow-scroll bg-light-surface rounded-lg ${maxHeight}`}
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
 *
 * @returns
 */
const Modal = ({
	onHideOverlay,
	children,
	overlayRoot,
	backdropColour = "bg-dark-scrim/75",
	maxHeight = "max-h-[60%]",
	topMargin = "top-0",
	leftMargin = "left-0",
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
					topMargin={topMargin}
					leftMargin={leftMargin}
				/>,
				modalOverlayRoot
			)}

			{ReactDOM.createPortal(
				<ModalOverlay maxHeight={maxHeight}>{children}</ModalOverlay>,
				modalOverlayRoot
			)}
		</Fragment>
	);
};

export default Modal;
