'use client';
import React from 'react';
import styles from './modal.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';
// import { useModal } from '../../../../app/context/modalContext';
import { useModal } from '@/app/context/modalContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

type ModalProps = {
	children?: React.ReactNode;
	link?: string;
};

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
			ease: 'easeIn',
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

	useEffect(() => {
		document.body.style.overflowY = isModalOpen ? 'hidden' : 'auto';

		return () => {
			document.body.style.overflowY = 'auto';
			document.documentElement.style.overflowY = 'auto';
		};
	}, [closeModal, isModalOpen]);

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
			</AnimatePresence>
		</section>
	);
};

export default Modal;
