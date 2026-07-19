import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context as ProductContext } from '../../Context/ProductContext';
import { ProductContextState } from '../../Types/Product';
import { Context as UserContext } from '../../Context/UserContext';
import { UserContextState } from '../../Types/User';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    width: 100%;
    max-width: 450px;
    padding: 20px;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    animation: ${fadeIn} 1s;
    border-radius: 10px;
    margin-top: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-size: 14px;
`;

const Input = styled.input`
    width: 95%;
    padding: 10px;
    color: ${(props) => props.theme.text};
    outline: 1px solid ${(props) => props.theme.border};
    border: none;
    background: transparent;
    border-radius: 4px;
    font-size: 16px;
`;

const CCWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
`;

const PlaceOrder = styled.button`
    border: none;
    background: #047d40;
    padding: 15px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    margin-top: 15px;
    border-radius: 5px;
    font-weight: bold;
    width: 100%;
    &:hover {
        opacity: 0.9;
    }
`;

const CheckoutForm: React.FC = () => {
    const navigate = useNavigate();
    const { products, removeAllProductsFromCart } = useContext(ProductContext) as ProductContextState;
    const { currentUser } = useContext(UserContext) as UserContextState;

    const [address, setAddress] = useState(currentUser?.address || '');
    const [phone, setPhone] = useState(currentUser?.phoneNumber || '');

    const createReceipt = async () => {
        try {
            // Mapeamos los datos de React al DTO CreateReceiptRequest de nuestra API C#
            const items = products.map(p => ({
                productId: p.itemId, 
                quantity: p.amount
            }));

            // SOLUCIÓN: Buscamos el ID del usuario en localStorage si el contexto se reinició por un F5
            const storedUserId = localStorage.getItem("curUserI");
            const finalUserId = currentUser?.userId ? currentUser.userId : Number(storedUserId);

            if (!finalUserId) {
                alert("Sesión no válida. Por favor, cierra sesión y vuelve a ingresar.");
                return;
            }

            const payload = {
                userId: finalUserId,
                items: items
            };

            // Petición POST a tu backend
            await axios.post('http://localhost:5046/api/receipts', payload);
            
            // Si la API en C# responde 201 Created: vaciamos carrito y redirigimos
            removeAllProductsFromCart();
            navigate('/success');
            window.scrollTo(0, 0);

        } catch (error) {
            console.error("Error procesando la orden:", error);
            alert("Hubo un error al procesar tu compra. Revisa el stock disponible.");
        }
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if(products.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        createReceipt();
    };

    return (
        <Container>
            <Form onSubmit={handlePlaceOrder}>
                <InputWrapper>
                    <Label>DELIVERY ADDRESS</Label>
                    <Input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label>PHONE NUMBER</Label>
                    <Input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label>CREDIT CARD NUMBER</Label>
                    <Input required maxLength={16} placeholder="****************" type="text" />
                </InputWrapper>
                <CCWrapper>
                    <InputWrapper>
                        <Label>EXP DATE</Label>
                        <Input required placeholder="MM/YY" type="text" />
                    </InputWrapper>
                    <InputWrapper>
                        <Label>CVV</Label>
                        <Input required maxLength={3} placeholder="***" type="password" />
                    </InputWrapper>
                </CCWrapper>
                <PlaceOrder type="submit">SUBMIT ORDER</PlaceOrder>
            </Form>
        </Container>
    );
};

export default CheckoutForm;