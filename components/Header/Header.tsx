import { Box, Text } from '@chakra-ui/react';
import { STYLES } from '@constants/styles';
import Link from 'next/link';
import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';

const Header: FC = () => {
  return (
    <Box h="60px" bg="blue.900" px={STYLES.container.padding}>
      <Box h="100%" display="flex" alignItems="center" justifyContent="space-between">
        <Link href="/">
          <Text
            color="white"
            fontSize="20px"
            transition="0.25s ease-in-out"
            _hover={{
              color: 'blue.100',
            }}
          >
            Kitsu Anime
          </Text>
        </Link>
        <Link href="https://github.com/devlargs/kitsu-anime" passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <FaGithub color="white" fontSize="20px" />
          </a>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
