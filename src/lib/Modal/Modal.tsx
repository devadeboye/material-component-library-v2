import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
	onHideOverlay: () => void;
	backdropColour: string;
}
interface ModalOverlayProps {
	children: ReactNode | ReactNode[];
}
interface ModalProps {
	onHideOverlay: () => void;
	children: ReactNode | ReactNode[];
	overlayRoot: string;
	backdropColour?: string;
}

const Backdrop = ({ onHideOverlay, backdropColour }: BackdropProps) => {
	return (
		<div
			className={`fixed top-0 left-0 z-10 w-full h-screen ${backdropColour}`}
			onClick={onHideOverlay}
		/>
	);
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
	return (
		<div className="fixed top-[30vh] left-[30%] w-2/5 z-50 overflow-hidden bg-light-surface rounded-lg">
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
				<ModalOverlay>{children}</ModalOverlay>,
				modalOverlayRoot
			)}
		</Fragment>
	);
};

export default Modal;
