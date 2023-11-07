// @ts-nocheck


import React, { useState } from 'react'
import { Heading, Text, Button, Grid, GridItem, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Card, CardBody, CardHeader, CardFooter } from '@chakra-ui/react';

const Mint = () => {
    //state
    const [titleState, setTitleState] = useState('')
    const [descState, setDescState] = useState('')
    const [priceState, setPriceState] = useState('')



    //handlers
    const handleTitleChange = (e) => {
        setTitleState(e.target.value)
    }
    const handleDescChange = (e) => {
        setDescState(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPriceState(e.target.value)
    }

    const isTitleEmpty = titleState === ''
    const isDescValid = descState.length > 28
    const isPriceValid = !(priceState === '')

    return (
        <div className='container' style={{
            flexDirection: 'row',
        }}>
            <Grid height='100%' bg='bg' width='100%' templateColumns='repeat(3, 1fr)' templateRows='repeat(1, 1fr)'>
                <GridItem display='flex' flexDirection='column' padding='4rem' alignItems='center' colSpan={1}>
                    <Heading color='secondary'>Mint your game assets as an NFT.</Heading>
                    <Text color='secondary'>
                        Upload your games assets as a spritesheet. Image assets are currently supported.
                    </Text>
                </GridItem>
                <GridItem colSpan={2} className='hor-align' justifyContent='center'>
                    <Card bg="#FCF4F2" height='90%' width='70%' className='hor-align'>
                        <CardHeader>
                            <Heading>Mint your NFT</Heading>
                        </CardHeader>
                        <CardBody width='80%'>
                            <FormControl isInvalid={isTitleEmpty && !isDescValid && !isPriceValid}>
                                <FormLabel>Title</FormLabel>
                                <Input type='text' value={titleState} onChange={handleTitleChange} />
                                {!isTitleEmpty ? (
                                    <FormHelperText>
                                        Enter the title of your NFT asset pack
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Title is required.</FormErrorMessage>
                                )}
                                <FormLabel>Description</FormLabel>
                                <Input type='text' value={descState} onChange={handleDescChange} />
                                {isDescValid ? (
                                    <FormHelperText>
                                        Enter description of your asset pack in a minimum of 28 words.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Description is required.</FormErrorMessage>
                                )}
                                <FormLabel>Price</FormLabel>
                                <Input type='text' value={descState} onChange={handlePriceChange} />
                                {isDescValid ? (
                                    <FormHelperText>
                                        Enter a price of your asset pack in $US. Be reasonable :P
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Price is required.</FormErrorMessage>
                                )}
                            </FormControl>
                        </CardBody>
                        <CardFooter>
                            <Button colorScheme='primary' variant='solid' size='lg'>Mint</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </Grid>

        </div>
    )
}

export default Mint
