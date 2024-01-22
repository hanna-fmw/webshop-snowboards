import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className={styles.navContainer}>
			<Image src='/logo/logo.png' width={157} height={26} alt='TUR Logotype' />
			<div className={styles.navItems}>
				<div className={styles.navLinks}>
					<Link href='/' className={styles.navLink}>
						[a]. HOME
					</Link>
					<Link href='/' className={styles.navLink}>
						[b]. SHOP
					</Link>
					<Link href='/' className={styles.navLink}>
						[c]. ABOUT
					</Link>
					<Link href='/' className={styles.navLink}>
						[d]. SUPPORT
					</Link>
				</div>

				<Image src='/icons/hamburger_menu_mobile.png' width={22} height={20} alt='Cart icon' className={styles.hamburgerMenu} />
				<div className={styles.cartItems}>
					<Image src='/icons/cart.png' width={15} height={17} alt='Cart icon' />
					<small className={styles.cartItemCount}>[ 7 ]</small>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
