// @ts-nocheck
'use client';

import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../../app/hooks/useLocalStorage';
import { useEffect } from 'react';

export type CartContextProps = {
	isCartOpen: boolean;
	setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
	openCart: () => void;
	closeCart: () => void;

	getItemQuantity: (product: Product) => number;
	increaseCartQuantity: (product: Product) => void;
	decreaseCartQuantity: (product: Product) => void;
	removeFromCart: (product: Product) => void;

	setSelectedLength: React.Dispatch<React.SetStateAction<string>>;

	selectLength: (selectedOption: string) => void;
	selectedLength: null | string;

	checkCartEmpty: () => void;
	isCartEmpty: boolean;
	setIsCartEmpty: React.Dispatch<React.SetStateAction<boolean>>;

	addedToCart: () => void;
	isAddedToCart: boolean;
	setIsAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;

	cartItems: CartItem[];

	cartQuantity: number;
};

type Product = {
	id: number;
	name: string;
	price: string;
	length: string;
};

type CartProviderProps = {
	children: React.ReactNode;
};

type CartItem = {
	product: Product;
	quantity: number;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

	const [selectedLength, setSelectedLength] = useLocalStorage<string>('selectedBoardLength', '');

	const selectLength = (selectedOption: string) => {
		setSelectedLength(selectedOption);
	};

	const addedToCart = () => {
		setIsAddedToCart(true);
	};

	const openCart = () => {
		setIsCartOpen(true);
		setIsAddedToCart(false);
	};

	const closeCart = () => {
		setIsCartOpen(false);
	};

	const [cartItems = [], setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

	// const [isCartEmpty, setIsCartEmpty] = useLocalStorage<boolean>('isCartEmpty', cartItems.length === 0);
	//In this approach, you're calculating the default value isCartEmptyDefault separately from the useLocalStorage call (jmf med
	//i bortkommenterade ovan). This ensures that isCartEmptyDefault is only calculated after cartItems has been initialized, thus
	//avoiding the TypeError.
	const isCartEmptyDefault = cartItems.length === 0; // Calculate the default value based on cartItems
	const [isCartEmpty, setIsCartEmpty] = useLocalStorage<boolean>('isCartEmpty', isCartEmptyDefault);

	useEffect(() => {
		setIsCartEmpty(cartItems.length === 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartItems]);

	const checkCartEmpty = () => {
		if (cartItems.length !== 0) {
			setIsCartEmpty(false);
		} else {
			setIsCartEmpty(true);
			localStorage.removeItem('selectedBoardLength');
		}
	};

	const getItemQuantity = (product: Product) => {
		return cartItems.find((item) => item.product?.id === product.id)?.quantity || 0;
	};

	const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

	const increaseCartQuantity = (product: Product) => {
		console.log(product);
		setCartItems((currItems) => {
			if (currItems.find((item) => item.product?.id === product?.id) == null) {
				return [...currItems, { product, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.product?.id === product?.id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseCartQuantity = (product: Product) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.product?.id === product?.id)?.quantity == 1) {
				return currItems.filter((item) => item.product?.id !== product?.id);
			} else {
				return currItems.map((item) => {
					if (item.product?.id === product?.id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
		checkCartEmpty();
	};

	const removeFromCart = (product: Product) => {
		localStorage.removeItem('selectedBoardLength');

		setCartItems((currItems) => {
			return currItems.filter((item) => item.product.id !== product.id);
		});

		checkCartEmpty();
	};

	return (
		<CartContext.Provider
			value={{
				isCartOpen,
				setIsCartOpen,
				openCart,
				closeCart,
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				checkCartEmpty,
				isCartEmpty,
				cartQuantity,
				isAddedToCart,
				setIsAddedToCart,
				addedToCart,
				selectLength,
				selectedLength,
				setSelectedLength,
				setIsCartEmpty,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
