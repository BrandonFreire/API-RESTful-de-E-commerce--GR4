import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../Context/ProductContext';
import { Product, ProductContextState } from '../../Types/Product';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Container = styled.div`
    width: 280px;
    margin: 15px;
    padding: 15px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.body};
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease;
    border: 1px solid ${(props) => props.theme.border};
    
    &:hover {
        transform: scale(1.03);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 5px;
    margin-bottom: 15px;
`;

const Title = styled.h3`
    margin: 0 0 10px 0;
    text-align: center;
    font-size: 1.2em;
    color: ${(props) => props.theme.text};
`;

const Desc = styled.p`
    font-size: 13px;
    opacity: 0.7;
    text-align: center;
    margin-bottom: 15px;
    height: 40px;
    overflow: hidden;
    color: ${(props) => props.theme.text};
`;

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: auto;
`;

const Price = styled.span`
    font-size: 22px;
    font-weight: bold;
    color: ${(props) => props.theme.text};
`;

const AddButton = styled.button`
    background-color: #047d40;
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #035c2f;
    }
`;

const ProductCard: React.FC<Product> = (product) => {
    const { addProductToCart, itemsInCart } = useContext(Context) as ProductContextState;

    const handleAddToCart = () => {
        // En el backend el producto se maneja por unidad inicialmente
        const productToAdd = { ...product, amount: 1 };
        addProductToCart(productToAdd);
        itemsInCart(1);
    };

    return (
        <Container>
            <Image src={product.imageUrl} alt={product.name} />
            <Title>{product.name}</Title>
            <Desc>{product.description}</Desc>
            <BottomWrapper>
                <Price>${product.price.toFixed(2)}</Price>
                <AddButton onClick={handleAddToCart} title="Agregar al carrito">
                    <ShoppingCartOutlinedIcon />
                </AddButton>
            </BottomWrapper>
        </Container>
    );
};

export default ProductCard;