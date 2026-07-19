import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { sliderProducts } from '../../sample'; 
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 130px); /* Restamos la altura del Navbar y Announcement */
    display: flex;
    position: relative;
    overflow: hidden;
`;

const Arrow = styled.div<{ direction: string }>`
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    cursor: pointer;
    z-index: 2;
`;

const Wrapper = styled.div<{ slideIndex: number }>`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div<{ bg: string }>`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100%;
    background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    height: 80%;
    max-width: 90%;
    object-fit: cover;
    border-radius: 10px;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;

const Slider: React.FC = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = (direction: string) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderProducts.length - 1);
        } else {
            setSlideIndex(slideIndex < sliderProducts.length - 1 ? slideIndex + 1 : 0);
        }
    };

    const navigateToShop = () => {
        navigate('/shop');
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlinedIcon />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderProducts.map((item) => (
                    <Slide bg={item.background} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} alt={item.title} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button onClick={navigateToShop}>COMPRAR AHORA</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlinedIcon />
            </Arrow>
        </Container>
    );
};

export default Slider;