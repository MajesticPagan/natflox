"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
	isOpen?: boolean;
	body?: React.ReactElement;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, body, onClose }) => {
	const [showModal, setShowModal] = useState(isOpen);

	const handleClose = useCallback(() => {
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	const handleKeyDown = useCallback(
		(event: any) => {
			if (event.key === "Escape") {
				handleClose();
			}

			return;
		},
		[handleClose]
	);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	useEffect(() => {
		document.body.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto">
			<div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
				<div
					className={`${
						showModal ? "scale-100" : "scale-0"
					} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
				>
					{body}
					<button
						type="button"
						className="cursor-pointer absolute top-3 right-3 w-10 h-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
						onClick={handleClose}
					>
						<AiOutlineClose size={18} className="text-white" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
