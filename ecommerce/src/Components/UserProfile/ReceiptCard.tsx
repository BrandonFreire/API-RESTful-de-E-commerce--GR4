import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid ${(props) => props.theme.border};
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const ReceiptCard: React.FC<{ receipt: any }> = ({ receipt }) => {
    return (
        <Container>
            <h4>Receipt ID: {receipt.receiptId}</h4>
            <p>Date: {new Date(receipt.createdAt).toLocaleDateString()}</p>
            <p>Total: ${receipt.total.toFixed(2)}</p>
        </Container>
    );
};

export default ReceiptCard;