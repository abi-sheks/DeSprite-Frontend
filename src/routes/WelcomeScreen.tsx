// @ts-nocheck


import React from 'react'
import { Text, Heading } from '@chakra-ui/react'

const WelcomeScreen = () => {
  return (
    <div className='container' style={{
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        padding : '3rem',
    }}>
      <Heading color='secondary'>To get started, visit the marketplace. </Heading>
      <Text color='secondary'>Or, get involved in  the ecosystem by creating your own NFT.</Text>
    </div>
  )
}

export default WelcomeScreen
