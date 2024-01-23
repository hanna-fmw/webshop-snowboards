import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import NavLink from '../../atoms/navLink/NavLink'

const Navbar = () => {
	return (
		<nav className={styles.navContainer}>
			<Image src='/logo/logo.png' width={157} height={26} alt='TUR Logotype' />
			<div className={styles.navItems}>
				<div className={styles.navContainer}>
					<NavLink url='/'>[a]. HOME</NavLink>
					<NavLink url='/'>[b]. SHOP</NavLink>
					<NavLink url='/'>[c]. ABOUT</NavLink>
					<NavLink url='/'>[d]. SUPPORT</NavLink>
				</div>

				<div className={styles.cartItems}>
					<Image src='/icons/cart.png' width={15} height={17} alt='Cart icon' />
					<small className={styles.cartItemCount}>[ 7 ]</small>
				</div>
			</div>
			<Image src='/icons/hamburger_menu_mobile.png' width={22} height={20} alt='Cart icon' className={styles.hamburgerMenu} />
		</nav>
	)
}

export default Navbar
