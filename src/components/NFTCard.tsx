// @ts-nocheck

import React, {useState} from 'react'
import { GridItem, Card, CardBody, Image, Button, CardFooter, Text, Heading, } from '@chakra-ui/react'
import NFTModal from './NFTModal'
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import MarketplaceABI from '../artifacts/MarketplaceABI'
import { toWei } from '../utils/Web3Helpers'
import { MARKETPLACE_ADDRESS,  FACTORY_ADDRESS} from '../env'
import UpdateModal from './UpdateModal'



const truncate = (word, end) => {
    if (word.length < end+2) {
        return word
    }
    const display = word.slice(0, end) + "..."
    return display
}


const NFTCard = (props) => {
    const {item, isBuyable, isListing} = props;
    //state
    const [buyingState, setBuyingState] = useState(false)
    const [updatingState, setUpdatingState] = useState(false)

    //handler
    const handleBuy = async () => {
        setBuyingState(true)
        try
        {

            const buyConfig = await prepareWriteContract({
                address: MARKETPLACE_ADDRESS,
                abi: MarketplaceABI.abi,
                functionName: 'buyItem',
                args: [FACTORY_ADDRESS, BigInt(item.id)],
                value : BigInt(toWei(item.price))
            })
            const { hash : buyHash } = await writeContract(buyConfig)
            console.log(buyHash)
            await waitForTransaction({hash : buyHash})
            setBuyingState(false)
        } catch(error) {
            console.log(error)
            setBuyingState(false)
        }
    }

    const buyButton = <Button variant='outline' colorScheme='primary' isLoading={buyingState} onClick={handleBuy}>Buy</Button>


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
                        {
                        truncate(item.title, 11)}
                    </Heading>
                    <Text isTruncated color='secondary' fontWeight='500'>
                        {item.price}
                    </Text>
                    <Text isTruncated color='secondary'>
                        {truncate(item.description, 25)}
                    </Text>
                </CardBody>
                <CardFooter display='flex' width='75%' justifyContent='space-around'>
                    <NFTModal {...props} />
                    {isBuyable && buyButton}
                    <UpdateModal {...props} />
                </CardFooter>
            </Card>
        </GridItem>
    )
}

export default NFTCard
