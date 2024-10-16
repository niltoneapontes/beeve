import React from 'react'
import { ParagraphText } from './styles'
import { TextProps } from 'react-native';

interface IParagraph extends TextProps {
    content: string;
}

function Paragraph({ content, ...props}: IParagraph) {
  return (
    <ParagraphText style={{ fontSize: 16 }} {...props}>
        { content }
    </ParagraphText>
  )
}

export default Paragraph