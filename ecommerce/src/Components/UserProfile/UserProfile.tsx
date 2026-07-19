import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/UserContext';
import { UserContextState } from '../../Types/User';
import Navbar from '../Navbar/Navbar';
import ReceiptCard from './ReceiptCard';
import NoPastOrder from './NoPastOrder';

const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    min-height: 100vh;
    color: ${(props) => props.theme.text};
`;

const Wrapper = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: auto;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 20px;
    &:hover {
        background-color: #c9302c;
    }
`;

const UserProfile: React.FC = () => {
    const { currentUser, logoutUser } = useContext(Context) as UserContextState;
    const [orders, setOrders] = useState<any[]>([]);
    const navigate = useNavigate();

    // 1. Recuperamos el ID del disco duro por si React perdió la memoria al recargar
    const storedUserId = localStorage.getItem("curUserI");
    const activeUserId = currentUser?.userId ? currentUser.userId : Number(storedUserId);

    useEffect(() => {
        const fetchOrders = async () => {
            if (activeUserId) {
                try {
                    // Consultamos las compras de este usuario específico
                    const res = await axios.get(`http://localhost:5046/api/receipts/user/${activeUserId}`);
                    setOrders(res.data);
                } catch (e) {
                    console.error("Error cargando órdenes", e);
                }
            }
        };
        fetchOrders();
    }, [activeUserId]);

    // 2. Función completa para cerrar sesión
    const handleLogout = () => {
        logoutUser(); // Limpia la memoria de React
        localStorage.removeItem("curUserL"); // Borra la bandera de logueado
        localStorage.removeItem("curUserI"); // Borra tu ID del navegador
        navigate('/'); // Te redirige al Home
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <Navbar />
            <Wrapper>
                {/* Mostramos el nombre o un texto por defecto si se recargó */}
                <h1>Welcome, {currentUser?.firstName || 'Usuario'}</h1>
                <p style={{marginBottom: '20px'}}>
                    Email: {currentUser?.email || 'Sesión recuperada de caché'}
                </p>
                
                <Button onClick={handleLogout}>Log Out</Button>
                
                <h2 style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>
                    Your Past Orders
                </h2>
                
                {orders.length > 0 ? (
                    orders.map((o) => <ReceiptCard key={o.receiptId} receipt={o} />)
                ) : (
                    <NoPastOrder />
                )}
            </Wrapper>
        </Container>
    );
};

export default UserProfile;