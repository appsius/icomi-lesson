import React, { createContext, useState, useEffect } from 'react';
import {
	addItemToCart,
	removeItemFromCart,
	filterItemFromCart,
	getCartItemsCount,
} from './cart.utils';

export const CartContext = createContext({
	hidden: true,
	cartItems: [],
	cartItemsCount: 0,
	toggleHidden: () => {},
	addItem: () => {},
	removeItem: () => {},
	clearItemFromCart: () => {},
});

const CartProvider = ({ children }) => {
	const [hidden, setHidden] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [cartItemsCount, setCartItemsCount] = useState(0);

	const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
	const toggleHidden = () => setHidden(!hidden);
	const removeItem = (item) =>
		setCartItems(removeItemFromCart(cartItems, item));
	const clearItemFromCart = (item) =>
		setCartItems(filterItemFromCart(cartItems, item));

	useEffect(() => {
		setCartItemsCount(getCartItemsCount(cartItems));
	}, [cartItems]);

	return (
		<CartContext.Provider
			value={{
				hidden,
				toggleHidden,
				cartItems,
				addItem,
				removeItem,
				cartItemsCount,
				clearItemFromCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
