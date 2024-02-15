'use client'
import React from 'react'
import styles from './cart.module.css'
import Button from '@/app/components/atoms/button/Button'
import { ImTruck } from 'react-icons/im'
import { useCart } from '@/app/context/cartContext'
import { useRouter } from 'next/navigation'
import formatCurrency from '@/app/utilities/currencyFormatter'

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

	return (
		<main className={styles.container}>
			<h2 style={{ paddingBlock: '1rem' }}>CART</h2>

			{cartItems !== 0 && (
				<div>
					{cartItems.map((item: CartItem, i: number) => {
						console.log(getItemQuantity(item))
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
									<div className={styles.amount}>{item.quantity}</div>
								</div>
								<div className={styles.subtotal}>
									<div>Subtotal:</div>
									<div className={styles.priceColor}>{formatCurrency(item.quantity * item.product.price)}</div>
								</div>
							</div>
						)
					})}
				</div>
			)}

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
	)
}

export default CartPage
