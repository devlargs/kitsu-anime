import { extendTheme } from '@chakra-ui/react';

export const THEME = extendTheme({
  styles: {
    global: () => ({
      'html, body': {
        '#anime-list::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.3)',
          backgroundColor: '#F5F5F5',
        },

        '#anime-list::-webkit-scrollbar': {
          width: '6px',
          backgroundColor: '#F5F5F5',
        },

        '#anime-list::-webkit-scrollbar-thumb': {
          WebkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,.3)',
          backgroundColor: '#1A365D',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          background: 'white',
          position: 'fixed',
          zIndex: 9999,
          top: 0,
          left: 0,
          width: '100%',
          height: '0.125rem',
        },
        '#nprogress .peg': {
          display: 'block',
          position: 'absolute',
          right: '0rem',
          width: '6.25rem',
          height: '100%',
          boxShadow: '0 0 0.625rem white, 0 0 0.313rem white',
          opacity: 1,
          WebkitTransform: 'rotate(3deg) translate(0rem, -0.25rem)',
          msTransform: 'rotate(3deg) translate(0rem, -0.25rem)',
          transform: 'rotate(3deg) translate(0rem, -0.25rem)',
        },
        '#nprogress .spinner': {
          display: 'block',
          position: 'fixed',
          zIndex: 9999,
          top: '0.938rem',
          right: '0.938rem',
        },
        '#nprogress .spinner-icon': {
          width: '1.125rem',
          height: '1.125rem',
          boxSizing: 'border-box',
          border: 'solid 0.125rem transparent',
          borderTopColor: 'white',
          borderLeftColor: 'white',
          borderRadius: '50%',
          WebkitAnimation: 'nprogress-spinner 400ms linear infinite',
          animation: 'nprogress-spinner 400ms linear infinite',
        },
        '.nprogress-custom-parent': {
          overflow: 'hidden',
          position: 'relative',
        },
        '.nprogress-custom-parent #nprogress .spinner': {
          position: 'absolute',
        },
        '.nprogress-custom-parent #nprogress .bar': {
          position: 'absolute',
        },

        '@-webkit-keyframes nprogress-spinner': {
          '0%': {
            WebkitTransform: 'rotate(0deg)',
          },
          '100%': {
            WebkitTransform: 'rotate(360deg)',
          },
        },
        '@keyframes nprogress-spinner': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    }),
  },
});
