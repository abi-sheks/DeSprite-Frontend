// @ts-nocheck


import React, { useEffect, useState } from 'react'
import { Grid, Heading, getToken } from '@chakra-ui/react'
import { NFTCard } from '../components'
import { useAccount } from 'wagmi'
import makeStorageClient from '../utils/Web3ClientGetter'
import { getTokenCount, getTokenOwner, getListing, getUri } from '../utils/Web3Helpers'
import { parseMetadata, readUploadedFileAsText } from '../utils/FileHelpers'





const OwnListings = () => {
    const client = makeStorageClient()
    const { address, isConnected,
        // connector
    } = useAccount()
    const [listedAssetsState, setListedAssetsState] = useState([])

    //bad algo, optimize or change smart contract getter.
    //perhaps less expensive to do it here only?
    //first gets total no of NFTs, checks if the owner of each tokenId mapped tokenUri is the logged in address, then gets NFT corresponding to tokenUri.
    //reads are inexpensive anyways so
    //but amend the contract to return the nft based on owner as well.
    let listedAssets = []


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
                    if (address && tokenOwner === address && listing.seller === address) {
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
                setListedAssetsState(() => newAssets)
            } catch (error) {
                console.log(error)
            }
        })()

    }, [])

    listedAssets = listedAssetsState.map(asset => {
        console.log(`Asset is ${asset}`)
        return (
            <NFTCard item={asset} isBuyable={false}/>
        )
    })


    return (
        <div className='container' style={{ paddingTop: '3rem' }}>
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
