import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '@components/Header';
import { THEME } from '@constants/theme';
import { AppProps } from 'next/app';
import { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={THEME}>
    <Box h="100vh" overflow="hidden">
      <Header />
      <Component {...pageProps} />
    </Box>
  </ChakraProvider>
);

export default App;
