import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Context } from '../../Context/ProductContext';
import { ProductContextState } from '../../Types/Product';
import CartCard from '../CartCard/CartCard';
import CartBalanceCard from '../CartBalanceCard/CartBalanceCard';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import EmptyCart from '../EmptyCart/EmptyCart';
import Navbar from '../Navbar/Navbar';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    min-height: 100vh;
    color: ${(props) => props.theme.text};
`;

const Wrapper = styled.div`
    padding: 20px;
    animation: ${fadeIn} 1s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    letter-spacing: 2px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
    gap: 30px;

    /* Diseño responsivo para pantallas más pequeñas */
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Info = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
`;

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Cart: React.FC = () => {
    const { products } = useContext(Context) as ProductContextState;

    // Asegurarnos de que la página cargue desde arriba
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>YOUR CART</Title>
                
                {/* Lógica condicional: Si no hay productos, muestra EmptyCart */}
                {products.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <Bottom>
                        {/* Lado izquierdo: Lista de tarjetas de productos */}
                        <Info>
                            {products.map((product, index) => (
                                <CartCard key={index} {...product} />
                            ))}
                        </Info>
                        
                        {/* Lado derecho: Tarjeta de balance y Formulario de pago */}
                        <Summary>
                            <CartBalanceCard />
                            <CheckoutForm />
                        </Summary>
                    </Bottom>
                )}
            </Wrapper>
        </Container>
    );
};

export default Cart;