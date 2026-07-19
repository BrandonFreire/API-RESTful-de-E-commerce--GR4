import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../Context/ProductContext';
import { ProductContextState } from '../../Types/Product';

const Container = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    background: ${(props) => props.theme.body};
    margin-bottom: 20px;
    border-radius: 10px;
`;

const CartBalanceTitle = styled.h3`
    padding-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.theme.border};
    margin-top: 0;
`;

const ItemRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
`;

const ItemName = styled.span`
    flex: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
`;

const ItemPrice = styled.span`
    font-weight: bold;
`;

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid ${(props) => props.theme.border};
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: bold;
`;

const DollarAmount = styled.div`
    font-size: 16px;
`;

const TotalWrapper = styled(BottomWrapper)`
    border-top: 2px solid ${(props) => props.theme.border};
    padding-top: 15px;
    font-size: 18px;
`;

const TotalAmount = styled(DollarAmount)`
    font-weight: bold;
    color: #047d40;
`;

const CartBalanceCard: React.FC = () => {
    const { products, cartTotal } = useContext(Context) as ProductContextState;

    let subtotal = cartTotal(products);
    let shipping = subtotal > 80.00 ? 0 : 5.00; // Envío gratis si supera los $80
    let total = subtotal + shipping;

    return (
        <Container>
            <CartBalanceTitle>Cart Summary</CartBalanceTitle>
            
            {/* Lista rápida de productos */}
            {products.map((product, index) => (
                <ItemRow key={index}>
                    <ItemName>{product.amount}x {product.name}</ItemName>
                    <ItemPrice>${(product.price * product.amount).toFixed(2)}</ItemPrice>
                </ItemRow>
            ))}

            <BottomWrapper>
                <Title>Subtotal</Title>
                <DollarAmount>${subtotal.toFixed(2)}</DollarAmount>
            </BottomWrapper>
            
            <BottomWrapper>
                <Title>Shipping</Title>
                <DollarAmount>${shipping === 0 ? 'FREE' : shipping.toFixed(2)}</DollarAmount>
            </BottomWrapper>

            <TotalWrapper>
                <Title>Total</Title>
                <TotalAmount>${total.toFixed(2)}</TotalAmount>
            </TotalWrapper>
        </Container>
    );
};

export default CartBalanceCard;