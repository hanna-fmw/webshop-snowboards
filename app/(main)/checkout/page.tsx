'use client'
import React from 'react'
import styles from './checkout.module.css'
import { useState } from 'react'
import AddressFormFields from '@/app/components/molecules/addressFormFields/AddressFormFields'

import Button from '@/app/components/atoms/button/Button'
import { ImTruck } from 'react-icons/im'
import { useCart } from '@/app/context/cartContext'
import { useRouter } from 'next/navigation'
import formatCurrency from '@/app/utilities/currencyFormatter'
import { RiArrowDownSFill } from 'react-icons/ri'
import { RiArrowUpSFill } from 'react-icons/ri'
import Figure from '@/app/components/atoms/figure/Figure'
import { useCurrencyConversion } from '@/app/context/currencyContext'

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

const Checkout = () => {
	const [isOpenCouponCodeField, setIsOpenCouponCodeField] = useState(false)
	const [isChecked, setIsChecked] = useState(false)

	const { closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems, removeFromCart, selectedLength, isCartEmpty }: any =
		useCart()

	const { currency, conversionRateEur } = useCurrencyConversion()

	const router = useRouter()
	const startShopping = () => {
		router.push('/shop')
		closeCart()
	}

	return (
		<form className={styles.container}>
			<div className={styles.formWrapper}>
				<h2 className={styles.formHeading}>CHECKOUT</h2>
				<div className={styles.couponFieldContent}>
					<h2>HAVE A COUPON?</h2>
					<span className={styles.couponCodeLink} onClick={() => setIsOpenCouponCodeField((prev) => !prev)}>
						Click here to enter your code
					</span>
				</div>
				{isOpenCouponCodeField ? (
					<div className={styles.couponToggleField}>
						<p>If you have a coupon code, please apply it below.</p>
						<div className={styles.btnContainer}>
							<div>
								<input className={styles.inputField} placeholder='Coupon code' />
							</div>
							{/* Validate coupon code and calculate and update new subtotal */}
							<div>
								<button className={styles.couponBtn} onClick={() => router.push('/')}>
									APPLY COUPON
								</button>
							</div>
						</div>
					</div>
				) : null}
			</div>
			<div className={styles.billingFields}>
				<h2 className={styles.formHeading}>BILLING DETAILS</h2>
				<AddressFormFields />

				<label className={styles.checkbox}>
					<input type='checkbox' checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
					Ship to a different address?
				</label>
				{isChecked ? (
					<div>
						<AddressFormFields />
					</div>
				) : null}

				<h2>Order notes (optional)</h2>
				<textarea className={styles.inputField} placeholder='Notes about your order, e.g. special notes for delivery.' />
			</div>
			<div className={styles.formWrapper}>
				<h2 className={styles.formHeading}>YOUR ORDER</h2>

				<section className={styles.onlySmallScreen}>
					<div className={styles.orderHeadings}>
						<h2>PRODUCT</h2>
						<h2>SUBTOTAL</h2>
					</div>
					{cartItems.map((item: CartItem, i: number) => {
						console.log('this is item', item)
						return (
							<>
								<div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
									<div className={styles.product}>
										<div className={styles.productName}>
											{item.product?.name} - {selectedLength}
											<span style={{ margin: '0.5rem' }}>x {item.quantity}</span>
										</div>
									</div>

									<div className={styles.subtotal}>
										<div className={styles.priceColor}>
											{formatCurrency(
												currency === 'SEK' ? item.quantity * item.product.price : item.quantity * (item.product.price * conversionRateEur!),
												currency
											)}
										</div>
									</div>
								</div>
							</>
						)
					})}
				</section>

				{/* <section className={styles.onlyLargeScreen}></section> */}

				{/* <h2 style={{ paddingBlock: '1.5rem' }}>CART TOTALS</h2> */}
				<div className={styles.subtotal}>
					{/* Borde vara 1) spara reduce-funktionen längre upp i variabel och multiplicera detta med cartItems.length */}
					<h2>SUBTOTAL</h2>
					<div className={styles.priceColor}>
						{formatCurrency(
							cartItems.reduce((total: number, item: any) => {
								const currItem = cartItems.find((i: any) => i.product.id === item.product.id)
								console.log(currItem)
								return total + (currency === 'SEK' ? currItem?.product.price : currItem?.product.price * conversionRateEur! || 0) * currItem.quantity
							}, 0),
							currency
						)}
					</div>
				</div>
				<div className={styles.shippingContainer}>
					<div className={styles.shipping}>
						<h2>SHIPPING</h2>
						<div>Schenker</div>
					</div>

					{/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>Shipping options will be updated during checkout.</div>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
						<span className={styles.calculateShipping}>Calculate shipping</span> <ImTruck />
					</div> */}
				</div>
				<div className={styles.total}>
					<div>TOTAL</div>
					<div className={styles.priceColor}>
						{formatCurrency(
							cartItems.reduce((total: number, item: any) => {
								const currItem = cartItems.find((i: any) => i.product.id === item.product.id)
								console.log(currItem)
								return total + (currency === 'SEK' ? currItem?.product.price : currItem?.product.price * conversionRateEur! || 0) * currItem.quantity
							}, 0),
							currency
						)}{' '}
						+ CALCULATED SHIPPING COST (includes xxx KR Tax)
					</div>
				</div>
				<h2 className={styles.formHeading}>CREDIT CARD</h2>
				<p>Pay with your credit card.</p>

				<h2>Card Number *</h2>
				<input className={styles.inputField} placeholder='1234 1234 1234 1234' />
				<h2>Expiry Date *</h2>
				<input className={styles.inputField} placeholder='MM / YY' />
				<h2>Card Code (CVC) *</h2>
				<input className={styles.inputField} placeholder='CVC' />
				<p style={{ marginTop: '5rem' }}>
					Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in
					our privacy policy.
				</p>
				<Button variant='large-dark' onClick={() => router.push('/')}>
					PLACE ORDER
				</Button>
			</div>
		</form>
	)
}

export default Checkout
