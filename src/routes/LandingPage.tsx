// @ts-nocheck

import React from 'react'
import { Link } from 'react-router-dom';
import { Heading, Text, Button, Box } from '@chakra-ui/react'

const LandingPage = () => {


  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    }}>
      <Box className='vert-margin'>
        <Heading as='h2' size='2xl' color='secondary'>Welcome to DeSprite.</Heading>
        <Text align='center' color='secondary' >Your go-to marketplace for trading game assets.</Text>
      </Box>
      <Button as={Link} to='/home' colorScheme='primary' variant='solid' className='vert-margin'>Get Started with Metamask</Button>
    </div >
  )
}

export default LandingPage

