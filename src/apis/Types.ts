export type Thumbnail = {
  url: string;
  width?: number;
  height?: number;
};

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    medium: Thumbnail;
    default?: Thumbnail;
    high?: Thumbnail;
  };
  channelTitle: string;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoResource {
  kind: string;
  etag?: string;
  id: string;
  snippet: VideoSnippet;
  statistics?: VideoStatistics;
}

export interface SearchVideosByKeywordResponse {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoResource[];
}

export interface ChannelSnippet {
  channelTitle: string;
  description: string;
  customUrl?: string;
  publishedAt?: string;
  thumbnails: {
    medium: Thumbnail;
    default?: Thumbnail;
    high?: Thumbnail;
  };
  liveBroadcastContent: string;
}

export interface ChannelResource {
  kind: string;
  etag?: string;
  id: {
    kind: string;
    channelId: string;
  };
  snippet: ChannelSnippet;
}

export interface ChannelsResource {
  kind: string;
  etag?: string;
  id: string;
  snippet: ChannelSnippet;
}

export interface SearchChannelsByKeywordResponse {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ChannelResource[];
}

export interface PlaylistSnippet {
  publishedAt?: string;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: {
    medium: Thumbnail;
    default?: Thumbnail;
    high?: Thumbnail;
  };
  channelTitle?: string;
}

export interface PlaylistResource {
  kind: string;
  etag?: string;
  id: string;
  snippet: PlaylistSnippet;
  contentDetails?: {
    itemCount?: number;
  };
}

export interface SearchPlaylistsByKeywordResponse {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: PlaylistResource[];
}

export interface YoutubeErrorResponse {
  error: {
    code: number;
    message: string;
    errors?: Array<{
      domain?: string;
      reason?: string;
      message?: string;
    }>;
  };
}
