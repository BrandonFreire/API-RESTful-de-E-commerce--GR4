import React from 'react';
import styled, { keyframes } from 'styled-components';
import NewTabs from './Tabs/NewTabs';

// Animación de aparición
const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    height: 100vh;
    background-color: ${(props) => props.theme?.background || '#eeeeee'};
    animation: ${fadeIn} 1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Login: React.FC = () => {
    return (
        <Container>
            <NewTabs />
        </Container>
    );
};

export default Login;