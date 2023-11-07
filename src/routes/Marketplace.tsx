// @ts-nocheck


import React, {useState} from 'react'
import { Button,  Flex, } from '@chakra-ui/react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const Marketplace = () => {
    const navigate = useNavigate()
    const [ownActive, setOwnActive] = useState(true)
    const [buyActive, setBuyActive] = useState(false)

    //handlers
    const handleBuyClick = (e) => {
        setBuyActive(true)
        setOwnActive(false)
        navigate('/home/marketplace/buy')
    }
    const handleOwnClick = (e) => {
        setOwnActive(true)
        setBuyActive(false)
        navigate('/home/marketplace/own')
    }
    return (
        <div className='container' >
            <Flex justify='space-around' paddingTop="2rem">
                <Button borderRadius='1rem' width='6rem' marginRight='0.5rem' isActive={ownActive} onClick={handleOwnClick} colorScheme='primary'>Owned</Button>
                <Button borderRadius='1rem' width='6rem' colorScheme='primary' isActive={buyActive} onClick={handleBuyClick}>Buy</Button>
            </Flex>
            <Outlet />
        </div>
    )
}

export default Marketplace
