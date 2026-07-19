import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 60px;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid ${(props) => props.theme.border};
    margin-top: auto;
    width: 100%;
`;

const Footer: React.FC = () => {
    return (
        <Container>
            <p>&copy; 2026 CompoColtis. Todos los derechos reservados.</p>
        </Container>
    );
};

export default Footer;