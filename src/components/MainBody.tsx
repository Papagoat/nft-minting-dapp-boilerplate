import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WalletBalance from "./WalletBalance";

const MainBody = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Awesome NFT Collection
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem modi distinctio obcaecati nisi, incidunt corporis ipsum harum delectus quam esse sit provident reiciendis molestiae quae tempora cupiditate debitis omnis accusantium.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <WalletBalance message="Start Minting!" hide={true} />
        </Stack>
      </Container>
    </Box>

  )
}

export default MainBody