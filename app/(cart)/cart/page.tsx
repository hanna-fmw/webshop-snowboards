'use client'
import React from 'react'
import styles from './cart.module.css'
import Button from '@/app/components/atoms/button/Button'
import { ImTruck } from 'react-icons/im'

const CartPage = () => {
	return (
		<main className={styles.container}>
			<h2 style={{ paddingBlock: '1rem' }}>CART</h2>
			<div className={styles.product}>
				<div>Product:</div>
				<div>TUR FALC - 158</div>
			</div>
			<div className={styles.price}>
				<div>Price:</div>
				<div className={styles.priceColor}>8299,00 KR</div>
			</div>
			<div className={styles.quantity}>
				<div>Quantity:</div>
				<div className={styles.amount}>3</div>
			</div>
			<div className={styles.subtotal}>
				<div>Subtotal:</div>
				<div className={styles.priceColor}>13000 KR</div>
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
				<div>Subtotal:</div>
				<div className={styles.priceColor}>8299,00 KR</div>
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
				<div className={styles.priceColor}>8299,00 KR</div>
			</div>
			<Button variant='large-dark' onClick={() => {}}>
				PROCEED TO CHECKOUT
			</Button>
		</main>
	)
}

export default CartPage
