import { Box, chakra, List, ListIcon, ListItem, Spinner, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { EpisodeData } from 'types';

const EpisodeList: FC<{ link: string }> = ({ link }) => {
  const [data, setData] = useState<EpisodeData[]>([]);
  const [loading, setLoading] = useState(true);

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
          <>
            {data.length ? (
              data.map((item, index) => {
                return (
                  <List spacing={3} key={index} fontSize="15px">
                    <ListItem mt="3px">
                      <ListIcon as={BsCheck2} color="gray" />
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
          </>
        )}
      </>
    </Box>
  );
};

export default EpisodeList;
