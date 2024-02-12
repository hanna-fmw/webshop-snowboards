'use client'

import { createContext, useContext, useState } from 'react'

type ModalContextProps = {
	isModalOpen: boolean
	openModal: () => void
	closeModal: () => void
}

type ModalProviderProps = {
	children: React.ReactNode
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		// document.body.classList.add('modalOpen')
		setIsModalOpen(true)
	}

	const closeModal = () => {
		// document.body.classList.remove('modalOpen')
		setIsModalOpen(false)
	}

	return <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
	return useContext(ModalContext)
}
