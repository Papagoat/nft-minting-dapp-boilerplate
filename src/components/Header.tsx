import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WalletBalance from "./WalletBalance";

const Header = () => {

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Site Header
        </Typography>
        <WalletBalance message="Connect Wallet" hide={false} />
      </Toolbar>
    </AppBar>
  )
}

export default Header