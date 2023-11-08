// @ts-nocheck


import React, { useState } from 'react'
import { Heading, Text, Button, Grid, GridItem, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Card, CardBody, CardHeader, CardFooter, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Dropzone from 'react-dropzone';
import makeStorageClient from '../utils/Web3ClientGetter';
import { prepareWriteContract, writeContract, readContract, waitForTransaction } from '@wagmi/core'
import NFTFactoryABI from '../artifacts/NFTFactoryABI.js';
import MarketplaceABI from '../artifacts/MarketplaceABI';
import { FACTORY_ADDRESS, MARKETPLACE_ADDRESS } from '../env';
import { toWei } from '../utils/Web3Helpers';

const Mint = () => {
    //state
    const [titleState, setTitleState] = useState('')
    const [descState, setDescState] = useState('')
    const [priceState, setPriceState] = useState(0)
    const [coverState, setCoverState] = useState('');
    const [assetState, setAssetState] = useState([])
    const [loadingState, setLoadingState] = useState(false)


    //handler requires this check

    // const canMint = [titleState, descState, priceState, coverState, assetState].every(Boolean) && !isMinting
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
    //web3 storage expects native File() objects. For each nft, we supply an array of File() objects (assets) and one JSON file containing metadata.
    const handleCoverChange = (acceptedFiles) => {
        //using FileReader to store binary string of cover image (for metadata)
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const dataUri = reader.result
                setCoverState(dataUri)
            }
            reader.readAsDataURL(file)
        })
    }
    const handleAssetsChange = (acceptedFiles) => {
        //gets an array of File() objects, we pass this directly to web3.storage.
        setAssetState(acceptedFiles)
    }

    const handleMint = async () => {
        setLoadingState(true)
        const metadata = {
            name: titleState,
            description: descState,
            cover: coverState,
            price : toWei(priceState),
        }
        //converts metadata to blob
        const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })

        //put it here
        const client = makeStorageClient()
        const cid = await client.put([...assetState, new File([metadataBlob], 'metadata.json')], { name: titleState })
        console.log(cid)
        //cid will be used as tokenUri for the NFT
        try{
            const mintConfig = await prepareWriteContract({
                address: FACTORY_ADDRESS,
                abi: NFTFactoryABI.abi,
                functionName: 'mintNFT',
                args: [cid],
            })
            const { hash : mintHash } = await writeContract(mintConfig)
            console.log(mintHash)
            //this is the equivalent of .wait in ethers, because this wasnt being called, wagmi wouldnt wait for write to happen and read old values.
            await waitForTransaction({
                hash : mintHash,
              })
            const nextId = await readContract({
                address: FACTORY_ADDRESS,
                abi: NFTFactoryABI.abi,
                functionName: 'getTokenId',
            })
            //transaction is being confirmed too late, so the nextId being returned is in fact one less.
            console.log(nextId)
            const approvalConfig = await prepareWriteContract({
                address : FACTORY_ADDRESS,
                abi : NFTFactoryABI.abi,
                functionName : 'approve',
                args : [MARKETPLACE_ADDRESS, nextId]
            })
            const {hash : approvalHash} = await writeContract(approvalConfig)
            console.log(approvalHash)
            await waitForTransaction({
                hash : approvalHash,
              })

            const listConfig = await prepareWriteContract({
                address : MARKETPLACE_ADDRESS,
                abi : MarketplaceABI.abi,
                functionName : 'listItem',
                args : [FACTORY_ADDRESS, nextId, toWei(priceState)]
            })
            const { hash : listHash } = await writeContract(listConfig)
            console.log(listHash)
            await waitForTransaction({
                hash : listHash,
              })

              setLoadingState(false)
        } catch(error) {
            console.log(error)
            setLoadingState(false)
        }
        

    }

    const isTitleEmpty = titleState === ''
    const isDescValid = descState.length > 28
    const isPriceValid = !(priceState === '')

    return (
        <div className='container'>
            <Grid flexGrow={1} bg='bg' width='100%' templateColumns='repeat(3, 1fr)' templateRows='repeat(1, 1fr)' >
                <GridItem display='flex' flexDirection='column' height='100%' padding='4rem' alignItems='center' colSpan={1}>
                    <Heading color='secondary'>Mint your game assets as an NFT.</Heading>
                    <Text color='secondary'>
                        Upload your games assets as a spritesheet. Image assets are currently supported.
                    </Text>
                </GridItem>
                <GridItem colSpan={2} className='hor-align' height='100%' justifyContent='center'>
                    <Card bg="#FCF4F2" height='100%' width='70%' className='hor-align'>
                        <CardHeader>
                            <Heading>Mint your NFT</Heading>
                        </CardHeader>
                        <CardBody width='80%'>
                            <FormControl isInvalid={isTitleEmpty || !isDescValid || !isPriceValid}>
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
                                <Input type='text' value={descState} aria-multiline onChange={handleDescChange} />
                                {isDescValid ? (
                                    <FormHelperText>
                                        Enter description of your asset pack.
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Description has to be more than 28 words long.</FormErrorMessage>
                                )}
                                <FormLabel>Price</FormLabel>
                                <Input value={priceState} onChange={handlePriceChange} />
                                {isPriceValid ? (
                                    <FormHelperText>
                                        Enter a price of your asset pack in ether. Be reasonable :P
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Price is required.</FormErrorMessage>
                                )}
                                <Box>
                                    <FormLabel>Upload a cover image of your assets.</FormLabel>
                                    <Dropzone onDrop={(acceptedFiles) => handleCoverChange(acceptedFiles)} >
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <AddIcon />
                                                    <input {...getInputProps()} />
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </Box>
                                <Box>
                                    <FormLabel>Upload your assets here.</FormLabel>
                                    <Dropzone multiple onDrop={(acceptedFiles) => handleAssetsChange(acceptedFiles)} >
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <AddIcon />
                                                    <input {...getInputProps()} />
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </Box>
                            </FormControl>
                        </CardBody>
                        <CardFooter>
                            <Button isLoading={loadingState} colorScheme='primary' variant='solid' size='lg' onClick={handleMint}>Mint</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Mint
