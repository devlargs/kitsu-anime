import { Box, Flex, Text } from '@chakra-ui/react';
import EpisodeList from '@components/EpisodeList';
import { ANIME_URL_BY_ID } from '@constants/api';
import { POSTER_PLACEHOLDER_BLUR } from '@constants/images';
import { STYLES } from '@constants/styles';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { AnimeAttributes } from 'types';
import { formatCount } from 'utils/formatCount';

const AnimeById: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<AnimeAttributes | null>(null);
  const [episodeLink, setEpisodeLink] = useState('');

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch(ANIME_URL_BY_ID + router.query.id);
      const json = await response.json();
      console.log(json);
      setData(json.data.attributes);

      try {
        if (json.data.relationships.episodes.links.related) {
          setEpisodeLink(json.data.relationships.episodes.links.related);
        }

        // if (json.data.relationships.characters.links.related) {
        //   console.log(json.data.relationships.characters.links.related);
        // }
      } catch (ex) {
        console.error(ex); // eslint-disable-line
      }
    };

    void load();
  }, [router.query.id]);

  return (
    <Box overflowY="auto" id="anime-list" h="calc(100vh - 60px)">
      {data && (
        <>
          <Image src={data.coverImage.large} alt={data.canonicalTitle} width={3360} height={800} />
          <Box px={STYLES.container.padding} my="2rem">
            <Text textAlign="center" my="16px" fontSize="32px">
              {data.canonicalTitle}
            </Text>

            <Link href="/">
              <Flex alignItems="center" gap="12px">
                <BsChevronLeft />
                <Text>Back</Text>
              </Flex>
            </Link>

            <Flex mt="16px" gap="20px">
              <Box width="300px" fontSize="14px">
                <Image
                  style={{ borderRadius: '8px' }}
                  src={data.posterImage.large}
                  width={550}
                  height={780}
                  alt={data.canonicalTitle}
                  placeholder="blur"
                  blurDataURL={POSTER_PLACEHOLDER_BLUR}
                />
                <Flex alignItems="center" mt="16px">
                  <AiFillHeart color="#1A365D" />{' '}
                  <Text>
                    {data.averageRating} from {formatCount(data.userCount, 1)} users
                  </Text>
                </Flex>
                {/* {false && <AiOutlineHeart color="#1A365D" />} */}
                <Flex alignItems="center">
                  <AiFillStar color="#1A365D" />
                  <Text>{data.favoritesCount}</Text>
                  <Text ml="8px">Rank #{data.popularityRank}</Text>
                </Flex>
                {/* {false && <AiOutlineStar color="#1A365D" />} */}
                <Text>
                  Rated: {data.ageRating} ({data.ageRatingGuide})
                </Text>
                <Text>Aired on: {data.startDate}</Text>
                <Text>{!data.endDate ? 'Ongoing' : `Ended on ${data.endDate}`}</Text>
                <Text>Type: {data.subtype}</Text>
              </Box>
              <Box flex="1">
                <Text>{data.description}</Text>
                {episodeLink && <EpisodeList link={episodeLink} />}
              </Box>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AnimeById;
