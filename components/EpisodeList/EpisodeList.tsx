import { Box, chakra, Fade, List, ListIcon, ListItem, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { EpisodeData } from 'types';

const EpisodeList: FC<{ link: string }> = ({ link }) => {
  const [data, setData] = useState<EpisodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [watched, setWatched] = useState({});
  const router = useRouter();

  const toggleWatched = (id: string): void => {
    const animeId = router.query.id as string;
    setWatched((prev) => {
      const newWatched = { ...prev };
      const animeWatched = newWatched[animeId] || [];

      const index = animeWatched.indexOf(id);
      if (index !== -1) {
        animeWatched.splice(index, 1);
      } else {
        animeWatched.push(id);
      }

      newWatched[animeId] = animeWatched;
      localStorage.setItem('watched', JSON.stringify(newWatched));
      return newWatched;
    });
  };

  useEffect(() => {
    const localWatched = localStorage.getItem('watched');
    if (localWatched) {
      setWatched(JSON.parse(localWatched));
    }
  }, []);

  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const res = await fetch(link);
        const json = await res.json();
        setData(json.data);
      } catch (ex) {
        console.error(ex); // eslint-disable-line
      } finally {
        setLoading(false);
      }
    })();
  }, [link]);

  return (
    <Box mt="16px">
      <Text my="8px" fontWeight="bold">
        Episodes
      </Text>
      <>
        {loading ? (
          <Spinner color="blue.500" />
        ) : (
          <Fade in>
            {data.length ? (
              data.map((item, index) => {
                return (
                  <List spacing={3} key={index} fontSize="15px">
                    <ListItem mt="3px">
                      <ListIcon
                        cursor="pointer"
                        as={BsCheck2}
                        fontSize="18px"
                        color={
                          watched[router.query.id as string]
                            ? watched[router.query.id as string].includes(item.attributes.number)
                              ? 'green.500'
                              : 'lightgray'
                            : 'lightgray'
                        }
                        onClick={(): void => toggleWatched(item.attributes.number)}
                      />
                      {item.attributes.airdate}
                      <chakra.span ml="12px" />
                      {item.attributes.number}: {item.attributes.canonicalTitle || 'N/A'}
                    </ListItem>
                  </List>
                );
              })
            ) : (
              <>No data found</>
            )}
          </Fade>
        )}
      </>
    </Box>
  );
};

export default EpisodeList;
