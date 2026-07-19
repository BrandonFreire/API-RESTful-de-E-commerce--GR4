import React, { useState } from "react";
import { User, UserContextState } from "../Types/User";

interface ProviderProps {
    children: React.ReactNode;
}

// Crear contexto para el estado del usuario
export const Context = React.createContext<UserContextState | null>(null);

export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
    // Estado de usuarios
    const [users, setUsers] = useState<User[]>([]);
    // Estado de inicio de sesión
    const [logged, setLogged] = useState<boolean>(false);
    // Estado de la pestaña actual
    const [currentTab, setCurrentTab] = useState<string>('1');
    // Estado del modal
    const [modal, setModal] = useState<boolean>(false);
    // Estado del usuario actual
    const [currentUser, setCurrentUser] = useState<User>({
        userId: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: ''
    });

    // Agregar un usuario nuevo
    const addUser = (user: User) => {
        const newUser: User = {
            userId: Math.floor(Math.random() * 1000) + 1,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            password: user.password,
        };
        setUsers([...users, newUser]);
    };

    // Actualizar un usuario existente
    const updateUser = (id: number) => {
        users.filter((user: User) => {
            if (user.userId === id) {
                setUsers([...users]);
            }
        });
    };

    // Eliminar un usuario
    const removeUser = (id: number) => {
        setUsers(users.filter((user: User) => user.userId !== id));
    };

    // Actualizar la pestaña de la cuenta
    const updateAccountTab = () => {
        if (currentTab === '1') {
            setCurrentTab('2');
        } else {
            setCurrentTab('1');
        }
    };

    // Iniciar sesión del usuario
    const loginUser = (user: User) => {
        setLogged(true);
        setCurrentUser(user);
    };

    // Actualizar el usuario actual
    const updateCurrentUser = (user: User) => {
        setCurrentUser(user);
    };

    // Cerrar sesión del usuario
    const logoutUser = () => {
        setLogged(false);
        setCurrentUser({
            userId: 0,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            password: ''
        });
    };

    // Mostrar o ocultar el modal
    const displayModal = (b: boolean) => {
        setModal(b);
    };

    return (
        <Context.Provider
            value={{
                users,
                addUser,
                updateUser,
                removeUser,
                currentTab,
                updateAccountTab,
                logged,
                loginUser,
                logoutUser,
                currentUser,
                updateCurrentUser,
                displayModal,
                modal,
            }}
        >
            {children}
        </Context.Provider>
    );
};