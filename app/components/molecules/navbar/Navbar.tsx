'use client'
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import NavLink from '../../atoms/navLink/NavLink'
import hamburgerMenu from '../../../../public/icons/hamburger_menu_mobile.png'
import logotype from '../../../../public/logo/logo.png'
import cart from '../../../../public/icons/cart.png'
import CurrencyDropdown from '../../atoms/currencyDropdown/CurrencyDropdown'
import { useModal } from '@/app/context/ModalContext'
import Modal from '../modal/Modal'

type NavbarProps = {
	children?: React.ReactNode
}

type ContextProps = {
	isOpen: boolean
	openModal: () => void
}

const Navbar = ({ children }: NavbarProps) => {
	const { isOpen, openModal }: ContextProps = useModal()
	// const [isOpen, setIsOpen] = useState(false)

	// const openModal = () => {
	// 	document.body.classList.add('modalOpen');
	// 	setIsOpen(true)
	// }

	// const closeModal = () => {
	// 	document.body.classList.remove('modalOpen');
	// 	setIsOpen(false)
	// }

	return (
		<nav className={styles.nav}>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<NavLink url='/'>
						<Image src={logotype} width={157} height={26} alt='TUR Logotype' className={styles.logo} />
					</NavLink>
				</li>

				<li className={`${styles.li} ${styles.link}`}>
					{' '}
					<NavLink url='/'>[a]. HOME</NavLink>
				</li>
				<li className={`${styles.li} ${styles.link}`}>
					{' '}
					<NavLink url='/shop'>[b]. SHOP</NavLink>
				</li>
				<li className={`${styles.li} ${styles.link}`}>
					<NavLink url='/about'>[c]. ABOUT</NavLink>
				</li>
				<li className={`${styles.li} ${styles.link}`}>
					{' '}
					<NavLink url='/support'>[d]. SUPPORT</NavLink>
				</li>

				{/* {children} */}

				<li className={styles.li}>
					<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' onClick={openModal} />
					{isOpen && (
						<Modal />
						// <div className={styleModal.modalOverlay}>
						// 	<IoCloseOutline size={25} onClick={closeModal} className={styleModal.closeBtn} />
						// 	<div className={styleModal.links}>
						// 		<Link href='/' onClick={closeModal} className={styleModal.link}>
						// 			[a].HOME{' '}
						// 		</Link>
						// 		<Link href='/shop' onClick={closeModal} className={styleModal.link}>
						// 			[b].SHOP
						// 		</Link>
						// 		<Link href='/about' onClick={closeModal} className={styleModal.link}>
						// 			[c].ABOUT
						// 		</Link>
						// 		<Link href='/support' onClick={closeModal} className={styleModal.link}>
						// 			[d].SUPPORT
						// 		</Link>
						// 	</div>
						// </div>
					)}
				</li>

				<li className={`${styles.li} ${styles.currencyDropdown}`}>
					<CurrencyDropdown />
				</li>
				<li className={styles.li}>
					<Image src={cart} width={15} height={17} alt='Cart icon' />
					<small className={styles.cartItemCount}>[7]</small>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
