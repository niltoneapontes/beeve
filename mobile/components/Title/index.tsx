import React from 'react'
import { TitleText } from './styles'
import { TextProps } from 'react-native';

interface ITitle extends TextProps {
    content: string;
}

function Title({ content, ...props }: ITitle) {
  return (
    <TitleText style={{ fontSize: 32, marginTop: 36 }} {...props}>
        { content }
    </TitleText>
  )
}

export default Title