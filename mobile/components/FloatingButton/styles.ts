import styled from "styled-components/native";

interface ButtonProps {
    type: 'primary' | 'secondary'
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    background: ${props => props.theme[props.type]};
    padding: 16px;
    border-radius: 32px;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 16px;
    bottom: 16px;
`