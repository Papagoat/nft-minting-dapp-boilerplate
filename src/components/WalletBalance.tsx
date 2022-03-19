import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

interface WalletBalanceProps {
    message: string;
    hide: boolean;
}

const theme = createTheme();

const WalletBalance = (props: WalletBalanceProps) => {

    const { message, hide } = props

    const [balance, setBalance] = useState<string>();
    const [walletStatus, setWalletStatus] = useState(false)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const checkWalletStatus = async () => {
        const walletConnectedStatus = await window.ethereum.request({ method: 'eth_accounts' })

        if (walletConnectedStatus.length > 0) {
            getBalance()
        } else {
            setWalletStatus(false)
            setBalance("0");
        }
    }

    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accountBalance = await provider.getBalance(account);
        const finalBalance = Number(ethers.utils.formatEther(accountBalance)).toFixed(4)
        setWalletStatus(true);
        setBalance(finalBalance);
    };

    const getWalletConnectedStatus = async () => {
        return await checkWalletStatus();
    }

    const handleAccountsChanged = () => {
        window.ethereum.on('accountsChanged', function (accounts: string | unknown[]) {
            checkWalletStatus()
        });
    }

    useEffect(() => {
        handleAccountsChanged()
        getWalletConnectedStatus()
    }, [getWalletConnectedStatus]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Button href="#" variant="contained" sx={[{ my: 1, mx: 1.5 }, walletStatus && hide && { display: 'none' }]} onClick={() => getBalance()}>
                {walletStatus ? <>{balance} ETH</> : <>{message}</>}
            </Button>
        </ThemeProvider >
    );
}


export default WalletBalance;