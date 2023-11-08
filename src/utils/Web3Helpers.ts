//@ts-nocheck

import NFTFactoryABI from '../artifacts/NFTFactoryABI'
import MarketplaceABI from '../artifacts/MarketplaceABI'
import { FACTORY_ADDRESS, MARKETPLACE_ADDRESS } from '../env'
import { readContract } from '@wagmi/core'


export const toWei = (priceInEther) => {
    const priceInWei = priceInEther*(10**18)
    console.log(priceInWei)
    return priceInWei
}

export const fromWei = (priceInWei) => {
    const priceInEther = priceInWei / (10**18)
    console.log(priceInEther)
    return priceInEther
}

export const getTokenCount = async () => {
    try{
        const tokenCount = await readContract({
            address: FACTORY_ADDRESS,
            abi: NFTFactoryABI.abi,
            functionName: 'getTokenId',
        })     
        return tokenCount
    } catch(error) {
        throw new Error(error)
    }
}
export const getTokenOwner = async (tokenId) => {
    try{
        const tokenOwner = await readContract({
            address: FACTORY_ADDRESS,
            abi: NFTFactoryABI.abi,
            functionName: 'ownerOf',
            args: [tokenId]
        })   
        return tokenOwner
    } catch(error) {
        throw new Error(error)
    }
}
export const getListing = async (tokenId) => {
    try{
        const listing = await readContract({
            address: MARKETPLACE_ADDRESS,
            abi: MarketplaceABI.abi,
            functionName: "getListing",
            args: [FACTORY_ADDRESS, tokenId]
        })
        return listing
    } catch(error) {
        throw new Error(error)
    }
}
export const getUri = async (tokenId) => {
    try{
        const assetUri = await readContract({
            address: FACTORY_ADDRESS,
            abi: NFTFactoryABI.abi,
            functionName: 'tokenURI',
            args: [tokenId]
        })
        return assetUri
    } catch(error) {
        throw new Error(error)
    }
}

