import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../Context/ProductContext';
import { Product, ProductContextState } from '../../Types/Product';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Container = styled.div`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.body};
    padding-bottom: 15px;
    margin-bottom: 15px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: flex-end;
    margin: 10px;
    width: 100%;
    padding-inline: 20px;
`;

const ImageContainer = styled.div`
    height: 80px;
    flex: 1;
    display: flex;
    justify-content: center;
`;

const Image = styled.img`
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    padding-left: 15px;
`;

const Title = styled.div`
    padding-top: 5px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const DescText = styled.div`
    font-size: 12px;
    opacity: 0.7;
`;

const CostWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 2;
`;

const Price = styled.p`
    font-size: 16px;
    font-weight: bold;
`;

const Amount = styled.p`
    font-size: 16px;
    margin: 0 15px;
`;

const AdjustContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Plus = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.text};
`;

const Minus = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.text};
`;

const DeleteButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: red;
    font-size: 20px;
    line-height: 1;
`;

const CartCard: React.FC<Product> = ({ itemId, imageUrl, name, description, price, amount }) => {
    const { itemsInCart, updateAmount, removeProductFromCart } = useContext(Context) as ProductContextState;

    const decrementItem = () => {
        if (amount > 1) {
            itemsInCart(-1);
            updateAmount(itemId, -1);
        }
    };

    const incrementItem = () => {
        itemsInCart(1);
        updateAmount(itemId, 1);
    };

    const deleteItem = () => {
        itemsInCart(-amount);
        removeProductFromCart(itemId);
    };

    return (
        <Container>
            <Wrapper>
                <ImageContainer>
                    <Image src={imageUrl} alt={name} />
                </ImageContainer>
                <DescriptionWrapper>
                    <Title>{name}</Title>
                    <DescText>{description}</DescText>
                </DescriptionWrapper>
                <CostWrapper>
                    <Price>${price.toFixed(2)}</Price>
                    <AdjustContainer>
                        <Plus onClick={incrementItem}>
                            <ArrowDropUpIcon style={{ marginBottom: "-5px" }} />
                        </Plus>
                        <Amount>{amount}</Amount>
                        <Minus onClick={decrementItem}>
                            <ArrowDropDownIcon style={{ marginTop: "-5px" }} />
                        </Minus>
                    </AdjustContainer>
                    <DeleteButton onClick={deleteItem} aria-label="remove item">
                        ×
                    </DeleteButton>
                </CostWrapper>
            </Wrapper>
        </Container>
    );
};

export default CartCard;