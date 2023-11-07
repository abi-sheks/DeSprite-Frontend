// @ts-nocheck


import React, { useState } from 'react'
import { Heading, Text, Card, CardHeader, CardBody, CardFooter, Image, Button, Grid, GridItem } from '@chakra-ui/react';
import { NFTCard } from '../components';
import { items } from '../sampledata';

const Dashboard = () => {

    console.log(items)
    const itemList = items.map((item) => {
        console.log(item)
        return (
            <NFTCard item={item} isBuyable={false} isListable={true} />
        )
    })
    console.log(itemList)
    return (
        <div className='container' style={{
            paddingTop: '3rem'
        }}>
            <Heading color='secondary'>Your assets.</Heading>
            <Text color='secondary'>View your assets here.</Text>
            <Grid
                marginTop='2rem'
                width='100%'
                flexGrow={1}
                templateColumns='repeat(5, 1fr)'
                gap={4}
                // maxHeight='60vh'
                // overflow='auto'

            >
                {itemList}
            </Grid>
        </div >
    )
}

export default Dashboard
