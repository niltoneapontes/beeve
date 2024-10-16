import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    background: ${props => props.theme.cardBackground};
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
`

export const CardImage = styled.Image`
    border-radius: 36px;
    width: 72px;
    height: 72px;
    margin-right: 16px;
`

export const CardTitle = styled.Text`
    color: ${props => props.theme.textColor};
    font-family: 'OpenSansBold';
`

export const CardText = styled.Text`
    color: ${props => props.theme.textColor};
    font-family: 'OpenSans';
`

export const Rating = styled.View`
    height: 24px;
    width: 120px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: row;
`