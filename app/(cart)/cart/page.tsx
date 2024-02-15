'use client'
import React from 'react'
import styles from './cart.module.css'
import Button from '@/app/components/atoms/button/Button'
import { ImTruck } from 'react-icons/im'
import { useCart } from '@/app/context/cartContext'
import { useRouter } from 'next/navigation'
import formatCurrency from '@/app/utilities/currencyFormatter'
import { RiArrowDownSFill } from 'react-icons/ri'
import { RiArrowUpSFill } from 'react-icons/ri'

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
	// id: number
	quantity: number
}

const CartPage = () => {
	const { closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems, removeFromCart, isCartEmpty }: any = useCart()

	const router = useRouter()
	const startShopping = () => {
		router.push('/shop')
		closeCart()
	}

	return (
		<>
			{cartItems.length !== 0 ? (
				<main className={styles.container}>
					<div>
						<h2 style={{ paddingBlock: '1rem' }}>CART</h2>
						{cartItems.map((item: CartItem, i: number) => {
							return (
								<div key={i} style={{ marginBottom: '5rem' }}>
									<div className={styles.product}>
										<div>Product:</div>
										<div>{item.product.name}</div>
									</div>
									<div className={styles.price}>
										<div>Price:</div>
										<div className={styles.priceColor}>{formatCurrency(item.product.price)}</div>
									</div>
									<div className={styles.quantity}>
										<div>Quantity:</div>
										{/* <div className={styles.amount}>{item.quantity}</div> */}
										<div className={styles.itemCountContainer}>
											<span style={{ margin: '0.5rem' }}>{item.quantity}</span>
											<div style={{ display: 'flex', flexDirection: 'column' }} className={styles.arrowBtn}>
												<div>
													<button onClick={() => increaseCartQuantity(item.product)} className={styles.plusMinusBtn}>
														<RiArrowUpSFill />
													</button>
												</div>
												<div>
													<button onClick={() => decreaseCartQuantity(item.product)} className={styles.plusMinusBtn}>
														<RiArrowDownSFill />
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className={styles.subtotal}>
										<div>Subtotal:</div>
										<div className={styles.priceColor}>{formatCurrency(item.quantity * item.product.price)}</div>
									</div>
								</div>
							)
						})}
					</div>

					<div className={styles.btnContainer}>
						<div className={styles.couponBtns}>
							<Button variant='default' onClick={() => {}}>
								Coupon code
							</Button>
							<Button variant='default-dark' onClick={() => {}}>
								APPLY COUPON
							</Button>
						</div>
						<button className={styles.updateBtn} onClick={() => {}}>
							<span>UDATE CART</span>
						</button>
					</div>

					<h2 style={{ paddingBlock: '1.5rem' }}>CART TOTALS</h2>
					<div className={styles.subtotal}>
						{/* Borde vara 1) spara reduce-funktionen längre upp i variabel och multiplicera detta med cartItems.length */}
						<div>Subtotal:</div>
						<div className={styles.priceColor}>
							{formatCurrency(
								cartItems.reduce((total: number, item: any) => {
									const currItem = cartItems.find((i: any) => i.product.id === item.product.id)
									console.log(currItem)
									return total + (currItem?.product.price || 0) * currItem.quantity
								}, 0)
							)}
						</div>
					</div>
					<div className={styles.shippingContainer}>
						<div className={styles.shipping}>
							<div>Shipping:</div>
							<div>Schenker</div>
						</div>

						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>Shipping options will be updated during checkout.</div>
						<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
							<span className={styles.calculateShipping}>Calculate shipping</span> <ImTruck />
						</div>
					</div>
					<div className={styles.total}>
						<div>Total:</div>
						<div className={styles.priceColor}>
							{formatCurrency(
								cartItems.reduce((total: number, item: any) => {
									const currItem = cartItems.find((i: any) => i.product.id === item.product.id)
									console.log(currItem)
									return total + (currItem?.product.price || 0) * currItem.quantity
								}, 0)
							)}{' '}
							+ CALCULATED SHIPPING COST
						</div>
					</div>
					<Button variant='large-dark' onClick={() => {}}>
						PROCEED TO CHECKOUT
					</Button>
				</main>
			) : (
				<main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
					<span style={{ marginBottom: '1rem' }}>YOUR CART IS CURRENTLY EMPTY!</span>
					<div style={{ width: '50%' }}>
						<Button variant='default-dark' onClick={startShopping}>
							START SHOPPING
						</Button>
					</div>
				</main>
			)}
		</>
	)
}

export default CartPage
