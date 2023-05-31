import { Box, Flex, Grid, GridItem, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { STYLES } from '@constants/styles';
import uniqBy from 'lodash/uniqBy';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';

type AnimeFilters = 'starred' | 'favorited';

const Home: NextPage = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setNextPage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<AnimeFilters[]>([]);

  const load = async (url: string): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setNextPage(json.links.next);
      setData((prev) => uniqBy([...prev, ...json.data], 'id'));
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => item.attributes.canonicalTitle.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, data]);

  useEffect(() => {
    void load('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0');
  }, []);

  const chooseFilter = (filter: AnimeFilters): void => {
    setFilters((prev) => (prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]));
  };

  return (
    <Box px={STYLES.container.padding} my="2rem">
      <Text textAlign="center" fontSize="32px" mb="32px">
        Anime List
      </Text>

      <Flex
        alignItems={{
          base: '',
          sm: 'center',
        }}
        justifyContent="space-between"
        mb="32px"
        gap="16px"
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Flex alignItems="center" gap="4px">
          <Text fontSize="20px" mt="-4px" mr="8px">
            Filter:
          </Text>
          <Box onClick={(): void => chooseFilter('starred')} fontSize="20px" cursor="pointer">
            {filters.includes('starred') ? <AiFillStar /> : <AiOutlineStar />}
          </Box>
          <Box onClick={(): void => chooseFilter('favorited')} cursor="pointer" fontSize="18px">
            {filters.includes('favorited') ? <AiFillHeart /> : <AiOutlineHeart />}
          </Box>
        </Flex>

        <InputGroup
          width={{
            base: '100%',
            sm: '40%',
          }}
        >
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search anime" value={searchText} onChange={(e): void => setSearchText(e.target.value)} />
        </InputGroup>

        <Text fontSize="20px">{filteredData.length} Results</Text>
      </Flex>

      {data.length ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {filteredData.map((item) => {
            return (
              <GridItem
                w="100%"
                bg="blue.700"
                key={item.id}
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                borderRadius="8"
              >
                <Image
                  style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                  src={item.attributes.posterImage.large}
                  width={550}
                  height={780}
                  alt={item.attributes.canonicalTitle}
                />
                <Box p="10px">
                  <Text
                    color="white"
                    h="48px"
                    fontSize={{
                      base: '13px',
                      md: '16px',
                    }}
                  >
                    {item.attributes.canonicalTitle}
                  </Text>
                  <Flex
                    justifyContent="space-between"
                    fontSize={{
                      base: '13px',
                      md: '16px',
                    }}
                  >
                    <Flex alignItems="center" gap="4px">
                      <AiOutlineStar color="white" />
                      <AiFillStar color="white" />
                      <Text color="white">{item.attributes.averageRating}</Text>
                    </Flex>
                    <Flex alignItems="center" gap="4px">
                      <AiOutlineHeart color="white" />
                      <AiFillHeart color="white" />
                      <Text color="white">{item.attributes.popularityRank}</Text>
                    </Flex>
                  </Flex>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <p>No data</p>
      )}

      {loading && <p>Loading...</p>}
    </Box>
  );
};

export default Home;
