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
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
	// const startShopping = () => {
	// 	router.push('/shop')
	// 	closeCart()
	// }

	const orderFormSchema = z.object({
		firstName: z.string().min(1, { message: 'Please enter first name' }),
		lastName: z.string().min(1, { message: 'Please enter last name' }),
		companyName: z.string().optional(),
		country: z.string().min(1, { message: 'Please enter country' }),
		street1: z.string().min(1, { message: 'Please enter street' }),
		street2: z.string().optional(),
		postcode: z.string().min(1, { message: 'Please enter postal code' }),
		city: z.string().min(1, { message: 'Please enter city' }),
		phone: z.string().min(1, { message: 'Please enter phone number' }).optional(),
		email: z.string().min(1, { message: 'Please enter email' }),
		cardNumber: z.string().min(3, { message: 'Please enter card number' }),
		expiryDate: z.string().datetime().min(1, { message: 'Please enter expiry date' }),
		cardCode: z.string().min(1, { message: 'Please enter CVC number' }),
	})

	//Vi skapar TypeScript type baserat på (infer) vårt Zod-schema (dvs. orderFormSchema).
	//Då behöver vi inte skriva separat t.ex. type FormData = {firstName: string} för vår TypeScript.
	//Ett alternativ, då vi uttryckligen måste skriva ut vår type (istället för att använda infer) är
	//att importera (också från Zod) och använda ZodType, så här:
	//const schema: ZodType<FormData> = z.object({ ... och sedan typa vårt FormData som vi gör
	//som vanligt med TypeScript
	type OrderFormType = z.infer<typeof orderFormSchema>

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<OrderFormType>({
		resolver: zodResolver(orderFormSchema),
	})

	//För data lägger vi till ett TypeScript-typ, t.ex. data: OrderForm som vi definierat som type OrderForm = osv.
	const submitData = async (data: OrderFormType) => {
		//Här skickar vi till servern: Se sist i denna fil där vi skapar en route för en POST-request som skickar detta formulär
		//mock:
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	return (
		<form onSubmit={handleSubmit(submitData)} className={styles.container}>
			<div className={styles.couponFields}>
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
							<input className={styles.couponCodeField} placeholder='Coupon code' />

							{/* Validate coupon code and calculate and update new subtotal */}

							<Button variant='default-dark' onClick={() => router.push('/')}>
								APPLY COUPON
							</Button>
						</div>
					</div>
				) : null}
			</div>
			<div className={styles.billingFields}>
				<h2 className={styles.formHeading}>BILLING DETAILS</h2>
				<div className={styles.nameFields}>
					<h2 className={styles.h2form}>First name *</h2>
					<input type='text' className={styles.addressField} {...register('firstName')} />
					{errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}

					<h2 className={styles.h2form}>Last name *</h2>
					<input type='text' className={styles.addressField} {...register('lastName')} />
					{errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
				</div>

				<h2 className={styles.h2form}>Company name (optional)</h2>
				<input type='text' className={styles.addressField} {...register('companyName')} />
				{errors.companyName && <p className={styles.errorMessage}>{errors.companyName.message}</p>}

				<h2 className={styles.h2form}>Country /Region *</h2>
				{/* DROPDOWN */}
				<input type='text' className={styles.addressField} {...register('country')} />
				{errors.country && <p className={styles.errorMessage}>{errors.country.message}</p>}

				<h2 className={styles.h2form}>Street address *</h2>
				<input
					type='text'
					className={`${styles.addressField} ${styles.streetAddressField}`}
					placeholder='House number and street name'
					{...register('street1')}
				/>
				{errors.street1 && <p className={styles.errorMessage}>{errors.street1.message}</p>}

				<input type='text' className={styles.addressField} placeholder='Apartment, suite, unit, etc. (optional)' {...register('street2')} />
				{errors.street2 && <p className={styles.errorMessage}>{errors.street2.message}</p>}

				<h2 className={styles.h2form}>Postcode / ZIP *</h2>
				<input type='number' className={styles.addressField} {...register('postcode')} />
				{errors.postcode && <p className={styles.errorMessage}>{errors.postcode.message}</p>}

				<h2 className={styles.h2form}>Town / City *</h2>
				<input type='text' className={styles.addressField} {...register('city')} />
				{errors.city && <p className={styles.errorMessage}>{errors.city.message}</p>}

				<h2 className={styles.h2form}>Phone *</h2>
				<input type='number' className={styles.addressField} {...register('phone')} />
				{errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}

				<h2 className={styles.h2form}>Email address *</h2>
				<input type='email' className={styles.addressField} {...register('email')} />
				{errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

				<label className={styles.checkbox}>
					<input type='checkbox' checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
					Ship to a different address?
				</label>
				{isChecked ? (
					<div>
						<AddressFormFields />
					</div>
				) : null}

				<div className={styles.textarea}>
					<h2 className={styles.h2form}>Order notes (optional)</h2>
					<textarea maxLength='50' className={styles.notesField} placeholder='Notes about your order, e.g. special notes for delivery.' />
				</div>
			</div>
			<div className={styles.paymentFields}>
				<h2 className={styles.formHeading}>YOUR ORDER</h2>

				<section className={styles.onlySmallScreen}>
					<div className={styles.orderHeadings}>
						<h2>PRODUCT</h2>
						<h2>SUBTOTAL</h2>
					</div>
					{cartItems.map((item: CartItem, i: number) => {
						// console.log('this is item', item)
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

				<h2 className={styles.h2form}>Card Number *</h2>
				<input type='number' className={styles.creditCardField} placeholder='1234 1234 1234 1234' {...register('cardNumber')} />
				{errors.cardNumber && <p className={styles.errorMessage}>{errors.cardNumber.message}</p>}

				<h2 className={styles.h2form}>Expiry Date *</h2>
				<input type='date' className={styles.creditCardField} placeholder='MM &#47; YY' {...register('expiryDate')} />
				{errors.expiryDate && <p className={styles.errorMessage}>{errors.expiryDate.message}</p>}

				<h2 className={styles.h2form}>Card Code (CVC) *</h2>
				<input type='number' className={styles.creditCardField} placeholder='CVC' {...register('cardCode')} />
				{errors.cardCode && <p className={styles.errorMessage}>{errors.cardCode.message}</p>}

				<p style={{ marginTop: '5rem' }}>
					Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in
					our privacy policy.
				</p>
				{/* <Button variant='large-dark' onClick={() => router.push('/')}> */}
				<button type='submit' disabled={isSubmitting} className={styles.submitOrderBtn} onClick={() => {}}>
					PLACE ORDER
				</button>

				{/* </Button> */}
			</div>
		</form>
	)
}

export default Checkout
