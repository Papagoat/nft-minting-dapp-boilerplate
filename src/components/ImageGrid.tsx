import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MintToken from "./MintToken";
import NFTImage from './NFTImage';
import { createAlchemyWeb3, NftMetadata } from "@alch/alchemy-web3";
import { useState, useEffect } from 'react';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string;
const CONTENT_DESCRIPTION = process.env.REACT_APP_CONTENT_DESCRIPTION as string;
const RINKEBY_URL = process.env.REACT_APP_RINKEBY_URL as string;

const web3 = createAlchemyWeb3(
  RINKEBY_URL,
);

interface ImageMetaData {
  edition: number;
  image?: string;
}

const RequestNFTMetaData = async () => {
  const request_account = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  const myNFTs = async () => await web3.alchemy.getNfts({
    owner: request_account[0],
  });
  return myNFTs();

}



const GetNFT = async () => {

  try {

    const uniqueNFTs = (await RequestNFTMetaData()).ownedNfts.filter((value: NftMetadata, index, self) =>
      index === self.findIndex((t: NftMetadata) => {
        if (t.description === CONTENT_DESCRIPTION && t.contract.address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
          return t.metadata.image === value.metadata.image;
        }
      }
      )).map((res: NftMetadata) => {
        return res.metadata;
      });
    return uniqueNFTs;

  } catch (err) {
    console.log("ERROR", err);
    return;
  }


}

const ImageGrid = () => {


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [metaData, setMetaData] = useState<Array<ImageMetaData>>([])

  const [isLoading, setIsLoading] = useState(false);


  const checkWalletStatus = async () => {
    const walletConnectedStatus = await window.ethereum.request({ method: 'eth_accounts' })

    if (walletConnectedStatus.length > 0) {
      setIsLoggedIn(true)
      checkNFTs();
    } else {
      setMetaData([])
      setIsLoggedIn(false)
    }
  }
  const getWalletConnectedStatus = async () => {
    return await checkWalletStatus();
  }


  const handleAccountsChanged = () => {
    window.ethereum.on('accountsChanged', function (accounts: string | unknown[]) {
      checkWalletStatus();
    });
  }

  const checkNFTs = () => {
    setIsLoading(true);
    GetNFT().then((data) => {
      if (data) {
        setMetaData(data);
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    handleAccountsChanged();
    getWalletConnectedStatus();
  }, [isLoggedIn]);


  return (
    <Container maxWidth="md">
      {isLoggedIn && <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <MintToken />
      </Grid>}
      <br />
      <br />
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        {isLoading && <h1>Gathering your minted NFTs...</h1>}
        {!isLoading && isLoggedIn && metaData.length == 0 &&

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              m: 1,
            }}
          >
            <h1>No items to display.</h1>
            <p>Newly minted NFTs may take a while to display.</p>
          </Box>
        }
        {!isLoading && metaData.length > 0 && metaData.sort((a, b) => a.edition > b.edition ? 1 : -1).map((v, i) => {
          if (v.image) {
            return <NFTImage key={i} image={v.image} tokenId={v.edition} />
          }
        }
        )}
      </Grid>
    </Container>
  )
}

export default ImageGrid