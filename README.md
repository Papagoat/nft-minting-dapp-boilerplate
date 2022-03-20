# NFT Minting Dapp Boilerplate

## Requirements

- [Alchemy Account](https://www.alchemy.com/)
- [Alchemy Web3.js](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- [Chai](https://www.chaijs.com/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Hardhat](https://hardhat.org/)
- [MUI](https://mui.com/)
- [Metamask wallet](https://metamask.io/)
- [Pinata Account](https://www.pinata.cloud/)
- [React Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
- [Solidity ^0.8.0](https://docs.soliditylang.org/en/v0.8.0/)

---

## <a name="setup"></a>Set up

\*Disclaimer: This boilerplate is not for _PRODUCTION_ use however it is a good baseline for you to build your own NFT minting dapp.

1. Register for an account with [Pinata](https://www.pinata.cloud/) and [Alchemy](https://www.alchemy.com/).
2. Create a `.env` file to store all your environment variables. Refer to the [Environment Variables](#env) section for the full list. ( **Warning**: Do not commit the `.env` file to any public repository)

```bash
$ touch .env
```

3. [Upload your assets](https://docs.pinata.cloud/nfts) to Pinata. Copy the content identifier (CID) to the `.env` file.
4. [Create an Alchemy app](https://docs.alchemy.com/alchemy/introduction/getting-started). Copy the the API key to the `.env` file.
5. Copy your [Metamask wallet's private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) to the `.env` file. (**Warning**: Store the private key securely.)
6. Install required dependencies.

```bash
$ npm install
```

---

## <a name="smart_contract"></a>The Smart Contract

### Deploy Contract

1. Configure the `maxSupply` and name of your NFTs found in `'./contracts/MinimalERC721.sol'`

```javascript
15 uint256 public maxSupply = 100;

17 constructor() ERC721("MinimalERC721", "MERC721") {}
```

2. Deploy the smart contract to the rinkeby test network.

```bash
$ npx hardhat run --network rinkeby scripts/deploy.js --show-stack-traces

Compiled 1 Solidity file successfully
MyNFT NFT deployed to: 0xdFA798Bf2E2238F9933cEEB0b6Dd9D12345a97B4
```

3. Copy the contract address to the `.env` file.

### Test Contract

The boilerplate comes with a simple test script. Refer to [this article](https://hardhat.org/tutorial/testing-contracts.html) for more detail.

```bash
$ npx hardhat test
```

### Start Dapp

```bash
$ npm run start
```

---

## <a name="env"></a>Obtaining Test ETH

1. https://rinkebyfaucet.com/
2. https://faucets.chain.link/rinkeby

---

## <a name="env"></a>Environment Variables

| Name                          | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| NODE_ENV                      | development / production                                   |
| METAMASK_PRIVATE_KEY          | Metamask Private Key                                       |
| REACT_APP_BASE_URL            | NFT Storage Base URL. https://www.pinata.cloud/            |
| REACT_APP_CONTENT_ID          | IPFS hash of NFT media                                     |
| REACT_APP_CONTRACT_ADDRESS    | Deployed conntract address                                 |
| REACT_APP_CONTENT_DESCRIPTION | Name of NFT description                                    |
| REACT_APP_JSON_CONTENT_ID     | IPFS hash of NFT metadata                                  |
| REACT_APP_RINKEBY_URL         | Alchemy endpoint for testnet. https://www.alchemy.com/     |
| REACT_APP_ETH_URL             | Alchemy endpoint for ETH mainnet. https://www.alchemy.com/ |
