import React, { useState } from 'react';
import { Product, ProductContextState } from '../Types/Product';

interface ProviderProps {
    children: React.ReactNode;
}

export const Context = React.createContext<ProductContextState | null>(null);

const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
    // Estado para almacenar la lista de productos en el carrito
    const [products, setProducts] = useState<Product[]>([]);
    // Estado para almacenar el número de elementos
    const [cartNumber, setCartNumber] = useState<number>(0);
    // Estado para almacenar el término de búsqueda
    const [search, setSearch] = useState<string>('');

    // Agregar un producto al carrito
    const addProductToCart = (product: Product) => {
        const addedProduct: Product = {
            itemId: product.itemId,
            imageUrl: product.imageUrl,
            name: product.name,
            description: product.description,
            price: product.price,
            amount: product.amount,
        };

        let addProduct: boolean = true;
        for (let i: number = 0; i < products.length; i++) {
            if (products[i].itemId === addedProduct.itemId) {
                products[i].amount++;
                addProduct = false;
            }
        }
        if (addProduct) {
            setProducts([...products, addedProduct]);
        }
    };

    // Eliminar un producto del carrito
    const removeProductFromCart = (productId: number) => {
        setProducts(products.filter((product: Product) => product.itemId !== productId));
    };

    // Eliminar todos los productos del carrito
    const removeAllProductsFromCart = () => {
        setProducts([]);
    };

    // Actualizar el número de elementos en el carrito
    const itemsInCart = (n: number): number => {
        setCartNumber(cartNumber + n);
        return cartNumber;
    };

    // Actualizar la cantidad de un producto específico en el carrito
    const updateAmount = (productId: number, n: number) => {
        for (let i: number = 0; i < products.length; i++) {
            if (productId === products[i].itemId) {
                products[i].amount = products[i].amount + n;
            }
        }
        setProducts([...products]);
    };

    // Calcular el total del carrito
    const cartTotal = (products: Product[]): number => {
        let total: number = 0;
        for (let i: number = 0; i < products.length; i++) {
            total += products[i].price * products[i].amount;
        }
        return total;
    };

    // Realizar una búsqueda de productos
    const itemSearch = (e: string) => {
        if (e) {
            setSearch(e);
        }
    };

    return (
        <Context.Provider value={{
            products,
            addProductToCart,
            removeProductFromCart,
            itemsInCart,
            cartTotal,
            cartNumber,
            updateAmount,
            itemSearch,
            search,
            removeAllProductsFromCart
        }}>
            {children}
        </Context.Provider>
    );
};

export default ProductProvider;