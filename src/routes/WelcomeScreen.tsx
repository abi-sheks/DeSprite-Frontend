// @ts-nocheck


import React from 'react'
import { Text, Heading, Flex, Highlight } from '@chakra-ui/react'

const WelcomeScreen = () => {
  return (
    <div className='container' style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3rem',
    }}>
      <Heading color='secondary'>To get started, visit the marketplace. </Heading>
      <Text color='secondary'>Or, get involved in  the ecosystem by creating your own NFT.</Text>
      <Flex direction='column' align='center' marginTop='4rem'>
        <Text color='secondary' fontWeight='700' >How does it work?</Text>
        <Text color='secondary' fontWeight='300'>Visit the marketplace to buy your favourite game assets as NFTs. Once purchased, you can view the link to your purchased assets on IPFS.</Text>
        <Text color='secondary' fontWeight='300'>
          <Highlight query='If you are a creator' styles={{ fontWeight: '700', color: 'white' }}>
            If you are a creator, its as simple as uploading your assets, giving your asset pack a name and description, and minting it to list on the marketplace.
          </Highlight>
        </Text>
      </Flex>
    </div>
  )
}

export default WelcomeScreen
