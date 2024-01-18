import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'

const Navbar = () => {
	return (
		<nav className={styles.navContainer}>
			<Image src='/logo/TUR_Logotype.png' width={157} height={26} alt='TUR Logotype' />
			<div className={styles.navbarItems}>
				<Image src='/icons/hamburger_menu_mobile.png' width={22} height={20} alt='Cart icon' />
				<div className={styles.cartItems}>
					<Image src='/icons/cart.png' width={15} height={17} alt='Cart icon' />
					<small className={styles.cartItemCount}>[ 7 ]</small>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
