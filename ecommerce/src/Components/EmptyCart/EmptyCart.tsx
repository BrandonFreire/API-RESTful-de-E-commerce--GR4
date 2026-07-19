import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    animation: ${fadeIn} 1s ease-in-out;
    color: ${(props) => props.theme.text};
`;

const EmptyTitle = styled.h2`
    font-size: 2em;
    margin-top: 20px;
`;

const SignInText = styled.p`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 1.2em;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const Button = styled.button`
    width: 200px;
    border: none;
    background: #047d40;
    font-size: 18px;
    color: white;
    padding: 15px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    &:hover {
        opacity: 0.9;
    }
`;

const EmptyCart: React.FC = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
        window.scrollTo(0, 0);
    };

    const navigateToShop = () => {
        navigate('/shop');
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <ShoppingCartOutlined style={{ fontSize: '8em', opacity: 0.5 }} />
            <EmptyTitle>Your Cart Is Empty</EmptyTitle>
            <SignInText>Log in now to see your cart and get shopping!</SignInText>
            <ButtonWrapper>
                <Button onClick={navigateToShop}>Shop Now</Button>
                <Button onClick={navigateToLogin}>Log In</Button>
            </ButtonWrapper>
        </Container>
    );
};

export default EmptyCart;