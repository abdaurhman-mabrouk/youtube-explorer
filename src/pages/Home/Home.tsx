import { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  searchVideosByKeyword,
  searchChannelsByKeyword,
  searchPlaylistsByKeyword,
} from '../../apis/Youtube';

import type {
  VideoResource as VideoItem,
  ChannelResource,
  PlaylistResource,
} from '../../apis/Types';

import './Home.css';

const ResultVideoCard = lazy(
  () => import('../../components/ResultVideoCard/ResultVideoCard'),
);
const ResultCard = lazy(() => import('../../components/ResultCard/ResultCard'));
const ResultChannelCard = lazy(
  () => import('../../components/ResultChannelCard/ResultChannelCard'),
);
const LoadingSpinner = lazy(
  () => import('../../components/LoadingSpinner/LoadingSpinner'),
);
const Logo = '/favicon.png';

export default function Home() {
  const [query, setQuery] = useState<string>('opilz');
  const [searchType, setSearchType] = useState<string>('video');
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined,
  );
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(
    undefined,
  );
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [channels, setChannels] = useState<ChannelResource[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistResource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [totalResults, setTotalResults] = useState<number>(0);

  const handleSearch = async () => {
    setLoading(true);
    if (!query.trim()) {
      setError('Please enter a search Keyword!');
      setLoading(false);
      return;
    } else {
      setError('');
    }

    try {
      if (searchType === 'video') {
        const data = await searchVideosByKeyword(query);

        if ('error' in data) {
          setError(data.error.message);
          setVideos([]);
          return;
        }

        setVideos(data.items);
        setChannels([]);
        setPlaylists([]);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? 0);
      } else if (searchType === 'channel') {
        const data = await searchChannelsByKeyword(query);
        if ('error' in data) {
          setError(data.error.message);
          setChannels([]);
          return;
        }

        setChannels(data.items);
        setVideos([]);
        setPlaylists([]);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? 0);
      } else if (searchType === 'playlist') {
        const data = await searchPlaylistsByKeyword(query);
        if ('error' in data) {
          setError(data.error.message);
          setPlaylists([]);
          return;
        }

        setPlaylists(data.items);
        setVideos([]);
        setChannels([]);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? 0);
      } else {
        setError('Search type is not supported yet.');
        setVideos([]);
        setChannels([]);
        setPlaylists([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  async function nextPage() {
    if (!nextPageToken) return;
    setLoading(true);
    try {
      if (searchType === 'video') {
        const data = await searchVideosByKeyword(query, nextPageToken);
        if ('error' in data) return setError(data.error.message);
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? totalResults);
      } else if (searchType === 'channel') {
        const data = await searchChannelsByKeyword(query, nextPageToken);
        if ('error' in data) return setError(data.error.message);
        setChannels(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? totalResults);
      } else if (searchType === 'playlist') {
        const data = await searchPlaylistsByKeyword(query, nextPageToken);
        if ('error' in data) return setError(data.error.message);
        setPlaylists(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? totalResults);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch next page');
    } finally {
      setLoading(false);
    }
  }

  async function prevPage() {
    if (!prevPageToken) return;
    setLoading(true);
    try {
      if (searchType === 'video') {
        const data = await searchVideosByKeyword(query, prevPageToken);
        if ('error' in data) return setError(data.error.message);
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? totalResults);
      } else if (searchType === 'channel') {
        const data = await searchChannelsByKeyword(query, prevPageToken);
        if ('error' in data) return setError(data.error.message);
        setChannels(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? totalResults);
      } else if (searchType === 'playlist') {
        const data = await searchPlaylistsByKeyword(query, prevPageToken);
        if ('error' in data) return setError(data.error.message);
        setPlaylists(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.pageInfo?.totalResults ?? totalResults);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch previous page');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4 d-flex flex-column align-items-center">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 className="d-flex gap-2 mb-4">
          <img src={Logo} alt="Logo" width={48} height={48} />
          YouTube Explorer
        </h2>
      </Link>

      <div className="d-flex gap-2 mb-4">
        <select
          id="searchResultType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          defaultValue="">
          <option value="">All</option>
          <option value="video">Videos</option>
          <option value="channel">Channels</option>
          <option value="playlist">Playlists</option>
        </select>

        <input
          id="searchQueryInput"
          type="search"
          className="form-control"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          id="searchBtn"
          className="btn btn-primary"
          onClick={handleSearch}>
          Search
        </button>

        {(videos.length !== 0 ||
          channels.length !== 0 ||
          playlists.length !== 0) &&
        !loading &&
        !error ? (
          <>
            <button
              id="clearResultsBtn"
              className="btn btn-secondary"
              onClick={() => {
                setVideos([]);
                setChannels([]);
                setPlaylists([]);
                setNextPageToken(undefined);
                setPrevPageToken(undefined);
                setTotalResults(0);
              }}>
              Clear Results
            </button>
          </>
        ) : null}
      </div>

      {loading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingSpinner />
        </Suspense>
      ) : error ? (
        <div className="text-danger">
          <i>{error}</i>
        </div>
      ) : (
        <div id="resultsContainer" className="d-flex flex-wrap gap-4">
          {searchType === 'video' &&
            videos.map((video) => (
              <ResultVideoCard
                key={video.id}
                videoId={video.id}
                videoThumbnailSrc={video.snippet.thumbnails.medium.url}
                videoTitle={video.snippet.title}
                channelTitle={video.snippet.channelTitle}
                videoDescription={video.snippet.description}
                likesCount={video.statistics?.likeCount ?? '0'}
                dislikesCount={video.statistics?.dislikeCount ?? '0'}
                viewsCount={video.statistics?.viewCount ?? '0'}
                publishedAt={video.snippet.publishedAt}
                resultType={video.kind?.split?.('#')?.[1] ?? 'video'}
              />
            ))}

          {searchType === 'channel' &&
            channels.map((ch) => (
              <ResultChannelCard
                key={ch.id.channelId}
                channelId={ch.id.channelId}
                href={`https://www.youtube.com/channel/${ch.id.channelId}`}
                channelThumbnailSrc={ch.snippet.thumbnails.medium.url}
                channelTitle={ch.snippet.channelTitle}
                channelDescription={ch.snippet.description}
                publishedAt={ch.snippet.publishedAt ?? ''}
              />
            ))}

          {searchType === 'playlist' &&
            playlists.map((pl) => (
              <ResultCard
                key={pl.id}
                resultId={pl.id}
                href={`https://www.youtube.com/playlist?list=${pl.id}`}
                videoThumbnailSrc={pl.snippet.thumbnails.medium.url}
                videoTitle={pl.snippet.title}
                channelTitle={pl.snippet.channelTitle ?? ''}
                videoDescription={pl.snippet.description}
                publishedAt={pl.snippet.publishedAt ?? ''}
                resultType={'playlist'}
              />
            ))}
        </div>
      )}

      {(videos.length !== 0 ||
        channels.length !== 0 ||
        playlists.length !== 0) &&
      !loading &&
      !error ? (
        <>
          <div className="d-flex gap-5 mt-4">
            <button
              className="rounded-pill px-3 py-1 border-0"
              id="nextPageBtn"
              type="button"
              onClick={nextPage}
              disabled={!nextPageToken}>
              Next Page
            </button>

            <button
              id="prevPageBtn"
              className="rounded-pill px-3 py-1 border-0"
              type="button"
              onClick={prevPage}
              disabled={!prevPageToken}>
              Previous Page
            </button>
          </div>

          <small className="mt-3 text-muted">{totalResults} Results</small>
        </>
      ) : null}
    </div>
  );
}
