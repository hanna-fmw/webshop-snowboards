import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import NavLink from '../../atoms/navLink/NavLink'
import hamburgerMenu from '../../../../public/icons/hamburger_menu_mobile.png'
import logotype from '../../../../public/logo/logo.png'
import cart from '../../../../public/icons/cart.png'
import CurrencyDropdown from '../../atoms/currencyDropdown/CurrencyDropdown'

type NavbarProps = {
	children?: React.ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
	return (
		<nav className={styles.navContainer}>
			<Image src={logotype} width={157} height={26} alt='TUR Logotype' className={styles.logo} />
			<div className={styles.navItems}>
				<div className={styles.navLinks}>
					<NavLink url='/'>[a]. HOME</NavLink>
					<NavLink url='/'>[b]. SHOP</NavLink>
					<NavLink url='/about'>[c]. ABOUT</NavLink>
					<NavLink url='/'>[d]. SUPPORT</NavLink>
				</div>
				{/* {children} */}

				<div className={styles.cartContainer}>
					<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' />
					<CurrencyDropdown />
					<div className={styles.cart}>
						<Image src={cart} width={15} height={17} alt='Cart icon' />
						<small className={styles.cartItemCount}>[7]</small>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
