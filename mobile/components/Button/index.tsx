import React from 'react'
import { ButtonText, Container } from './styles'
import { Text, TouchableOpacityProps } from 'react-native';
import { DarkTheme } from '@/constants/Colors';

interface IButton extends TouchableOpacityProps {
    content: string;
    type: 'primary' | 'white' | 'danger'
    onPress: () => void
}

function Button({ content, type, onPress, ...props }: IButton) {
  const color = () => {
    switch(type) {
      case 'primary':
        return 'white'
      case 'danger':
        return 'danger'
      case 'white':
        return 'primary'
      default:
        return 'primary'
    }
  }
  
  return (
    <Container type={type} style={{ height: 56 }} onPress={onPress} {...props}>
      <ButtonText textColor={color()} style={{fontSize: 20}}>{content}</ButtonText>
    </Container>
  )
}

export default Button