import { Box, Grid, GridItem, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { CharactersData } from 'types';

const CharactersCard: FC<{ link: string }> = ({ link }) => {
  const [characters, setCharacters] = useState<CharactersData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (link) {
        void (async (): Promise<void> => {
          const res = await fetch(link);
          const json = await res.json();
          const requests = json.data.map((item) => {
            return fetch(item.relationships.character.links.related);
          });

          Promise.all(requests)
            .then((response) => {
              return Promise.all(response.map((res) => res.json()));
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
        <Spinner />
      ) : (
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
                  <GridItem w="100%" key={attributes.canonicalName} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
                    <Image
                      src={attributes.image?.original ?? '/placeholder.png'}
                      height={600}
                      width={500}
                      alt={attributes.canonicalName}
                      style={{ objectFit: 'cover' }}
                    />
                    <Box p={4} maxH="70px">
                      <Text>{attributes.canonicalName}</Text>
                    </Box>
                  </GridItem>
                );
              }
            })
          ) : (
            <></>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default CharactersCard;
