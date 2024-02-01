'use client'

import { createContext, useContext, useState } from 'react'

type ModalContextProps = {
	isOpen: boolean
	openModal: () => void
	closeModal: () => void
}

type ModalProvider = {
	children: React.ReactNode
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider = ({ children }: ModalProvider) => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		document.body.classList.add('modalOpen')
		setIsOpen(true)
	}

	const closeModal = () => {
		document.body.classList.remove('modalOpen')
		setIsOpen(false)
	}

	return <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
	return useContext(ModalContext)
}
