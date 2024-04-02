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
import Figure from '@/app/components/atoms/figure/Figure';
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
				<section className={styles.layout}>
					<section className={styles.container}>
						<section className={styles.onlySmallScreen}>
							<h2 style={{ paddingBlock: '1rem' }}>CART</h2>
							{cartItems.map((item: CartItem, i: number) => {
								// console.log('this is item', item)
								return (
									<>
										<article key={i} style={{ marginBottom: '5rem' }}>
											<div className={styles.product}>
												<h3>Product:</h3>
												<p className={styles.productName}>
													{item.product?.name} - {selectedLength}
												</p>
											</div>

											<div className={styles.price}>
												<h3>Price:</h3>
												<p className={styles.amount}>
													{formatCurrency(currency === 'SEK' ? item.product?.price : item.product?.price * conversionRateEur!, currency)}
												</p>
											</div>

											<div className={styles.quantity}>
												<h3>Quantity:</h3>
												<div className={styles.itemCountContainer}>
													<div>
														<span style={{ margin: '0.5rem' }}>{item.quantity}</span>
													</div>
													<div className={styles.arrowBtn}>
														<button onClick={() => increaseCartQuantity(item.product)} className={styles.arrowUpDown}>
															<RiArrowUpSFill />
														</button>
														<div>
															<button onClick={() => decreaseCartQuantity(item.product)} className={styles.arrowUpDown}>
																<RiArrowDownSFill />
															</button>
														</div>
													</div>
												</div>
											</div>
										</article>
										<article className={styles.subtotalContainer}>
											<h3 style={{ marginBottom: 'none' }}>Subtotal:</h3>

											<p className={styles.amount}>
												{formatCurrency(
													currency === 'SEK' ? item.quantity * item.product.price : item.quantity * (item.product.price * conversionRateEur!),
													currency
												)}
											</p>
										</article>
									</>
								);
							})}
						</section>

						<section className={styles.onlyLargeScreen}>
							<h2 style={{ paddingBlock: '1rem' }}>CART</h2>
							<section className={styles.cartContainer}>
								<aside className={styles.sectionHeader}>
									<h3 className={styles.removeHeading}>Remove</h3>
									<h3 className={styles.imageHeading}>Image</h3>
									<h3 className={styles.productHeading}>PRODUCT</h3>
									<h3 className={styles.priceHeading}>PRICE</h3>
									<h3 className={styles.quantityHeading}>QUANTITY</h3>
									<h3 className={styles.subtotalHeading}>SUBTOTAL</h3>
								</aside>
								<section className={styles.productCard}>
									{cartItems.map((item: CartItem, i: number) => {
										return (
											<article key={i} className={styles.productRow}>
												<button onClick={() => removeFromCart(item.product)} className={styles.removeBtnContainer}>
													<span className={styles.removeBtn}>x</span>
												</button>
												<div className={styles.productImg}>
													<Figure image={`/products/${item.product?.image}`} onClick={() => router.push(`/shop/${item.product.model}`)} />
												</div>

												<div className={styles.productName}>
													<p>
														{item.product?.name} - {selectedLength}
													</p>
												</div>

												<div className={styles.productPrice}>
													<p className={styles.amount}>
														{formatCurrency(currency === 'SEK' ? item.product?.price : item.product?.price * conversionRateEur!, currency)}
													</p>
												</div>

												<div className={styles.productQuantity}>
													<div className={styles.itemCountContainer}>
														<div style={{ border: '1px solid black', display: 'flex', flexDirection: 'row' }}>
															<span style={{ margin: '0.5rem' }}>{item.quantity}</span>
															<div style={{ display: 'flex', flexDirection: 'column' }} className={styles.arrowBtn}>
																<div>
																	<button onClick={() => increaseCartQuantity(item.product)} className={styles.arrowUpDown}>
																		<RiArrowUpSFill />
																	</button>
																</div>
																<div>
																	<button onClick={() => decreaseCartQuantity(item.product)} className={styles.arrowUpDown}>
																		<RiArrowDownSFill />
																	</button>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={styles.productSubtotal}>
													<p className={styles.amount}>
														{formatCurrency(
															currency === 'SEK' ? item.quantity * item.product?.price : item.quantity * (item.product?.price * conversionRateEur!),
															currency
														)}
													</p>
												</div>
											</article>
										);
									})}
								</section>
							</section>
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
