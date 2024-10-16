import { styled } from 'styled-components/native'

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`

export const TextContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;
    width: 100%;
`

export const ButtonContainer = styled.View`
    flex-direction: row;
    margin: 20px 0;
`