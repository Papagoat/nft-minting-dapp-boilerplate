import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface ImageArgs {
    tokenId: number;
    image?: string;
}

const NFTImage = ({ tokenId, image }: ImageArgs) => {
    async function getURI() {
        window.open(image, '_blank');
    }

    return (
        <>
            <Grid item key={tokenId} xs={12} sm={6} md={3}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        title={tokenId.toString()}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            ID #{tokenId}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="medium" onClick={getURI} fullWidth>Minted! Show URI</Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
}

export default NFTImage;