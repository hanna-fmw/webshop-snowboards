'use client'

import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

type CartContextProps = {
	isCartOpen: boolean
	openCart: () => void
	closeCart: () => void

	getItemQuantity: (product: Product) => number
	increaseCartQuantity: (product: Product) => void
	decreaseCartQuantity: (product: Product) => void
	removeFromCart: (product: Product) => void
	// addItemToCart: (product: Product) => void

	checkCartEmpty: () => void
	isCartEmpty: boolean

	cartItems: CartItem[]
	showIsAddedToCart: boolean

	cartQuantity: number
}

type Product = {
	id: number
	name: string
	price: string
	length: string
}

type CartProviderProps = {
	children: React.ReactNode
}

type CartItem = {
	product: Product
	// id: number
	quantity: number
}

// const CartContext = createContext<CartContextProps | undefined>(undefined)
const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({ children }: CartProviderProps) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [showIsAddedToCart, setShowIsAddedToCart] = useState(false)

	const openCart = () => setIsCartOpen(true)
	const closeCart = () => setIsCartOpen(false)

	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

	const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true)

	const checkCartEmpty = () => cartItems.length !== 0 && setIsCartEmpty(true)

	//TROR HÄR JAG BEHÖVER KÖRA IN SOM ARGUMENT FRÅN CARTITEM-TYPEN I STÄLLET!!!
	// const getItemQuantity = (product: Product) => {
	// 	//We want to take our current cart items and then find the item with
	// 	//the current id (ie find the item where the current id is equal to our id). And if we
	// 	//have that value (?) we want to return our quantity, otherwise we want to return a default
	// 	//value of 0. So with the question mark syntax (optional chaining syntax below) we are
	// 	//saying: if this (allt innan ?) evaluates to something, then get the quantity on it, or
	// 	//return zero if we have nothing:
	// 	// return cartItems.find((item) => item.product.id === product.id)?.quantity || 0
	// 	return cartItems.find((item) => {
	// 		console.log('this is item.quantity', item.quantity)
	// 		return item.product.id === product.id ? item.quantity : 0
	// 	})
	// }

	const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

	const getItemQuantity = (product: Product) => {
		return cartItems.find((item) => item.product?.id === product.id)?.quantity || 0
	}

	const increaseCartQuantity = (product: Product) => {
		//First we need to call the setCartItems and get our current items, which will be whatever
		//our current list of items is, and what we want to do is to modify (increase) this list: so,
		//if (the if statement) we can find an item inside our cart items list (inside our cart), then
		//this means we do have an item, so what we want to check is if we don´t (null)
		//have an item. Because if our item doesn´t already exist in the cart, we need to add it
		//to our cart; so what we do is we return all of our current items and we can
		//add in a new item which has an id and a quantity of one [...currItems, {id, quantity: 1}]. So
		//now we have said that if the conditional evaluates to null, then we want to add a new item
		//with the quantity of 1 (i.e. if the item doesn´t already exist in the cart, we add it with the
		//quantity of 1). Otherwise (else), i.e. if the item already exists in the cart, all we need
		//to do is increment the count of that item by one. So in this return (in the else statement) we
		//are just going to map over all our current items, and for each one of our items, if our
		//item.id is equal to our id, then that one (that item), we need to change, so we can return
		//(the second return inside the else statement) that item, spread it out, but we´re goind to
		//take the quantity and add one to it ({...item, quantity: item.quantity + 1}). So what
		//we´re saying here is: if we found our item, take the current item and keep everything the
		//same (...item), but increment the quantity (, quantity: item.quantity + 1). Otherwise we
		//are just going to return the item as is without any changes at all (return item).
		//So this is the full code block for all this:
		console.log(product)
		setCartItems((currItems) => {
			console.log(currItems)
			//1) The item is not already in the cart > add new item to array
			if (currItems.find((item) => item.product?.id === product?.id) == null) {
				return [...currItems, { product, quantity: 1 }]
			} else {
				//So, if this code block runs it´s bc the item is already in the cart, and so we just update the existing item
				return currItems.map((item) => {
					if (item.product?.id === product?.id) {
						return { ...item, quantity: item.quantity + 1 }
					}
					//If item.id === id ovan is false, then this is an item that should not be updated, so we just return this item without any changes
					else {
						return item
					}
				})
			}
		})
	}

	const decreaseCartQuantity = (product: Product) => {
		setCartItems((currItems) => {
			//Only difference to increaseCartQuantity is that we need to check if our quantity
			//is equal to 1. And if it is 1 we want to completely get rid of it and
			// remove it (using filter for "when the item.id is not equal to our id)
			if (currItems.find((item) => item.product?.id === product?.id)?.quantity == 1) {
				return currItems.filter((item) => item.product?.id !== product?.id)
			} else {
				//And down here, the only thing we need to change is the plus one to -1
				return currItems.map((item) => {
					if (item.product?.id === product?.id) {
						return { ...item, quantity: item.quantity - 1 }
					}
					//If item.id === id here above is false, then this is an item that should not be updated, so we just return this item without any changes
					else {
						return item
					}
				})
			}
		})
	}

	const removeFromCart = (product: Product) => {
		//Here we just get our currItems and filter out the one where the id is not equal to our current item id
		setCartItems((currItems) => {
			return currItems.filter((item) => item.product.id !== product.id)
		})
		checkCartEmpty()
	}

	return (
		<CartContext.Provider
			value={{
				isCartOpen,
				openCart,
				closeCart,
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				// addItemToCart,
				showIsAddedToCart,
				checkCartEmpty,
				isCartEmpty,
				cartQuantity,
			}}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	return useContext(CartContext)
}
