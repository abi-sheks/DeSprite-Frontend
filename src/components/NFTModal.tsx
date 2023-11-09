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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'


const NFTModal = ({ item, isBuyable }) => {
    //state
    const [uriOpen, setUriOpen] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Button colorScheme='primary' variant='solid' size='md' onClick={onOpen}>View</Button>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />
                <ModalContent bg='tertiary' className='hor-align'>
                    <ModalHeader color='white' >{item.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src={item.imageUri}
                            alt={item.title}
                            borderRadius='lg'
                        />
                        <Text color='white' fontWeight='500'>{item.price}</Text>
                        <Text color='white' fontWeight='100'>{item.description}</Text>
                        <Box display={!isBuyable ? 'block' : 'none'}>
                            <Button colorScheme='primary' onClick={() => setUriOpen(!uriOpen)}>
                                {uriOpen ? "Hide URI" : "Show URI"}
                            </Button>
                            <Text color='white' fontWeight='100' display={uriOpen ? 'block' : 'none'}>{item.uri}</Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='primary' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </div>
    )
}

export default NFTModal
