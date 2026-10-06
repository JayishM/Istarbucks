import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);


    // ADD TO CART
    const addToCart = (product) => {

    const customizationId = [
        product.name,
        product.size || "default",
        product.temperature || "default",
        product.sugar || "default",
        product.milk || "default",
        product.extras?.extraShot || false,
        product.extras?.oatMilk || false,
        product.extras?.caramel || false
    ].join("-");

    setCart(currentCart => {

        const existing = currentCart.find(
            item => item.customizationId === customizationId
        );

        if (existing) {

            return currentCart.map(item =>
                item.customizationId === customizationId
                    ? {
                        ...item,
                        quantity: item.quantity + (product.quantity || 1)
                    }
                    : item
            );

        }

        return [
            ...currentCart,
            {
                ...product,
                customizationId,
                quantity: product.quantity || 1
            }
        ];

    });
};


    // REMOVE FROM CART
    const removeFromCart = (name) => {

        setCart(currentCart =>
            currentCart.filter(
                item => item.name !== name
            )
        );

    };


    // INCREASE QUANTITY
    const increaseQuantity = (name) => {

        setCart(currentCart =>
            currentCart.map(item =>
                item.name === name
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );

    };


    // DECREASE QUANTITY
    const decreaseQuantity = (name) => {

        setCart(currentCart =>
            currentCart
                .map(item =>
                    item.name === name
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );

    };


    // CLEAR CART
    const clearCart = () => {

        setCart([]);

    };


    // SAVE ORDER
    const saveOrder = (order) => {

        const existingOrders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

        const updatedOrders = [
            ...existingOrders,
            order
        ];

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );

    };


    // ORDER AGAIN
    const reorderItems = (items) => {

        setCart(
            items.map(item => ({
                ...item,
                quantity: item.quantity
            }))
        );

    };


    // TOTAL NUMBER OF ITEMS
    const cartCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // TOTAL PRICE
    const cartTotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) * item.quantity,
        0
    );


    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                saveOrder,
                reorderItems,
                cartCount,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );

}


export function useCart() {

    return useContext(CartContext);

}