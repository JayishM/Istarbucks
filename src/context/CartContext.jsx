import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    // =========================
    // ADD TO CART
    // =========================

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

        setCart((currentCart) => {

            const existing = currentCart.find(
                item =>
                    item.customizationId === customizationId
            );

            // Same product + same customization
            // → increase quantity
            if (existing) {

                return currentCart.map(item =>
                    item.customizationId === customizationId
                        ? {
                            ...item,
                            quantity:
                                item.quantity +
                                (product.quantity || 1)
                        }
                        : item
                );
            }

            // New product/customization
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


    // =========================
    // REMOVE FROM CART
    // =========================

    const removeFromCart = (id) => {

        setCart((currentCart) =>
            currentCart.filter(
                item =>
                    (item.customizationId || item.name) !== id
            )
        );
    };


    // =========================
    // INCREASE QUANTITY
    // =========================

    const increaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart.map(item =>
                (item.customizationId || item.name) === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };


    // =========================
    // DECREASE QUANTITY
    // =========================

    const decreaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart
                .map(item =>
                    (item.customizationId || item.name) === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };


    // =========================
    // UPDATE CART ITEM
    // Used when editing customization
    // =========================

    const updateCartItem = (oldId, updatedProduct) => {

        setCart((currentCart) => {

            // Remove the old item first
            const updatedCart = currentCart.filter(
                item =>
                    (item.customizationId || item.name) !== oldId
            );

            // Check if the new customization
            // already exists in the cart
            const existingIndex = updatedCart.findIndex(
                item =>
                    item.customizationId ===
                    updatedProduct.customizationId
            );

            // If the edited customization already exists,
            // merge the quantities
            if (existingIndex !== -1) {

                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],

                    quantity:
                        updatedCart[existingIndex].quantity +
                        updatedProduct.quantity
                };

                return updatedCart;
            }

            // Otherwise add the edited item
            return [
                ...updatedCart,
                updatedProduct
            ];
        });
    };


    // =========================
    // CLEAR CART
    // =========================

    const clearCart = () => {
        setCart([]);
    };


    // =========================
    // SAVE ORDER
    // =========================

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


    // =========================
    // REORDER
    // =========================

    const reorderItems = (items) => {

        setCart(
            items.map(item => ({
                ...item,
                quantity: item.quantity
            }))
        );
    };


    // =========================
    // CART COUNT
    // =========================

    const cartCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // =========================
    // CART TOTAL
    // =========================

    const cartTotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) * item.quantity,
        0
    );


    // =========================
    // PROVIDER
    // =========================

    return (
        <CartContext.Provider
            value={{
                cart,

                addToCart,
                removeFromCart,

                increaseQuantity,
                decreaseQuantity,

                updateCartItem,

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


// =========================
// USE CART HOOK
// =========================

export function useCart() {
    return useContext(CartContext);
}