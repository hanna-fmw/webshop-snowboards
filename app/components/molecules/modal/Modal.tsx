'use client'
import React from 'react'
import styles from './modal.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useModal } from '@/app/context/ModalContext'

type ModalProps = {
	children?: React.ReactNode
	link?: string
}

type ModalContextProps = {
	closeModal: () => void
}

const Modal = ({ link, children }: ModalProps) => {
	const { closeModal }: ModalContextProps = useModal()

	return (
		<div className={styles.modalOverlay}>
			<IoCloseOutline size={25} onClick={closeModal} className={styles.closeBtn} />
			<div className={styles.links}>
				<Link href='/' onClick={closeModal} className={styles.link}>
					[a].HOME{' '}
				</Link>
				<Link href='/shop' onClick={closeModal} className={styles.link}>
					[b].SHOP
				</Link>
				<Link href='/about' onClick={closeModal} className={styles.link}>
					[c].ABOUT
				</Link>
				<Link href='/support' onClick={closeModal} className={styles.link}>
					[d].SUPPORT
				</Link>
			</div>
		</div>
	)
}

export default Modal
