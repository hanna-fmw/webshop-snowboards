'use client'

import { createContext, useContext, useState } from 'react'

//OBS! Det nedan: i funktionerna så har jag varit tvungen lägga till product där
//det bara var id i tutorialen.

//Vilka funktioner behöver vi (förutom öppna/stäng cart):
//1) see how many of an item are in our cart (tar in id:t för den item vi vill ha och returnerar ett tal (antalet))
//2) increase (tar precis som 1) in id:t för den item vi vill ha men returnerar ingenting (void))
//3) decrease (tar precis som 1) och 2) in id:t för den item vi vill ha men returnerar ingenting (void))
//4) remove (also takes in an id and returns nothing (void)
//OBS! Vi behöver ingen addItem eftersom det är precis samma sak som att köra vår increase-funktion

type CartContextProps = {
	isCartOpen: boolean
	openCart: () => void
	closeCart: () => void

	getItemQuantity: (product: Product) => number
	increaseCartQuantity: (product: Product) => void
	decreaseCartQuantity: (product: Product) => void
	removeFromCart: (product: Product) => void
	addItemToCart: (product: Product) => void

	cartItems: CartItem[]
	showIsAddedToCart: boolean
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

//Our cart only has/needs information about the id and the quantity of the item. Having the
//id, we can look up all the other info such as the name, the price, the lenght and so on. And
//if we have the quantity we can calculate the total price, by using the price multiplied by the quantity.
//If we add in eg. name: string as well, this is duplicated information and if we later change the
//name, it will not line up with the cart item, but if we use id and later change the name it will
//get correctly corresponded into our cart items
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

	const openCart = () => {
		setIsCartOpen(true)
	}

	const closeCart = () => {
		setIsCartOpen(false)
	}

	//We need a place to store our item information, we do this in an useState (cartItems state) (which
	//we will later move to a custom hook for local state storage). So this is our storage place
	//for our cart items (and after that we just have to create the
	//functions to increment, decrement etc. those values):
	// const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	const getItemQuantity = (product: Product) => {
		//We want to take our current cart items and then find the item with
		//the current id (ie find the item where the current id is equal to our id). And if we
		//have that value (?) we want to return our quantity, otherwise we want to return a default
		//value of 0. So with the question mark syntax (optional chaining syntax below) we are
		//saying: if this (allt innan ?) evaluates to something, then get the quantity on it, or
		//return zero if we have nothing:
		return cartItems.find((item) => item.product.id === product.id)?.quantity || 0
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

		setCartItems((currItems) => {
			//1) The item is not already in the cart > add new item to array
			if (currItems.find((item) => item.product.id === product.id) == null) {
				return [...currItems, { product, quantity: 1 }]
			} else {
				//So, if this code block runs it´s bc the item is already in the cart, and so we just update the existing item
				return currItems.map((item) => {
					if (item.product.id === product.id) {
						return { ...item, quantity: item.quantity + 1 }
					}
					//If item.id === id here above is false, then this is an item that should not be updated, so we just return this item without any changes
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
			if (currItems.find((item) => item.product.id === product.id)?.quantity == 1) {
				return currItems.filter((item) => item.product.id !== product.id)
			} else {
				//And down here, the only thing we need to change is the plus one to -1
				return currItems.map((item) => {
					if (item.product.id === product.id) {
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

	const addItemToCart = (product: Product) => {
		setShowIsAddedToCart(true)
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

		setCartItems((currItems) => {
			//1) The item is not already in the cart > add new item to array
			if (currItems.find((item) => item.product.id === product.id) == null) {
				return [...currItems, { product, quantity: 1 }]
			} else {
				//So, if this code block runs it´s bc the item is already in the cart, and so we just update the existing item
				return currItems.map((item) => {
					if (item.product.id === product.id) {
						return { ...item, quantity: item.quantity + 1 }
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
				addItemToCart,
				showIsAddedToCart,
			}}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	return useContext(CartContext)
}
