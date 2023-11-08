// @ts-nocheck


import React, { useState, useEffect } from 'react'
import { Heading, Text, Card, CardHeader, CardBody, CardFooter, Image, Button, Grid, GridItem } from '@chakra-ui/react';
import { NFTCard } from '../components';
import { items } from '../sampledata';
import { useAccount } from 'wagmi'
import { getTokenCount, getTokenOwner, getListing, getUri } from '../utils/Web3Helpers'
import { readUploadedFileAsText, parseMetadata } from '../utils/FileHelpers'
import makeStorageClient from '../utils/Web3ClientGetter'

const Dashboard = () => {
        //state
        const [ownedAssetsState, setOwnedAssetsState] = useState([])

        //misc hooks
        const client = makeStorageClient()
        const { address, isConnected,
            // connector
        } = useAccount()

        useEffect(() => {
            (async () => {
                try {
                    const tokenCount = await getTokenCount()
                    //ouch
                    let newAssets = []
                    for (let i = 1; i <= tokenCount; i++) {
                        const tokenOwner = await getTokenOwner(i)
                        const listing = await getListing(i)
                        console.log(tokenOwner === address)
                        console.log(listing.seller === address)
                        if (address && tokenOwner === address && listing.seller !== address) {
                            const assetUri = await getUri(i);
                            const res = await client.get(assetUri);
                            if (res.ok) {
                                const files = await res?.files()
                                for (const file of files) {
                                    if (file.name === "metadata.json") {
                                        const fileAsText = await readUploadedFileAsText(file);
                                        const asset = parseMetadata(fileAsText, i)
                                        newAssets.push(asset)
                                    }
                                }
                            }
                        }
                    }
                    setOwnedAssetsState(() => newAssets)
                } catch (error) {
                    console.log(error)
                }
            })()
    
        }, [])

    const ownedAssetsList = ownedAssetsState.map((item) => {
        console.log(item)
        return (
            <NFTCard item={item} isBuyable={false} />
        )
    })


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
                {ownedAssetsList}
            </Grid>
        </div >
    )
}

export default Dashboard
