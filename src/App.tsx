import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './components/Header'
import MainBody from './components/MainBody'
import ImageGrid from './components/ImageGrid'
import Footer from './components/Footer'


const theme = createTheme();

const Album = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <MainBody />
        <ImageGrid />
      </main>
      <Footer />
    </ThemeProvider>
  );
}


export default Album;