import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';

const Container = styled.div`
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.text};
`;

const Wrapper = styled.div`
    height: fit-content;
    width: 450px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.body};
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const TabButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 10px;
    width: 50%;
    font-size: 1.2em;
    font-weight: bold;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    opacity: 0.5;
    transition: all 0.3s ease;

    &:disabled {
        opacity: 1;
        border-bottom: 3px solid #6bc5f2;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const NewTabs: React.FC = () => {
    const [currentTab, setCurrentTab] = useState('1');

    const tabs = [
        { id: '1', tabTitle: 'Login' },
        { id: '2', tabTitle: 'Register' }
    ];

    const handleTabClick = () => {
        setCurrentTab(currentTab === '1' ? '2' : '1');
    };

    return (
        <Container>
            <Wrapper>
                <TabsContainer>
                    {tabs.map((tab, index) => (
                        <TabButton 
                            key={index} 
                            disabled={currentTab === tab.id} 
                            onClick={handleTabClick}
                        >
                            {tab.tabTitle}
                        </TabButton>
                    ))}
                </TabsContainer>
                <Content>
                    {currentTab === '1' ? <LoginForm /> : <RegisterForm />}
                </Content>
            </Wrapper>
        </Container>
    );
};

export default NewTabs;