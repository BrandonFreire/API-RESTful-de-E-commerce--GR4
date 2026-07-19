import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    padding: 20px;
    opacity: 0.7;
`;

const NoPastOrder: React.FC = () => (
    <Container><h3>No past orders found.</h3></Container>
);

export default NoPastOrder;