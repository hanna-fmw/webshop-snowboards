'use client'
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import hamburgerMenu from '../../../../public/icons/hamburger_menu_mobile.png'
import cart from '../../../../public/icons/cart.png'
import CurrencyDropdown from '../../atoms/currencyDropdown/CurrencyDropdown'
import Modal from '../modal/Modal'
import Cart from '../../organisms/cart/Cart'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CartContextProps } from '../../../../app/context/cartContext'
import { useModal } from '../../../../app/context/modalContext'
import { useCart } from '../../../../app/context/cartContext'
import { useEffect, useState } from 'react'
// import logotype from '../../../../public/logo/logo.svg'; //Should be kept hidden on live site

type NavbarProps = {
	children?: React.ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
	const modalContext = useModal()
	const { isModalOpen, openModal } = modalContext || {}

	const cartContext = useCart()!
	const { isCartOpen, openCart, cartItems, cartQuantity }: CartContextProps = cartContext || {}

	const pathName = usePathname()

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<main className={styles.navContainer}>
			<nav className={styles.nav}>
				<aside className={styles.li}>
					<Link href='/'>{/* <Image src={logotype} width={157} height={26} alt='TUR Logotype' className={styles.logo} /> */}</Link>
				</aside>

				<section className={styles.navItems}>
					<ul className={styles.navLinks}>
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
					</ul>

					{pathName !== '/cart' && pathName !== '/checkout' ? (
						<>
							<ul className={styles.navIcons}>
								<li className={styles.li}>
									<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' onClick={openModal} />
								</li>
								{isModalOpen && <Modal />}

								<li className={`${styles.li}`}>
									<CurrencyDropdown />
								</li>
								<li className={`${styles.li} ${styles.cartIconContainer}`}>
									<Image src={cart} width={15} height={17} alt='Cart icon' onClick={openCart} />

									{isMounted && cartItems.length !== 0 && <small className={styles.cartItemCount}>&#91;{cartQuantity}&#93;</small>}
								</li>
							</ul>

							{isCartOpen && <Cart />}
						</>
					) : (
						<>
							<ul className={styles.navIcons}>
								<li className={styles.li}>
									<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' onClick={openModal} />
								</li>
								{isModalOpen && <Modal />}
							</ul>
							{isCartOpen && <Cart />}
						</>
					)}
				</section>
			</nav>
		</main>
	)
}

export default Navbar
