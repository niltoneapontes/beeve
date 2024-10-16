import { styled } from 'styled-components/native'

export const Container = styled.View`
    background-color: ${props => props.theme.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 16px;
    width: 100%;
    flex: 1;
`

export const Header = styled.View`
    background-color: ${props => props.theme.primary};
    height: 200px;
    width: 100%;
`

export const ProfileImage = styled.Image`
`

export const ButtonContainer = styled.View`
    flex-direction: row;
`