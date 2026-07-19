import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme';
import { GlobalStyles } from '../globalStyles';
import Announcement from './Announcement/Announcement';
import Navbar from './Navbar/Navbar';
import Slider from './Slider/Slider';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const ThemeButton = styled.button`
    position: fixed;
    z-index: 3;
    bottom: 60px;
    right: 20px;
    background: transparent;
    cursor: pointer;
    border: none;
`;

const Home: React.FC = () => {
    // Estado local para manejar el tema
    const [theme, setTheme] = useState('light');

    // Función para alternar el tema y guardarlo en el navegador
    const themeToggler = () => {
        if (localStorage.getItem('theme') === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    };

    // Efecto para leer la preferencia guardada al cargar la página
    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        } else {
            localStorage.setItem('theme', 'light');
        }
    }, []);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles theme={theme === 'light' ? lightTheme : darkTheme} />
            
            {/* Botón flotante para cambiar el tema */}
            <ThemeButton onClick={themeToggler}>
                {theme === 'light' ? (
                    <DarkModeOutlinedIcon style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'transparent', color: '#333' }} />
                ) : (
                    <LightModeOutlinedIcon style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'transparent', color: 'white' }} />
                )}
            </ThemeButton>

            <Container>
                <Announcement />
                <Navbar />
                <Slider />
            </Container>
        </ThemeProvider>
    );
};

export default Home;