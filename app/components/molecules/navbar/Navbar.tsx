'use client'
import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import hamburgerMenu from '../../../../public/icons/hamburger_menu_mobile.png'
import logotype from '../../../../public/logo/logo.svg'
import cart from '../../../../public/icons/cart.png'
import CurrencyDropdown from '../../atoms/currencyDropdown/CurrencyDropdown'
import { useModal } from '@/app/context/modalContext'
import { useCart } from '@/app/context/cartContext'
import Modal from '../modal/Modal'
import Cart from '../../organisms/cart/Cart'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CartContextProps } from '@/app/context/cartContext'

type NavbarProps = {
	children?: React.ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
	// const { isModalOpen, openModal }: ModalContextProps = useModal()
	const modalContext = useModal()
	const { isModalOpen, openModal } = modalContext || {}

	// const { isCartOpen, openCart, cartItems, cartQuantity }: CartContextProps = useCart()
	//För modalContext ovan behöver vi inte : ModalContextProps eftersom TS kan infer typen för både isModalOpen och openModal
	const cartContext = useCart()!
	const { isCartOpen, openCart, cartItems, cartQuantity }: CartContextProps = cartContext || {}

	const pathName = usePathname()
	// console.log(pathName)

	return (
		<main className={styles.navContainer}>
			<nav className={styles.nav}>
				<div className={styles.li}>
					<Link href='/'>
						<Image src={logotype} width={157} height={26} alt='TUR Logotype' className={styles.logo} />
					</Link>
				</div>

				<div className={styles.navItems}>
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
						<ul className={styles.navIcons}>
							<li className={styles.li}>
								<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' onClick={openModal} />
								{isModalOpen && <Modal />}
							</li>

							<li className={`${styles.li}`}>
								<CurrencyDropdown />
							</li>
							<li style={{ display: 'flex' }} className={`${styles.li} ${styles.cartIconContainer}`}>
								<Image src={cart} width={15} height={17} alt='Cart icon' onClick={openCart} />
								{cartItems.length !== 0 && <small className={styles.cartItemCount}>&#91;{cartQuantity}&#93;</small>}
								{isCartOpen && <Cart />}
							</li>
						</ul>
					) : (
						<>
							<ul className={styles.navIcons}>
								<li className={styles.li}>
									<Image src={hamburgerMenu} width={22} height={20} className={styles.hamburgerMenu} alt='Hamburger Menu icon' onClick={openModal} />
									{isModalOpen && <Modal />}
								</li>
							</ul>
							{isCartOpen && <Cart />}
						</>
					)}
				</div>
			</nav>
		</main>
	)
}

export default Navbar
