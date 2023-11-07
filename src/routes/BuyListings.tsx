// @ts-nocheck


import React from 'react'
import { Grid, Heading } from '@chakra-ui/react'
import { NFTCard } from '../components'
import { items } from '../sampledata' 

const buyableList = items.map(item => {
    return (
        <NFTCard item={item} isBuyable={true} isListable={false}/>
    )
})

const BuyListings = () => {

    return (
        <div className='container' style={{paddingTop : '3rem'}}>
            <Heading color='secondary'>Buy assets</Heading>
            <Grid marginTop='2rem'
                width='100%'
                flexGrow={1}
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                    {buyableList}
            </Grid>
        </div>
    )
}

export default BuyListings
