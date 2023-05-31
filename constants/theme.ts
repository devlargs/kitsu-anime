import { extendTheme } from '@chakra-ui/react';

export const THEME = extendTheme({
  styles: {
    global: () => ({
      'html, body': {
        '#anime-list::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          backgroundColor: '#F5F5F5',
        },

        '#anime-list::-webkit-scrollbar': {
          width: '12px',
          backgroundColor: '#F5F5F5',
        },

        '#anime-list::-webkit-scrollbar-thumb': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
          backgroundColor: '#1A365D',
        },
      },
    }),
  },
});
