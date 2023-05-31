import { ChakraProvider } from '@chakra-ui/react';
import Header from '@components/Header';
import { AppProps } from 'next/app';
import { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Header />
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
