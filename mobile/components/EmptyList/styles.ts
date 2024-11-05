import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    margin-top: 24px;
    align-items: center;
    justify-content: center;
`

export const MessageTitle = styled.Text`
    color: ${props => props.theme.textColor};
    font-family: 'RalewayBold';
    font-size: 24px;
    text-align: center;
`