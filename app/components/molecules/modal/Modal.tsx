'use client'
import React from 'react'
import styles from './modal.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useModal } from '@/app/context/modalContext'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type ModalProps = {
	children?: React.ReactNode
	link?: string
}

type ModalContextProps = {
	closeModal: () => void
}

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		opacity: 1,

		transition: {
			staggerChildren: 0.4,
			duration: 0.8,
		},
	},
}

const childrenVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
}

const links = [
	{
		href: '/',
		label: '[a].HOME',
	},
	{
		href: '/shop',
		label: '[b].SHOP',
	},
	{
		href: '/about',
		label: '[c].ABOUT',
	},
	{
		href: '/support',
		label: '[d].SUPPORT',
	},
]

const Modal = ({ link, children }: ModalProps) => {
	const { closeModal, isModalOpen }: ModalContextProps = useModal()

	useEffect(() => {
		// Add the style to body and html elements when the modal is opened
		// document.body.style.overflowY = 'hidden'
		// document.documentElement.style.overflowY = 'hidden'
		//Or:
		document.body.style.overflowY = isModalOpen ? 'hidden' : 'auto'

		return () => {
			// Remove the style when the modal is closed
			document.body.style.overflowY = 'auto'
			document.documentElement.style.overflowY = 'auto'
		}
	}, [closeModal, isModalOpen])

	return (
		<section>
			<div className={styles.modalOverlay}>
				<IoCloseOutline size={25} onClick={closeModal} className={styles.closeBtn} />
				<motion.div className={styles.links} variants={parentVariants} initial='initial' animate='animate'>
					{links.map((link, i) => {
						return (
							<motion.div key={i} variants={childrenVariants}>
								<Link href={link.href} onClick={closeModal} className={styles.link}>
									{link.label}
								</Link>
							</motion.div>
						)
					})}
					{/* <motion.div key='1' variants={childrenVariants}>
					<Link href='/' onClick={closeModal} className={styles.link}>
						[a].HOME{' '}
					</Link>
				</motion.div>
				<motion.div key='2' variants={childrenVariants}>
					<Link href='/shop' onClick={closeModal} className={styles.link}>
						[b].SHOP
					</Link>
				</motion.div>
				<motion.div key='3' variants={childrenVariants}>
					<Link href='/about' onClick={closeModal} className={styles.link}>
						[c].ABOUT
					</Link>
				</motion.div>
				<motion.div key='4' variants={childrenVariants}>
					<Link href='/support' onClick={closeModal} className={styles.link}>
						[d].SUPPORT
					</Link>
				</motion.div> */}
				</motion.div>
			</div>
		</section>
	)
}

export default Modal
