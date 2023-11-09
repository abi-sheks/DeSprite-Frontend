// @ts-nocheck


import React, { useEffect } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';
import { useConnect, useAccount, useDisconnect } from 'wagmi'


const addressDisplay = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(34, 42)}`
}

const HomeScreen = () => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { address, isConnected,
        // connector
    } = useAccount()
    const { disconnect } = useDisconnect()

    const handleConnect = () => {
        connectors.map(connector => {
            //only metamask support
            connect({ connector })
        })
        localStorage.setItem('userAddress', address)
    }

    const handleDisconnect = () => {
        localStorage.clear();
        disconnect()
    }

    useEffect(() => {
        handleConnect()
    }, [])

    const connectedAvatar = isConnected ? <Text color='secondary' paddingTop='0.5rem' marginRight='1rem' >{addressDisplay(address)}</Text> :
        <Button variant='solid' colorScheme='primary' onClick={handleConnect}>Connect</Button>

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'black',
        }}>
            <Flex direction='row' bg='tertiary' padding='1.5rem' justifyContent='space-between' width='100%'>
                <Flex justifyContent='space-between' width='50%'>
                    <Text color='secondary' as={Link} to='/home' fontSize='1.5rem' fontFamily='Kenia'>DeSprite</Text>
                    <Flex direction='row' justifyContent='center' grow={1}>
                        <Text as={Link} to='/home/marketplace/own' marginX='3rem' color='secondary'>
                            Marketplace
                        </Text>
                        <Text as={Link} to='/home/dashboard' marginX='3rem' color='secondary'>
                            Dashboard
                        </Text>
                        <Text as={Link} to='/home/mint' marginX='3rem' color='secondary'>
                            Mint
                        </Text>
                    </Flex>

                </Flex>
                <Flex>
                    {connectedAvatar}
                    <Button variant='solid' colorScheme='primary' onClick={handleDisconnect}>Disconnect</Button>
                </Flex>
            </Flex>
            <Outlet />
        </div>
    )
}

export default HomeScreen
