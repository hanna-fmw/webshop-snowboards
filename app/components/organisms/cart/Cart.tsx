'use client'
import React from 'react'
import styles from './cart.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import { useCart } from '../../../../app/context/cartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import formatCurrency from '../../../../app/utilities/currencyFormatter'
import Button from '../../atoms/button/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useCurrencyConversion } from '../../../../app/context/currencyContext'

type CartProps = {
	children?: React.ReactNode
}

type Product = {
	id: number
	name: string
	price: number
	length: string
	image: string
	model: string
}

type CartItem = {
	product: Product
	quantity: number
}

const Cart = ({ children }: CartProps) => {
	
	const {
		closeCart,
		increaseCartQuantity,
		decreaseCartQuantity,
		cartItems,
		removeFromCart,
		isCartOpen,
		setIsCartOpen,
		selectedLength,
		setIsAddedToCart,
	}: any = useCart()

	const { currency, conversionRateEur } = useCurrencyConversion()

	const router = useRouter()
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (isCartOpen && ref.current && !ref.current.contains(e.target as Node)) {
				setIsCartOpen(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCartOpen])

	useEffect(() => {
		document.body.style.overflowY = isCartOpen ? 'hidden' : 'auto'

		return () => {
			document.body.style.overflowY = 'auto'
			document.documentElement.style.overflowY = 'auto'
		}
	}, [closeCart, isCartOpen])

	const startShopping = () => {
		router.push('/shop')
		isCartOpen && closeCart()
		setIsAddedToCart(false)
	}

	const goToCart = () => {
		router.push('/cart')
		isCartOpen && closeCart()
	}

	const goToCheckout = () => {
		router.push('/checkout')
		isCartOpen && closeCart()
	}

	const sidePanelVariants = {
		hidden: { x: '100%', opacity: 0 },

		visible: {
			x: '0',
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeInOut' },
		},
		exit: { x: '100%', opacity: 0, transition: { duration: 0.3, ease: 'ease' } },
	}

	return (
		<AnimatePresence>
			<motion.main
				key='sidePanel'
				ref={ref}
				className={styles.cartSidePanel}
				variants={sidePanelVariants}
				initial='hidden'
				exit='exit'
				animate={isCartOpen ? 'visible' : 'exit'}>
				<IoCloseOutline size={30} onClick={closeCart} className={styles.closeBtn} />

				{cartItems.length !== 0 ? (
					<section className={styles.cartContainer}>
						<section>
							<div>YOUR CART: {cartItems.length} ITEM(S)</div>

							{cartItems.map((item: CartItem, i: number) => {
								const backToProductDetail = () => {
									router.push(`/shop/${item.product.model}`)
									isCartOpen && closeCart()
								}

								return (
									<section key={i} className={styles.productContainer}>
										<div className={styles.productInfo}>
											<Image src={`/products/${item.product?.image}`} width={65} height={80} alt='Product Image' onClick={backToProductDetail} />

											<section>
												<div>{item.product?.name}</div>
												<span className={styles.price}>{currency === 'SEK' ? item.product?.price : item.product?.price * conversionRateEur!}</span>
												<div style={{ marginTop: '0.5rem' }}>LENGTH: {selectedLength}</div>
												<article className={styles.btnContainer}>
													<div className={styles.itemCountContainer}>
														<button onClick={() => decreaseCartQuantity(item.product)} className={styles.plusMinusBtn}>
															-
														</button>
														<span style={{ margin: '0.5rem' }}>{item.quantity}</span>
														<button onClick={() => increaseCartQuantity(item.product)} className={styles.plusMinusBtn}>
															+
														</button>
													</div>

													<div onClick={() => removeFromCart(item.product)} className={styles.removeBtn}>
														REMOVE ITEM
													</div>
												</article>
											</section>
										</div>
										<div>
											<span>x{item.quantity} =</span>{' '}
											<span className={styles.totalItemsPrice}>
												{formatCurrency(
													currency === 'SEK' ? item.product?.price * item.quantity : item.product?.price * conversionRateEur! * item.quantity,
													currency
												)}
											</span>
										</div>
									</section>
								)
							})}
						</section>

						<footer className={styles.cartFooter}>
							<div className={styles.divider}></div>
							<article className={styles.subtotal}>
								<h3>SUBTOTAL</h3>
								<div className={styles.price}>
									{formatCurrency(
										cartItems.reduce((total: number, item: CartItem) => {
											const currItem = cartItems.find((i: CartItem) => i.product?.id === item.product?.id)
											console.log(currItem)
											return (
												total +
												(currency === 'SEK' ? currItem?.product?.price : currItem?.product?.price * conversionRateEur! || 0) * currItem.quantity
											)
										}, 0),
										currency
									)}
								</div>
							</article>
							<h3>SHIPPING, TAXES, AND DISCOUNTS CALCULATED AT CHECKOUT.</h3>
							<article className={styles.btnCheckoutContainer}>
								<Button variant='default' onClick={goToCart}>
									VIEW MY CART
								</Button>
								<Button variant='default-dark' onClick={goToCheckout}>
									GO TO CHECKOUT
								</Button>
							</article>
							<article className={styles.creditCardIcons}>
								<Image src={'/creditcardIcons/visa.svg'} width={25} height={25} alt='Visa icon' />
								<Image src={'/creditcardIcons/amex.svg'} width={25} height={25} alt='Amex icon' />
								<Image src={'/creditcardIcons/mastercard.svg'} width={25} height={25} alt='Mastercard icon' />
							</article>
						</footer>
					</section>
				) : (
					<section style={{ marginTop: '20vh' }}>
						<div style={{ marginBottom: '2rem' }}>YOUR CART IS CURRENTLY EMPTY!</div>
						<Button variant='default-dark' onClick={startShopping}>
							START SHOPPING
						</Button>
					</section>
				)}
			</motion.main>
		</AnimatePresence>
	)
}

export default Cart
