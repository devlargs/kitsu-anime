import { Box, Text } from '@chakra-ui/react';
import { STYLES } from '@constants/styles';
import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';

const Header: FC = () => {
  return (
    <Box h="60px" bg="blue.900" px={STYLES.container.padding}>
      <Box h="100%" display="flex" alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="20px">
          Kitsu Anime
        </Text>
        <FaGithub color="white" fontSize="20px" />
      </Box>
    </Box>
  );
};

export default Header;
