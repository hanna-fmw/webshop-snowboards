'use client';
import React from 'react';
import styles from './modal.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';
////Denna funkar inte med Storybook: Denna funkar inte pga Storybook: import { useModal } from '@/app/context/modalContext'
import { useModal } from '../../../../app/context/modalContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

type ModalProps = {
	children?: React.ReactNode;
	link?: string;
};

// type ModalContextProps = {
// 	closeModal: () => void
// }

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
];

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		opacity: 1,

		transition: {
			staggerChildren: 0.4,
			duration: 0.8,
		},
	},
};

const childrenVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
};

const Modal = ({ link, children }: ModalProps) => {
	const context = useModal()!;
	const { closeModal, isModalOpen, setIsModalOpen } = context || {};
	// const { closeModal, isModalOpen }: ModalContextProps = useModal()

	useEffect(() => {
		// Add the style to body and html elements when the modal is opened
		// document.body.style.overflowY = 'hidden'
		// document.documentElement.style.overflowY = 'hidden'
		//Or:
		document.body.style.overflowY = isModalOpen ? 'hidden' : 'auto';

		return () => {
			// Remove the style when the modal is closed
			document.body.style.overflowY = 'auto';
			document.documentElement.style.overflowY = 'auto';
		};
	}, [closeModal, isModalOpen]);

	useEffect(() => {
		// This code block will execute when the component mounts
		// You can log a message here to indicate that the component has mounted
		console.log('Modal component mounted');

		// Return a cleanup function
		return () => {
			// This code block will execute when the component unmounts
			// You can log a message here to indicate that the component has unmounted
			console.log('Modal component unmounted');
		};
	}, []);

	// const MODAL_WIDTH = 560

	return (
		<section>
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						key='modal'
						className={styles.modalOverlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.4 } }}
						exit={{ opacity: 0, transition: { duration: 1.5 } }}>
						<motion.div className={styles.links} variants={parentVariants} initial='initial' animate='animate'>
							{links.map((link, i) => {
								return (
									<motion.div
										key={i}
										variants={childrenVariants}
										exit={{ transition: { staggerChildren: 0.4, duration: 0.8, staggerDirection: -1 } }}>
										<Link href={link.href} onClick={() => setIsModalOpen(false)} className={styles.link}>
											{link.label}
										</Link>
									</motion.div>
								);
							})}
							<IoCloseOutline size={25} onClick={() => setIsModalOpen(false)} className={styles.closeBtn} />
						</motion.div>
					</motion.div>
				)}
				{/* {isModalOpen && (
					<>
						<motion.div
							// key='modal'
							// className={styles.modalOverlay}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ ease: 'easeInOut' }}
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								zIndex: 99,
								background: 'rgba(0,0,0,.3)',
							}}></motion.div>

						<motion.div
							transition={{ ease: 'easeInOut' }}
							initial={{ right: -MODAL_WIDTH }}							
							animate={{ right: 0 }}
							exit={{ right: -MODAL_WIDTH, transition: { duration: 1 } }}
							style={{
								position: 'fixed',
								height: '100%',
								width: MODAL_WIDTH,
								background: 'white',
								right: 0,
								top: 0,
								zIndex: 200,
							}}>
							{links.map((link, i) => {
								return (
									<motion.div
										key={i}
										variants={childrenVariants}
										exit={{ transition: { staggerChildren: 0.4, duration: 0.8, staggerDirection: -1 } }}
									>
										<Link href={link.href} onClick={() => setIsModalOpen(false)} className={styles.link} style={{ color: 'black' }}>
											{link.label}
										</Link>
									</motion.div>
								)
							})}
							
							<button onClick={() => setIsModalOpen(false)} className={styles.closeBtn} style={{ backgroundColor: 'blue' }}>
								Close
							</button>
						</motion.div>
					</>
				)} */}
			</AnimatePresence>
		</section>
	);
};

export default Modal;
