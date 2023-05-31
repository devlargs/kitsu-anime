import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '@components/Header';
import { THEME } from '@constants/theme';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { FC, useEffect } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const nprogressStart = (): void => NProgress.start();
    const nprogressDone = (): void => {
      NProgress.done();
    };
    router.events.on('routeChangeStart', nprogressStart);
    router.events.on('routeChangeComplete', nprogressDone);
    router.events.on('routeChangeError', nprogressDone);

    return (): void => {
      router.events.off('routeChangeStart', nprogressStart);
      router.events.off('routeChangeComplete', nprogressDone);
      router.events.off('routeChangeError', nprogressDone);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={THEME}>
      <Box h="100vh" overflow="hidden">
        <Header />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
