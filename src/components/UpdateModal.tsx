// @ts-nocheck


import React, { useState } from 'react'
import {
    Text,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    FormControl,
    FormHelperText,
    Input,
    FormErrorMessage,
    FormLabel
} from '@chakra-ui/react'
import { useDisclosure, useToast } from '@chakra-ui/react';
import {prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import MarketplaceABI from '../artifacts/MarketplaceABI';
import { MARKETPLACE_ADDRESS, FACTORY_ADDRESS } from '../env';
import { toWei } from '../utils/Web3Helpers';


const UpdateModal = ({ item, isListable }) => {
    //state
    const [newPrice, setNewPrice] = useState(0);
    const [updatingState, setUpdatingState] = useState(false)

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const isPriceValid = !(newPrice === '')

    const handleUpdate = async () => {
        setUpdatingState(true)
        try
        {

            const updateConfig = await prepareWriteContract({
                address: MARKETPLACE_ADDRESS,
                abi: MarketplaceABI.abi,
                functionName: 'updateListing',
                args: [FACTORY_ADDRESS, BigInt(item.id), BigInt(toWei(newPrice))],
            })
            const { hash : updateHash } = await writeContract(updateConfig)
            console.log(updateHash)
            await waitForTransaction({hash : updateHash})
            toast(
                {
                    title: 'Success',
                    description: "Your NFTs price was updated, refresh to view changes",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                }
            )
            setUpdatingState(false)
        } catch(error) {
            console.log(error)
            toast(
                {
                    title: 'Error',
                    description: "Your NFT could not be updated. Try again.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                }
            )
            setUpdatingState(false)
        }
    }


    return (
        <div>
            <Button colorScheme='primary' variant='solid' size='md' onClick={onOpen}>Update</Button>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />
                <ModalContent bg='tertiary' className='hor-align'>
                    <ModalHeader color='white' >Change your NFT's price</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isInvalid={!isPriceValid}>
                            <FormLabel>Price</FormLabel>
                            <Input type='text' value={newPrice} onChange={(e) => { setNewPrice(e.target.value) }} />
                            {isPriceValid ? (
                                <FormHelperText>
                                    Enter the new price in wei
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>The price cannot be empty</FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='primary' variant='outline' isLoading={updatingState} mr={3} onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button colorScheme='primary' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default UpdateModal
