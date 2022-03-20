import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import MinimalERC721 from '../artifacts/contracts/MinimalERC721.sol/MinimalERC721.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string;
const JSON_CONTENT_ID = process.env.REACT_APP_JSON_CONTENT_ID as string;
const TOTAL_SUPPLY = 100

const MintToken = () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, MinimalERC721.abi, signer);
    const [totalNFT, setTotalNFT] = useState(0)

    const getCurrentToken = async () => {
        const totalSupply = await contract.checkTotalSupply();
        const currentToken = await totalSupply.toNumber();
        return currentToken;
    }

    useEffect(() => {
        const currentToken = async () => {
            const currentToken = await getCurrentToken()
            setTotalNFT(TOTAL_SUPPLY - currentToken);
        }
        currentToken();
    }, [totalNFT]);

    const startMint = async () => {

        const signerAddress = await signer.getAddress()
        const getSignerBalance = await provider.getBalance(signerAddress)
        const getSignerBalanceInEth = ethers.utils.formatEther(getSignerBalance)
        const ethCost = 0.001
        const metadataURI = `${JSON_CONTENT_ID}/${await getCurrentToken()}.json`

        console.log(metadataURI)

        if (parseFloat(getSignerBalanceInEth) < ethCost) {
            console.log("Not enough ETH to process transaction.");
        } else {
            const request_account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const addr = request_account[0];


            try {
                const transaction_init = await contract.payToMint(addr, metadataURI, 1, {
                    value: ethers.utils.parseEther(ethCost.toString()),
                });
                const transaction_wait = await transaction_init.wait()

                if (transaction_wait.status === 1) {
                    console.log("Success")
                } else {
                    console.log("Error")
                }
            } catch (err) {
                console.log(err)
            }
        };
    }
    return (
        <>
            {totalNFT > 0 && totalNFT < 101 && <h3>Total NFTs Left: {totalNFT}</h3>}
            {totalNFT === 0 && <h1>No more NFTs left to mint.</h1>}
            {totalNFT !== 0 && (
                <>
                    <ButtonGroup
                        size="large"
                        aria-label="large button group"
                    >
                    </ButtonGroup>
                    <Button
                        size="large"
                        href="#"
                        variant="contained"
                        onClick={() => startMint()}
                    >
                        Mint
                    </Button>
                </>
            )}
        </>
    );
}

export default MintToken;