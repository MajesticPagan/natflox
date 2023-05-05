import { create } from "zustand";

export interface ModalStoreProps {
	movieId?: string;
	isOpen: boolean;
	onOpen: (movieId: string) => void;
	onClose: () => void;
}

const useInfoModal = create<ModalStoreProps>((set) => ({
	movieId: undefined,
	isOpen: false,
	onOpen: (movieId: string) => set({ isOpen: true, movieId }),
	onClose: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;
