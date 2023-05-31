import { Box, Fade, Grid, GridItem, Spinner, Text } from '@chakra-ui/react';
import { CHARACTER_PLACEHOLDER_BLUR } from '@constants/images';
import axios from 'axios';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { CharactersData } from 'types';
import { truncateString } from 'utils/truncateString';

const CharactersCard: FC<{ link: string }> = ({ link }) => {
  const [characters, setCharacters] = useState<CharactersData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (link) {
        void (async (): Promise<void> => {
          const { data } = await axios.get(link);

          const requests = data.data.map((item) => {
            return axios.get(item.relationships.character.links.related);
          });

          Promise.all(requests)
            .then((response) => {
              return Promise.all(response.map((res) => res.data));
            })
            .then((data) => {
              setCharacters(data);
            })
            .catch((ex) => {
              setLoading(false);
              console.error(ex); // eslint-disable-line
            })
            .finally(() => {
              setLoading(false);
            });
        })();
      }
    } catch (ex) {
      console.error(ex); // eslint-disable-line
      setLoading(false);
    }
  }, [link]);

  return (
    <Box mt="16px">
      <Text my="8px" fontWeight="bold">
        Characters
      </Text>
      {loading ? (
        <Spinner color="blue.500" />
      ) : (
        <Fade in>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
              '2xl': 'repeat(6, 1fr)',
            }}
            gap={6}
          >
            {characters?.length ? (
              characters.map(({ data: { attributes } }, i) => {
                if (i !== 0) {
                  return (
                    <GridItem
                      w="100%"
                      key={attributes.canonicalName}
                      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                      flexDir="column"
                      justifyContent="space-between"
                      display="flex"
                    >
                      <Image
                        src={attributes.image?.original ?? '/placeholder.png'}
                        height={600}
                        width={500}
                        alt={attributes.canonicalName}
                        style={{ objectFit: 'cover' }}
                        placeholder="blur"
                        blurDataURL={CHARACTER_PLACEHOLDER_BLUR}
                        className="character-image"
                      />
                      <Box p={4} maxH="70px">
                        <Text>{truncateString(attributes.canonicalName)}</Text>
                      </Box>
                    </GridItem>
                  );
                }
              })
            ) : (
              <></>
            )}
          </Grid>
        </Fade>
      )}
    </Box>
  );
};

export default CharactersCard;
