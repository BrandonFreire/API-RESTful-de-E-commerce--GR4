import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UserContextState } from '../../../Types/User';
import { Context } from '../../../Context/UserContext';

const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    padding: 30px;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-weight: bold;
    margin: 5px 10px;
    text-align: left;
    display: block;
`;

const Input = styled.input`
    font-size: 16px;
    width: 95%;
    padding: 8px;
    color: ${(props) => props.theme.text};
    outline: 1px solid ${(props) => props.theme.border};
    border: none;
    background: transparent;
`;

const LoginButton = styled.button`
    border: none;
    background: #047d40;
    padding: 15px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    &:hover {
        opacity: 0.9;
    }
`;

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const { loginUser } = useContext(Context) as UserContextState;
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleLogin = async () => {
        let loginData = { email, password };
        try {
            // Petición directa a tu API en C#
            let res = await axios.post('http://localhost:5046/api/users/login', loginData);
            let user = res.data;
            
            if (user) {
                localStorage.setItem("curUserI", user.userId.toString());
                loginUser(user);
                localStorage.setItem("curUserL", "true");
                navigate("/");
                setError(false);
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
        }
    };

    return (
        <Container>
            {error && <h4 style={{color: 'red'}}>Credenciales incorrectas. Intente nuevamente.</h4>}
            <Form onSubmit={(e) => e.preventDefault()}>
                <InputWrapper>
                    <Label>EMAIL ADDRESS</Label>
                    <Input onChange={handleChange} name='email' type='email' />
                </InputWrapper>
                <InputWrapper>
                    <Label>PASSWORD</Label>
                    <Input onChange={handleChange} name='password' type='password' />
                </InputWrapper>
                <LoginButton type='button' onClick={handleLogin}>LOGIN</LoginButton>
            </Form>
        </Container>
    );
};

export default LoginForm;