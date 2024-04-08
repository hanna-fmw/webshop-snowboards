'use client';
import React from 'react';
import styles from './cart.module.css';
import Button from '@/app/components/atoms/button/Button';
import { ImTruck } from 'react-icons/im';
import { useCart } from '@/app/context/cartContext';
import { useRouter } from 'next/navigation';
import formatCurrency from '@/app/utilities/currencyFormatter';
import { RiArrowDownSFill } from 'react-icons/ri';
import { RiArrowUpSFill } from 'react-icons/ri';
import ProductImg from '@/app/components/atoms/productImg/ProductImg';
import { useCurrencyConversion } from '@/app/context/currencyContext';

type CartProps = {
	children?: React.ReactNode;
};

type Product = {
	id: number;
	name: string;
	price: number;
	length: string;
	image: string;
	model: string;
};

type CartItem = {
	product: Product;
	// id: number
	quantity: number;
};

const CartPage = () => {
	const { closeCart, isCartOpen, increaseCartQuantity, decreaseCartQuantity, cartItems, removeFromCart, selectedLength, isCartEmpty }: any =
		useCart();

	const { currency, conversionRateEur } = useCurrencyConversion();

	const router = useRouter();
	const startShopping = () => {
		router.push('/shop');
		isCartOpen && closeCart();
	};

	// Create an array to store product ids
	const productIds = cartItems.map((item: any) => item.product.id);

	// Total price
	const totalPrice = productIds.reduce((total: number, productId: number) => {
		const currItem = cartItems.find((item: any) => item.product.id === productId);
		return total + (currency === 'SEK' ? currItem?.product.price : currItem?.product.price * conversionRateEur! || 0) * currItem.quantity;
	}, 0);

	return (
		<>
			{cartItems.length !== 0 ? (
				<section className={styles.container}>
					<section>
						<h2 style={{ paddingBlock: '1rem' }}>CART</h2>
						<div className={styles.productCard}>
							{cartItems.map((item: CartItem, i: number) => {
								// console.log('this is item', item)
								return (
									<>
										<section key={i} style={{ marginBottom: '5rem' }}>
											<div className={styles.productRow}>
												<article>
													<button onClick={() => removeFromCart(item.product)} className={styles.removeBtnContainer}>
														<span className={styles.removeBtn}>x</span>
													</button>
												</article>
												<article>
													<div className={styles.productImg}>
														<ProductImg image={`/products/${item.product?.image}`} onClick={() => router.push(`/shop/${item.product.model}`)} />
													</div>
												</article>

												<article className={`${styles.productName} ${styles.product}`}>
													<h3 className={styles.headingProduct}>Product:</h3>
													<p className={styles.productName}>
														{item.product?.name} - {selectedLength}
													</p>
												</article>

												<article className={`${styles.price} ${styles.productPrice}`}>
													<h3 className={styles.headingPrice}>Price:</h3>
													<p className={styles.amount}>
														{formatCurrency(currency === 'SEK' ? item.product?.price : item.product?.price * conversionRateEur!, currency)}
													</p>
												</article>

												<article className={`${styles.quantity} ${styles.productQuantity}`}>
													<h3 className={styles.headingQty}>Quantity:</h3>
													<div className={styles.itemCountContainer}>
														<div>
															<span style={{ margin: '0.5rem' }}>{item.quantity}</span>
														</div>

														<div className={styles.arrowBtnContainer}>
															<button onClick={() => increaseCartQuantity(item.product)} className={styles.arrowUpDown}>
																<RiArrowUpSFill />
															</button>

															<button onClick={() => decreaseCartQuantity(item.product)} className={styles.arrowUpDown}>
																<RiArrowDownSFill />
															</button>
														</div>
													</div>
												</article>
												<article className={`${styles.subtotalContainer} ${styles.productSubtotal}`}>
													<h3 className={styles.headingSubtotal}>Subtotal:</h3>
													<p className={styles.amount}>
														{formatCurrency(
															currency === 'SEK' ? item.quantity * item.product.price : item.quantity * (item.product.price * conversionRateEur!),
															currency
														)}
													</p>
												</article>
											</div>
										</section>
									</>
								);
							})}
						</div>
					</section>

					<section className={styles.couponBtns}>
						<div>
							<input onClick={() => {}} placeholder='Coupon Code' className={styles.couponInput} />
						</div>
						<Button variant='default-dark' onClick={() => {}}>
							APPLY COUPON
						</Button>
					</section>
					<section className={styles.cartTotalLayout}>
						<article className={styles.cartTotalContainer}>
							<h3 style={{ paddingBlock: '1.5rem' }}>CART TOTALS</h3>
							<h3 className={styles.subtotal}>
								{/* Borde vara 1) spara reduce-funktionen längre upp i variabel och multiplicera detta med cartItems.length */}
								<div>Subtotal:</div>
								<div className={styles.amount}>{formatCurrency(totalPrice, currency)}</div>
							</h3>
							<div className={styles.shippingContainer}>
								<div className={styles.shipping}>
									<p>Shipping:</p>
									<p>Schenker</p>
								</div>

								<p style={{ display: 'flex', justifyContent: 'flex-end' }}>Shipping options will be updated during checkout.</p>
								<p style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
									<span className={styles.calculateShipping}>Calculate shipping</span> <ImTruck />
								</p>
							</div>
							<div className={styles.total}>
								<h3>Total:</h3>
								<p className={styles.amount}>
									{formatCurrency(totalPrice, currency)} + SHIPPING COST (includes {formatCurrency(totalPrice * 0.2, currency)} Tax)
								</p>
							</div>

							<Button variant='large-dark' onClick={() => router.push('/checkout')}>
								PROCEED TO CHECKOUT
							</Button>
						</article>
					</section>
				</section>
			) : (
				<section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
					<span style={{ marginBottom: '1rem' }}>YOUR CART IS CURRENTLY EMPTY!</span>
					<div style={{ width: '50%' }}>
						<Button variant='default-dark' onClick={startShopping}>
							START SHOPPING
						</Button>
					</div>
				</section>
			)}
		</>
	);
};

export default CartPage;
