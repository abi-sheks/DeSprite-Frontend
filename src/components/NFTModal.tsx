// @ts-nocheck


import React from 'react'
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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'


const NFTModal = ({ item }) => {

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
