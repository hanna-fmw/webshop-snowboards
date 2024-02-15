'use client'
import React from 'react'
import styles from './cart.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import { useCart } from '@/app/context/cartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import formatCurrency from '@/app/utilities/currencyFormatter'
import Button from '../../atoms/button/Button'
import { motion } from 'framer-motion'

type CartProps = {
	children?: React.ReactNode
}

// type CartContextProps = {
// 	isCartOpen: boolean
// 	openCart: () => void
// 	closeCart: () => void

// 	getItemQuantity: (product: Product) => number
// 	increaseCartQuantity: (product: Product) => void
// 	decreaseCartQuantity: (product: Product) => void
// 	removeFromCart: (product: Product) => void
// 	addItemToCart: (product: Product) => void

// 	cartItems: CartItem[]
// }

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
	// id: number
	quantity: number
}

const Cart = ({ children }: CartProps) => {
	// const { closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems }: CartContextProps = useCart()
	const { closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems, removeFromCart, isCartEmpty, isCartOpen }: any =
		useCart()
	// const quantity = getItemQuantity(product)

	const router = useRouter()

	const startShopping = () => {
		router.push('/shop')
		closeCart()
	}

	const goToCart = () => {
		router.push('/cart')
		closeCart()
	}

	const sidePanelVariants = {
		hidden: { x: '100%', opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeInOut' },
		},
		exit: { x: '100%', opacity: 0 },
	}

	return (
		<motion.main
			className={styles.cartSidePanel}
			variants={sidePanelVariants}
			initial='hidden'
			animate={isCartOpen ? 'visible' : 'hidden'}
			exit='exit'>
			<IoCloseOutline size={30} onClick={closeCart} className={styles.closeBtn} />

			{cartItems.length !== 0 ? (
				<section>
					<div style={{ marginTop: '0.5rem' }}>YOUR CART ({cartItems.length} ITEM)</div>

					{cartItems.map((item: CartItem, i: number) => {
						console.log('These are the cartItems', cartItems)
						const backToProductDetail = () => {
							router.push(`/shop/${item.product.model}`)
							closeCart()
						}

						return (
							<section key={i} className={styles.productContainer}>
								<div className={styles.productInfo}>
									<div className={styles.imgContainer}>
										<Image src={`/products/${item.product.image}`} width={65} height={80} alt='Product Image' onClick={backToProductDetail} />
										{/* <Figure image={`/products/${item.product.image}`} onClick={() => router.push(`/shop/${item.product.model}`)} /> */}
									</div>
									<div className={styles.texBlockHorizontal}>
										<div>{item.product.name}</div>
										<div className={styles.price}>{formatCurrency(item.product.price)}</div>
										<div style={{ marginTop: '0.5rem' }}>LENGTH: {item.product.length}</div>
										<div className={styles.btnContainer}>
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
										</div>
									</div>
								</div>
								<div>
									<span>x{item.quantity} =</span> <span className={styles.totalItemsPrice}>{formatCurrency(item.product.price * item.quantity)}</span>
								</div>

								{/* När jag har fixat ProductCard - lagt in figure och textblock i det, så kan jag bara skriva så här: */}
								{/* <ProductCard {...item}/> */}
							</section>
						)
					})}

					<footer className={styles.footer}>
						<div className={styles.subtotalContainer}>
							<div>SUBTOTAL</div>
							<div className={styles.price}>
								{formatCurrency(
									cartItems.reduce((total: number, item: any) => {
										const currItem = cartItems.find((i: any) => i.product.id === item.product.id)
										console.log(currItem)
										return total + (currItem?.product.price || 0) * currItem.quantity
									}, 0)
								)}
							</div>
						</div>
						<div>SHIPPING, TAXES, AND DISCOUNTS CALCULATED AT CHECKOUT.</div>
						<div className={styles.btnCheckoutContainer}>
							<Button variant='default' onClick={goToCart}>
								VIEW MY CART
							</Button>
							<Button variant='default-dark' onClick={() => {}}>
								GO TO CHECKOUT
							</Button>
						</div>
						<div className={styles.creditCardIcons}>
							<Image src={'/creditcardIcons/visa.svg'} width={25} height={25} alt='Visa icon' />
							<Image src={'/creditcardIcons/amex.svg'} width={25} height={25} alt='Amex icon' />
							<Image src={'/creditcardIcons/mastercard.svg'} width={25} height={25} alt='Mastercard icon' />
						</div>
					</footer>

					{/* <div>Total Items: {cartItems.length}</div> */}
				</section>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
					<span style={{ marginBottom: '1rem' }}>YOUR CART IS CURRENTLY EMPTY!</span>
					<div style={{ width: '50%' }}>
						<Button variant='default-dark' onClick={startShopping}>
							START SHOPPING
						</Button>
					</div>
				</div>
			)}
		</motion.main>
	)
}

export default Cart
