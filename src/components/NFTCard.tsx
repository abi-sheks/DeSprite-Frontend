// @ts-nocheck

import React from 'react'
import { GridItem, Card, CardBody, Image, Button, CardFooter, Text, Heading, } from '@chakra-ui/react'
import NFTModal from './NFTModal'


const truncate = (word, end) => {
    if (word.length < end+2) {
        return word
    }
    const display = word.slice(0, end) + "..."
    return display
}
const NFTCard = ({ item, isListable, isBuyable }) => {


    const listingButton = <Button variant='outline' colorScheme='primary'>List</Button>
    const buyButton = <Button variant='outline' colorScheme='primary'>Buy</Button>


    return (
        <GridItem key={item.id} bg='tertiary' borderWidth='1px' borderRadius='1rem' borderColor='primary' colSpan={1}>
            <Card bg='tertiary' display='flex' flexDirection='column' alignItems='center'>
                <CardBody>
                    <Image
                        src={item.imageUri}
                        alt={item.title}
                        borderRadius='lg'
                    />
                    <Heading color='secondary'>
                        {truncate(item.title, 11)}
                    </Heading>
                    <Text isTruncated color='secondary' fontWeight='500'>
                        {item.price}
                    </Text>
                    <Text isTruncated color='secondary'>
                        {truncate(item.description, 25)}
                    </Text>
                </CardBody>
                <CardFooter display='flex' width='75%' justifyContent='space-around'>
                    <NFTModal item={item} />
                    {isListable && listingButton}
                    {isBuyable && buyButton}
                </CardFooter>
            </Card>
        </GridItem>
    )
}

export default NFTCard
