import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalType {
    children: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

const ModalOverlay = styled.div`
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled.div`
    display: block;
    background: ${(props) => props.theme?.body || 'white'};
    width: fit-content;
    height: fit-content;
    padding: 1rem;
    border-radius: 10px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${(props) => props.theme?.text || 'black'};
`;

export default function Modal(props: ModalType) {
    return (
        <>
            {props.isOpen && (
                <ModalOverlay onClick={props.toggle}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={props.toggle}>&times;</CloseButton>
                        {props.children}
                    </ModalBox>
                </ModalOverlay>
            )}
        </>
    );
}

// Hook personalizado para manejar el estado del modal fácilmente
export function useModal() {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return {
        isOpen,
        toggle
    };
}