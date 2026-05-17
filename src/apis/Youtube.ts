/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  SearchVideosByKeywordResponse,
  SearchChannelsByKeywordResponse,
  SearchPlaylistsByKeywordResponse,
  YoutubeErrorResponse,
} from './Types';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function searchVideosByKeyword(
  query: string,
  pageToken?: string,
): Promise<SearchVideosByKeywordResponse | YoutubeErrorResponse> {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
    query,
  )}${pageToken ? `&pageToken=${pageToken}` : ''}&key=${API_KEY}`;

  try {
    const searchRes = await fetch(searchUrl);
    type SearchApiResponse = {
      kind?: string;
      etag?: string;
      nextPageToken?: string;
      prevPageToken?: string;
      pageInfo?: { totalResults: number; resultsPerPage: number };
      items?: Array<{
        id?: { videoId?: string };
        snippet?: unknown;
        statistics?: unknown;
      }>;
    };

    const searchJson = (await searchRes.json()) as SearchApiResponse;
    if (!searchRes.ok) {
      return searchJson as unknown as YoutubeErrorResponse;
    }

    const videoIds = (searchJson.items || [])
      .map((item) => item.id?.videoId)
      .filter((v): v is string => !!v);

    if (videoIds.length === 0) {
      return {
        kind: searchJson.kind,
        etag: searchJson.etag,
        nextPageToken: searchJson.nextPageToken,
        prevPageToken: searchJson.prevPageToken,
        pageInfo: searchJson.pageInfo || { totalResults: 0, resultsPerPage: 0 },
        items: [],
      } as SearchVideosByKeywordResponse;
    }

    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosJson = await videosRes.json();
    if (!videosRes.ok) {
      return videosJson as YoutubeErrorResponse;
    }

    const result: SearchVideosByKeywordResponse = {
      kind: videosJson.kind,
      etag: videosJson.etag,
      nextPageToken: searchJson.nextPageToken,
      prevPageToken: searchJson.prevPageToken,
      pageInfo: searchJson.pageInfo || {
        totalResults: videosJson.items?.length || 0,
        resultsPerPage: videosJson.items?.length || 0,
      },
      items: videosJson.items || [],
    };

    return result;
  } catch (err) {
    console.error(err);
    return {
      error: {
        code: 500,
        message: 'Network or parsing error',
        errors: [
          {
            domain: 'client',
            reason: 'internalError',
            message: String(err),
          },
        ],
      },
    } as YoutubeErrorResponse;
  }
}

export async function searchChannelsByKeyword(
  query: string,
  pageToken?: string,
): Promise<SearchChannelsByKeywordResponse | YoutubeErrorResponse> {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=12&q=${encodeURIComponent(
    query,
  )}${pageToken ? `&pageToken=${pageToken}` : ''}&key=${API_KEY}`;

  try {
    const searchRes = await fetch(searchUrl);

    const searchJson =
      (await searchRes.json()) as SearchChannelsByKeywordResponse;

    if (!searchRes.ok) {
      return searchJson as unknown as YoutubeErrorResponse;
    }

    return searchJson;
  } catch (error) {
    console.error(error);
    return error as YoutubeErrorResponse;
  }
}

export async function searchPlaylistsByKeyword(
  query: string,
  pageToken?: string,
): Promise<SearchPlaylistsByKeywordResponse | YoutubeErrorResponse> {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=12&q=${encodeURIComponent(
    query,
  )}${pageToken ? `&pageToken=${pageToken}` : ''}&key=${API_KEY}`;

  try {
    const searchRes = await fetch(searchUrl);
    type SearchApiResponse = {
      kind?: string;
      etag?: string;
      nextPageToken?: string;
      prevPageToken?: string;
      pageInfo?: { totalResults: number; resultsPerPage: number };
      items?: Array<{ id?: { playlistId?: string }; snippet?: unknown }>;
    };

    const searchJson = (await searchRes.json()) as SearchApiResponse;
    if (!searchRes.ok) {
      return searchJson as unknown as YoutubeErrorResponse;
    }

    const playlistIds = (searchJson.items || [])
      .map((item) => item.id?.playlistId)
      .filter((v): v is string => !!v);

    if (playlistIds.length === 0) {
      return {
        kind: searchJson.kind,
        etag: searchJson.etag,
        nextPageToken: searchJson.nextPageToken,
        prevPageToken: searchJson.prevPageToken,
        pageInfo: searchJson.pageInfo || { totalResults: 0, resultsPerPage: 0 },
        items: [],
      } as SearchPlaylistsByKeywordResponse;
    }

    const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistIds.join(',')}&key=${API_KEY}`;
    const playlistsRes = await fetch(playlistsUrl);
    const playlistsJson = await playlistsRes.json();
    if (!playlistsRes.ok) {
      return playlistsJson as YoutubeErrorResponse;
    }

    const result: SearchPlaylistsByKeywordResponse = {
      kind: playlistsJson.kind,
      etag: playlistsJson.etag,
      nextPageToken: searchJson.nextPageToken,
      prevPageToken: searchJson.prevPageToken,
      pageInfo: searchJson.pageInfo || {
        totalResults: playlistsJson.items?.length || 0,
        resultsPerPage: playlistsJson.items?.length || 0,
      },
      items: playlistsJson.items || [],
    };

    return result;
  } catch (error) {
    console.error(error);
    return error as YoutubeErrorResponse;
  }
}

export async function searchVideosByChannelId(
  channelId: string,
): Promise<SearchVideosByKeywordResponse | YoutubeErrorResponse> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&maxResults=12&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      return json as YoutubeErrorResponse;
    }

    console.log(json as SearchVideosByKeywordResponse);
    return json as SearchVideosByKeywordResponse;
  } catch (error) {
    console.error(error);
    return error as YoutubeErrorResponse;
  }
}

export async function searchVideoById({ videoId }: { videoId: string }) {}
