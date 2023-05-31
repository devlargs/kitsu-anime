export type AnimeAttributes = {
  canonicalTitle: string;
  posterImage: {
    large: string;
  };
  coverImage: {
    large: string;
  };
  averageRating: number;
  popularityRank: number;
  description: string;
  userCount: number;
  favoritesCount: number;
  ageRating: string;
  ageRatingGuide: string;
  startDate: string;
  endDate: string | null;
  subtype: string;
};

export type EpisodeAttributes = {
  airdate: string;
  number: string;
  canonicalTitle: string;
  titles: {
    ja_jp: string;
  };
  id: string;
};

export type AnimeFilters = 'starred' | 'favorited';

export type AnimeData = {
  id: string;
  attributes: AnimeAttributes;
};

export type EpisodeData = {
  attributes: EpisodeAttributes;
};
