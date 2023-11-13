# DeSprite
DeSprite is a proof of concept/MVP for a decentralised game assets marketplace where users are free to list their game assets by minting them as an NFT and listing them on the marketplace. The system works by storing the asset files on the IPFS network, and returning the cid of the asset pack to use as an NFT token uri. Purchase of the token gives the buyer access to the cid so they can retrieve their files accordingly. It aims to solve the problem of content piracy commonly seen in game asset marketplaces.  
This is the frontend for the app.
## Setup
- Clone the repo and ```cd``` into it.
- The app is bootstrapped with Create-React-App. Run it on your local using ```npm start``` and view it on http://localhost:3000
- ***Note*** : the app currently supports the [Metamask](https://metamask.io/) wallet, so make sure you have that setup.

