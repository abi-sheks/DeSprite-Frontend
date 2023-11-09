// @ts-nocheck


import React, { useState, useEffect } from 'react'
import { Grid, Heading, CircularProgress, Flex, useToast } from '@chakra-ui/react'
import { NFTCard } from '../components'
import { items } from '../sampledata'
import { useAccount } from 'wagmi'
import { getTokenCount, getTokenOwner, getListing, getUri } from '../utils/Web3Helpers'
import { readUploadedFileAsText, parseMetadata } from '../utils/FileHelpers'
import makeStorageClient from '../utils/Web3ClientGetter'


const BuyListings = () => {
    //state
    const [buyableAssetsState, setBuyableAssetsState] = useState([])
    const [isLoadingState, setIsLoadingState] = useState(true)

    //misc hooks
    const client = makeStorageClient()
    const { address, isConnected,
        // connector
    } = useAccount()
    const toast = useToast()




    useEffect(() => {
        (async () => {
            setIsLoadingState(true)
            try {
                const tokenCount = await getTokenCount()
                //ouch
                let newAssets = []
                for (let i = 1; i <= tokenCount; i++) {
                    const tokenOwner = await getTokenOwner(i)
                    const listing = await getListing(i)
                    console.log(listing)
                    console.log(tokenOwner === address)
                    console.log(listing.seller === address)
                    //if listing.price === 0 it has either been sold or never created
                    if (address && tokenOwner !== address && listing.price !== 0n) {
                        const assetUri = await getUri(i);
                        const res = await client.get(assetUri);
                        if (res.ok) {
                            const files = await res?.files()
                            for (const file of files) {
                                if (file.name === "metadata.json") {
                                    const fileAsText = await readUploadedFileAsText(file);
                                    const asset = parseMetadata(fileAsText, i, assetUri, listing.price)
                                    newAssets.push(asset)
                                }
                            }
                        }
                    }
                }
                setBuyableAssetsState(() => newAssets)
            } catch (error) {
                console.log(error)
                toast(
                    {
                        title: 'Error',
                        description: "The marketplace could not be retrieved. Try again.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    }
                )
            }
            setIsLoadingState(false)
        })()

    }, [address])

    let content
    if (isLoadingState) {
        content = (
            <Flex marginTop='2rem' width='100%' height='100%' justify='center'>
                <CircularProgress isIndeterminate color="#D4AF37" size='8rem' />
            </Flex>
        )
    } else {
        content = (
            <Grid marginTop='2rem'
                width='100%'
                flexGrow={1}
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                {buyableAssetsState.map(asset => {
                    console.log(`Asset is ${asset}`)
                    return (
                        <NFTCard item={asset} isBuyable={true} isListing={false} />
                    )
                })}
            </Grid>
        )
    }

    return (
        <div className='container' style={{ paddingTop: '3rem' }}>
            <Heading color='secondary'>Buy assets</Heading>
            {content}

        </div>
    )
}

export default BuyListings
