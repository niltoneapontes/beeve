import React from 'react'
import { ButtonText, Container } from './styles'
import { TouchableOpacityProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface IButton extends TouchableOpacityProps {
    content: string;
    type: 'primary' | 'white' | 'danger'
    onPress: () => void
}

function Button({ content, type, onPress, ...props }: IButton) {
  const colorScheme = useColorScheme();

  const backgroundColor = () => {
    switch(type) {
      case 'primary':
        return 'primary'
      case 'danger':
        return colorScheme === "dark" ? 'black' : 'white'
      case 'white':
        return colorScheme === "dark" ? 'black' : 'white'
      default:
        return 'primary'
    }
  }

  const color = () => {
    switch(type) {
      case 'primary':
        return 'white'
      case 'danger':
        return 'danger'
      case 'white':
        return colorScheme === "dark" ? 'white' : 'primary'
      default:
        return 'white'
    }
  }
  
  return (
    <Container type={backgroundColor()} style={{ height: 56 }} onPress={onPress} {...props}>
      <ButtonText textColor={color()} style={{fontSize: 20}}>{content}</ButtonText>
    </Container>
  )
}

export default Button