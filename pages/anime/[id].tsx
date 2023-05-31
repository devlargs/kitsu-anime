import { Box, Fade, Flex, Spinner, Text } from '@chakra-ui/react';
import CharactersCard from '@components/CharactersCard';
import EpisodeList from '@components/EpisodeList';
import { ANIME_URL_BY_ID } from '@constants/api';
import { COVER_IMAGE_PLACEHOLDER_BLUR, POSTER_PLACEHOLDER_BLUR } from '@constants/images';
import { STYLES } from '@constants/styles';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { AnimeAttributes, AnimeFilters } from 'types';
import { formatCount } from 'utils/formatCount';

const AnimeById: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<AnimeAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [episodeLink, setEpisodeLink] = useState('');
  const [charactersLink, setCharactersLink] = useState('');
  const [starred, setStarred] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const localStar = localStorage.getItem('starred');
    const localFavorite = localStorage.getItem('favorited');

    const id = router.query.id;

    if (localStar) {
      if (JSON.parse(localStar).includes(id)) {
        setStarred(true);
      }
    }

    if (localFavorite) {
      if (JSON.parse(localFavorite).includes(id)) {
        setFavorited(true);
      }
    }
  }, [router]);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const response = await fetch(ANIME_URL_BY_ID + router.query.id);
      const json = await response.json();

      if (json.data?.attributes) {
        setData(json.data.attributes);
      }

      try {
        if (json.data?.relationships?.episodes?.links?.related) {
          setEpisodeLink(json.data.relationships.episodes.links.related);
        }

        if (json.data?.relationships?.characters?.links?.related) {
          setCharactersLink(json.data.relationships.characters.links.related);
        }
      } catch (ex) {
        console.error(ex); // eslint-disable-line
      } finally {
        setLoading(false);
      }
    };

    if (router.query.id) {
      void load();
    }
  }, [router.query.id]);

  const toggleAnime = (variant: AnimeFilters): void => {
    const toggleStorageItem = (storageKey: string): void => {
      const localItem = localStorage.getItem(storageKey);
      if (localItem) {
        const parsed = JSON.parse(localItem);
        if (parsed.includes(router.query.id)) {
          const filtered = parsed.filter((item: string) => item !== router.query.id);
          localStorage.setItem(storageKey, JSON.stringify(filtered));
        } else {
          localStorage.setItem(storageKey, JSON.stringify([...parsed, router.query.id]));
        }
      } else {
        localStorage.setItem(storageKey, JSON.stringify([router.query.id]));
      }
    };

    (variant === 'starred' ? setStarred : setFavorited)((prev) => !prev);
    toggleStorageItem(variant === 'starred' ? variant : 'favorited');
  };

  return loading ? (
    <Box display="grid" placeContent="center" h="200px">
      <Spinner color="blue.500" size="lg" />
    </Box>
  ) : (
    <Fade in>
      <Box overflowY="auto" id="anime-list" h="calc(100vh - 60px)">
        {data && (
          <>
            <Image
              src={data.coverImage?.large || '/cover-image-placeholder.jpg'}
              alt={data.canonicalTitle}
              width={3360}
              height={800}
              placeholder="blur"
              blurDataURL={COVER_IMAGE_PLACEHOLDER_BLUR}
            />

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

              <Flex
                mt="16px"
                gap="20px"
                flexDir={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Box width="300px" fontSize="14px" userSelect="none">
                  <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
                    <Image
                      style={{ borderRadius: '8px' }}
                      src={data.posterImage.large}
                      width={550}
                      height={780}
                      alt={data.canonicalTitle}
                      placeholder="blur"
                      blurDataURL={POSTER_PLACEHOLDER_BLUR}
                    />
                  </Box>
                  <Flex alignItems="center" mt="16px">
                    <Box cursor="pointer" onClick={(): void => toggleAnime('favorited')}>
                      {!favorited ? <AiOutlineHeart color="#1A365D" /> : <AiFillHeart color="#1A365D" />}
                    </Box>
                    <Text>
                      {data.averageRating} from {formatCount(data.userCount, 1)} users
                    </Text>
                  </Flex>

                  <Flex alignItems="center">
                    <Box cursor="pointer" onClick={(): void => toggleAnime('starred')}>
                      {starred ? <AiFillStar color="#1A365D" /> : <AiOutlineStar color="#1A365D" />}
                    </Box>
                    <Text>{data.favoritesCount}</Text>
                    <Text ml="8px">Rank #{data.popularityRank}</Text>
                  </Flex>
                  <Text>
                    Rated: {data.ageRating} {data.ageRatingGuide}
                  </Text>
                  <Text>Aired on: {data.startDate}</Text>
                  <Text>{!data.endDate ? 'Ongoing' : `Ended on ${data.endDate}`}</Text>
                  <Text>Type: {data.subtype}</Text>
                </Box>
                <Box flex="1">
                  <Text>{data.description}</Text>
                  {charactersLink && <CharactersCard link={charactersLink} />}
                  {episodeLink && <EpisodeList link={episodeLink} />}
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </Fade>
  );
};

export default AnimeById;
