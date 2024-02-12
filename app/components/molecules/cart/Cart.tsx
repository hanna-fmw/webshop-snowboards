'use client'
import React from 'react'
import styles from './cart.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import { useCart } from '@/app/context/cartContext'
import products from '../../../data/products.json'
import TextBlock from '../../atoms/textBlock/TextBlock'
import Figure from '../../atoms/figure/Figure'
import ProductCard from '../productCard/ProductCard'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
	const { closeCart, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, cartItems }: any = useCart()
	// const quantity = getItemQuantity(product)

	const router = useRouter()

	return (
		<div className={styles.cartSidePanel} style={{ padding: '1rem' }}>
			<IoCloseOutline size={25} onClick={closeCart} className={styles.closeBtn} />
			<div>YOUR CART ({cartItems.length} ITEM)</div>
			<section style={{ display: 'flex', flexDirection: 'column', width: '80vw' }}>
				{cartItems.map((item: CartItem, i: number) => {
					console.log('These are the cartItems', cartItems)

					return (
						<div key={i}>
							<div style={{ backgroundColor: 'lightGrey' }}>
								<div style={{ height: '20vh' }}>
									<Image
										src={`/products/${item.product.image}`}
										width={200}
										height={200}
										alt='bild'
										onClick={() => router.push(`/shop/${item.product.model}`)}
									/>
									{/* <Figure image={`/products/${item.product.image}`} onClick={() => router.push(`/shop/${item.product.model}`)} /> */}
								</div>
								<TextBlock name={item.product.name} price={item.product.price} length={item.product.length} />
								<div>Subtotal: {item.product.price * item.quantity}</div>

								{/* När jag har fixat ProductCard - lagt in figure och textblock i det, så kan jag bara skriva så här: */}
								{/* <ProductCard {...item}/> */}
							</div>

							<div style={{ display: 'flex', flexDirection: 'row', gap: '.5rem', alignItems: 'center' }}>
								<button onClick={() => decreaseCartQuantity(item.product)}>-</button>
								<span style={{ margin: '0 .5rem' }}>{item.quantity}</span>
								<button onClick={() => increaseCartQuantity(item.product)}>+</button>
							</div>

							<button onClick={() => {}}>Remove item</button>
						</div>
					)
				})}

				<div>Total Items: {cartItems.length}</div>
			</section>
		</div>
	)
}

export default Cart
