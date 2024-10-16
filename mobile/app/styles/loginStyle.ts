import { styled } from 'styled-components/native'

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
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
    align-items: center;
    justify-content: center;
    margin: 16px 0 0;
    width: 100%;
`