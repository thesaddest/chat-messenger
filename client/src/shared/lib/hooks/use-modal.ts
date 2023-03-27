import { useState, useCallback, SyntheticEvent } from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>("");
    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
        setModalError("");
    }, []);

    return { isModalOpen, showModal, handleCancel, modalError, setModalError, setIsModalOpen };
};
