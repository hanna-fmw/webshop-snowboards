'use client'
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import NavLink from '../../atoms/navLink/NavLink'
import hamburgerMenu from '../../../../public/icons/hamburger_menu_mobile.png'
import logotype from '../../../../public/logo/logo.svg'
import cart from '../../../../public/icons/cart.png'
import CurrencyDropdown from '../../atoms/currencyDropdown/CurrencyDropdown'
import { useModal } from '@/app/context/ModalContext'
import Modal from '../modal/Modal'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type NavbarProps = {
	children?: React.ReactNode
}

type ContextProps = {
	isOpen: boolean
	openModal: () => void
}

const Navbar = ({ children }: NavbarProps) => {
	const { isOpen, openModal }: ContextProps = useModal()
	const pathName = usePathname()
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
					<Link href='/'>
						<Image src={logotype} width={157} height={26} alt='TUR Logotype' className={styles.logo} />
					</Link>
				</li>

				<li className={`${styles.li} ${styles.link}`}>
					{' '}
					<Link href='/' className={`${pathName === '/' ? styles.active : ''}`}>
						[a]. HOME
					</Link>
				</li>
				<li className={`${styles.li} ${styles.link}`}>
					{' '}
					<Link href='/shop' className={`${pathName === '/shop' ? styles.active : ''}`}>
						[b]. SHOP
					</Link>
				</li>
				<li className={`${styles.li} ${styles.link}`}>
					<Link href='/about' className={`${pathName === '/about' ? styles.active : ''}`}>
						[c]. ABOUT
					</Link>
				</li>
				<li className={`${styles.li} ${styles.link}`}>
					{' '}
					<Link href='/support' className={`${pathName === '/support' ? styles.active : ''}`}>
						[d]. SUPPORT
					</Link>
				</li>

				{/* {children} */}

				<li className={styles.li}>
					<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' onClick={openModal} />
					{isOpen && <Modal />}
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
