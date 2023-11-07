// @ts-nocheck


import React from 'react'
import { Grid, Heading } from '@chakra-ui/react'
import { NFTCard } from '../components'
import { items } from '../sampledata' 

const listedAssets = items.map(item => {
    return (
        <NFTCard item={item} isBuyable={false} isListable={false}/>
    )
})

const OwnListings = () => {
  return (
        <div className='container' style={{paddingTop : '3rem'}}>
            <Heading color='secondary'>Assets you've listed for sale</Heading>
            <Grid marginTop='2rem'
                width='100%'
                flexGrow={1}
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                    {listedAssets}
            </Grid>
        </div>
  )
}

export default OwnListings
