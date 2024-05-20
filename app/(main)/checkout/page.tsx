'use client'
import React from 'react'
import styles from './checkout.module.css'
import { useState } from 'react'
import AddressFormFields from '@/app/components/molecules/addressFormFields/AddressFormFields'
import Button from '@/app/components/atoms/button/Button'
import { ImTruck } from 'react-icons/im'
import { useCart } from '@/app/context/cartContext'
import { useRouter } from 'next/navigation'
import { useCurrencyConversion } from '@/app/context/currencyContext'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

const Checkout = () => {
	const [isOpenCouponCodeField, setIsOpenCouponCodeField] = useState(false)
	const [isChecked, setIsChecked] = useState(false)

	const { cartItems, selectedLength }: any = useCart()

	const { currency, conversionRateEur } = useCurrencyConversion()

	const router = useRouter()

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
		expiryDate: z.string().min(1, { message: 'Please enter expiry date' }),
		cardCode: z.string().min(1, { message: 'Please enter CVC number' }),
	})

	type OrderFormType = z.infer<typeof orderFormSchema>

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<OrderFormType>({
		resolver: zodResolver(orderFormSchema),
	})

	const submitData = async (data: OrderFormType) => {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		notify()
	}

	const notify = () => toast('Your order has been placed!')

	const handleButtonClick = () => {
		if (Object.keys(errors).length > 0) {
			alert('Please complete the form')
		} else {
			handleSubmit(submitData)()
		}
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
					<textarea maxLength={50} className={styles.notesField} placeholder='Notes about your order, e.g. special notes for delivery.' />
				</div>
			</div>
			<div className={styles.paymentFields}>
				<h2 className={styles.formHeading}>YOUR ORDER</h2>

				<section className={styles.mobileOnly}>
					<div className={styles.orderHeadings}>
						<h2>PRODUCT</h2>
						<h2>SUBTOTAL</h2>
					</div>
					{cartItems.map((item: CartItem, i: number) => {
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
										<div className={styles.price}>
											{currency === 'SEK'
												? item.quantity * item.product.price + '\u00A0SEK'
												: item.quantity * (item.product.price * conversionRateEur) + '\u00A0EUR'}
										</div>
									</div>
								</div>
							</>
						)
					})}
				</section>

				<div className={styles.subtotal}>
					<h2>SUBTOTAL</h2>
					<div className={styles.price}>
						{cartItems.reduce((total: number, item: CartItem) => {
							const currItem = cartItems.find((i: CartItem) => i.product.id === item.product.id)
							const price = currency === 'SEK' ? Number(currItem?.product.price) : Number(currItem?.product.price) * conversionRateEur!
							const totalPriceForItem = (price || 0) * currItem.quantity
							return total + totalPriceForItem + (currency === 'SEK' ? '\u00A0SEK' : '\u00A0EUR')
						}, 0)}
					</div>
				</div>
				<div className={styles.shippingContainer}>
					<div className={styles.shipping}>
						<h2>SHIPPING</h2>
						<div>Schenker</div>
					</div>

					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>Shipping options will be updated during checkout.</div>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
						<span className={styles.calculateShipping}>Calculate shipping</span> <ImTruck />
					</div>
				</div>
				<div className={styles.total}>
					<div>TOTAL</div>
					<div className={styles.price}>
						{cartItems.reduce((total: number, item: any) => {
							const currItem = cartItems.find((i: any) => i.product.id === item.product.id)
							const price = currency === 'SEK' ? Number(currItem?.product.price) : Number(currItem?.product.price) * conversionRateEur!
							return total + (price || 0) * currItem.quantity + (currency === 'SEK' ? '\u00A0SEK' : '\u00A0EUR')
						}, 0)}
						<span>&nbsp;+ SHIPPING COST (includes xxx Tax)</span>
					</div>
				</div>
				<h2 className={styles.formHeading}>CREDIT CARD</h2>
				<p>Pay with your credit card.</p>

				<h2 className={styles.h2form}>Card Number *</h2>
				<input type='text' className={styles.creditCardField} placeholder='1234 1234 1234 1234' {...register('cardNumber')} />
				{errors.cardNumber && <p className={styles.errorMessage}>{errors.cardNumber.message}</p>}

				<h2 className={styles.h2form}>Expiry Date *</h2>
				<input type='date' className={styles.creditCardField} placeholder='MM &#47; YY' {...register('expiryDate')} />
				{errors.expiryDate && <p className={styles.errorMessage}>{errors.expiryDate.message}</p>}

				<h2 className={styles.h2form}>Card Code (CVC) *</h2>
				<input type='text' className={styles.creditCardField} placeholder='CVC' {...register('cardCode')} />
				{errors.cardCode && <p className={styles.errorMessage}>{errors.cardCode.message}</p>}

				<p style={{ marginTop: '5rem', marginBottom: '1.5rem' }}>
					Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in
					our privacy policy.
				</p>

				<button type='button' disabled={isSubmitting} className={styles.submitOrderBtn} onClick={handleButtonClick}>
					PLACE ORDER
				</button>

				<ToastContainer
					position='bottom-right'
					autoClose={5000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='dark'
					transition={Slide}
				/>
			</div>
		</form>
	)
}

export default Checkout
