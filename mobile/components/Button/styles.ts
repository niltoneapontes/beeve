import styled from "styled-components/native";

interface ButtonProps {
    type: 'primary' | 'white' | 'black'
}

interface ButtonTextProps {
    textColor: 'primary' | 'white' | 'danger'
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    background: ${props => props.theme[props.type]};
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ButtonText = styled.Text<ButtonTextProps>`
    color: ${props => props.theme[props.textColor] ?? props.theme.primary};
    font-family: 'Raleway';
`