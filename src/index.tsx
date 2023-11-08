// @ts-nocheck

import { ColorModeScript } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HomeScreen, LandingPage, WelcomeScreen, Dashboard, Mint, Marketplace, OwnListings, BuyListings } from './routes';
import './index.css'
import { WagmiConfig, createConfig, configureChains, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {alchemyProvider} from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {ALCHEMY_API_KEY} from './env.js';

 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({apiKey : ALCHEMY_API_KEY}), publicProvider()],
)

const config = createConfig({
  autoConnect : true,
  connectors : [
    new MetaMaskConnector({chains})
  ],
  webSocketPublicClient,
  publicClient,
})

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path : '/home',
    element : <HomeScreen />,
    children : [
      {
        path : '/home/',
        element : <WelcomeScreen />,
      },
      {
        path : '/home/dashboard',
        element : <Dashboard />,
      },
      {
        path : '/home/mint',
        element : <Mint />
      },
      {
        path : '/home/marketplace',
        element : <Marketplace />,
        children : [
          {
            path : 'own',
            element : <OwnListings />
          },
          {
            path : 'buy',
            element : <BuyListings />
          }
        ]
      }
    ]
  }

])

const customTheme = extendTheme({
    colors : {
      primary : {
        100 : "#FCF7D7",
        200 : "#FAEEB0",
        300 : "#F2DE86",
        400 : "#E5CA65",
        500 : "#D4AF37",
        600 : "#B69128",
        700 : "#98751B",
        800 : "#7A5A11",
        900 : "#65470A",
      },
      secondary : "#ffffff",
      bg : "#000000",
      tertiary : "#575757",
    }
})

root.render(
    <ChakraProvider theme={customTheme}>
      <ColorModeScript />
      <WagmiConfig config={config}>
      <RouterProvider router={router} />
      </WagmiConfig>
    </ChakraProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


