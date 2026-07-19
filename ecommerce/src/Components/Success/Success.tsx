import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
    font-size: 2.5em;
    margin-top: 20px;
    text-align: center;
`;

const Subtitle = styled.p`
    font-size: 1.2em;
    opacity: 0.8;
    margin-bottom: 30px;
    text-align: center;
`;

const Button = styled.button`
    padding: 15px 30px;
    background-color: #047d40;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1em;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        opacity: 0.9;
    }
`;

const SuccessIcon = styled.div`
    font-size: 100px;
    color: #047d40;
    line-height: 1;
`;

const Success: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const goHome = () => {
        navigate('/');
    };

    return (
        <Container>
            <SuccessIcon>✓</SuccessIcon>
            <Title>¡Compra Exitosa!</Title>
            <Subtitle>Tu orden ha sido procesada correctamente en nuestro sistema.</Subtitle>
            <Button onClick={goHome}>Volver al Inicio</Button>
        </Container>
    );
};

export default Success;