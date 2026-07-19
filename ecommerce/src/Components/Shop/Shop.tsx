import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../Types/Product';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    background-color: ${(props) => props.theme.background};
    min-height: 100vh;
    color: ${(props) => props.theme.text};
`;

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
    margin-bottom: 30px;
    letter-spacing: 2px;
    font-weight: 300;
`;

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    gap: 15px;
`;

const LoadingText = styled.h3`
    opacity: 0.6;
    margin-top: 50px;
`;

const Shop: React.FC = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Consulta directa a tu backend en C#
            const response = await axios.get('http://localhost:5046/api/products');
            
            // Mapeamos los datos del backend para que coincidan con la interfaz de TypeScript del Frontend
            const fetchedProducts = response.data.map((p: any) => ({
                itemId: p.productId, // En C# lo llamamos productId, en TS itemId
                imageUrl: p.imageUrl || "https://via.placeholder.com/300?text=No+Image",
                name: p.name,
                description: p.description,
                price: p.price,
                amount: 1
            }));
            
            setProductsList(fetchedProducts);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los productos desde la API", error);
            setLoading(false);
        }
    };

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>NUESTROS PRODUCTOS</Title>
                {loading ? (
                    <LoadingText>Cargando catálogo...</LoadingText>
                ) : (
                    <ProductsGrid>
                        {productsList.length > 0 ? (
                            productsList.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))
                        ) : (
                            <LoadingText>No hay productos disponibles en este momento.</LoadingText>
                        )}
                    </ProductsGrid>
                )}
            </Wrapper>
        </Container>
    );
};

export default Shop;