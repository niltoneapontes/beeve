import React from 'react'
import { Container, MessageTitle } from './styles'

function EmptyList() {
  return (
    <Container>
      <MessageTitle>Oops... Sem bebidas cadastradas ainda :(</MessageTitle>
    </Container>
  )
}

export default EmptyList