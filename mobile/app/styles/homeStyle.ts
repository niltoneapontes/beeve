import { styled } from 'styled-components/native'

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 16px;
    flex: 1;
`