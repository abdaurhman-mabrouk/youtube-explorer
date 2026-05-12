// import { useState } from 'react';
import './ResultVideoCard.css';

export default function ResultVideoCard({
  videoId,
  videoThumbnailSrc,
  videoTitle,
  channelTitle,
  publishedAt,
  videoDescription,
  resultType,
  viewsCount,
  likesCount,
  dislikesCount,
}: {
  videoId: string;
  videoThumbnailSrc: string;
  videoTitle: string;
  channelTitle: string;
  publishedAt: string;
  videoDescription: string;
  resultType: string;
  viewsCount: string;
  likesCount: string;
  dislikesCount: string;
}) {
  const dateString = (() => {
    if (!publishedAt) return '';
    const d = new Date(publishedAt);
    return isNaN(d.getTime()) ? '' : d.toDateString();
  })();

  return (
    <div
      className={`result-video-card position-relative`}
      id={`video_${videoId}`}>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${videoTitle} on YouTube`}>
        <span className="result-type rounded-pill px-1">
          <i>{resultType}</i>
        </span>
        <div className="card h-100 shadow">
          <img
            src={videoThumbnailSrc}
            className="card-img-top"
            alt={videoTitle}
            loading="lazy"
          />

          <div className="card-body">
            <div>
              <h6>{videoTitle}</h6>
              <small>{channelTitle}</small>
              {dateString ? (
                <p className="text-muted">
                  <small>{dateString}</small>
                </p>
              ) : null}

              <div className="d-flex gap-3">
                {viewsCount ? (
                  <small className="d-flex gap-1 align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width={16}
                      height={16}>
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z" />
                    </svg>
                    {Number.isNaN(Number(viewsCount))
                      ? viewsCount
                      : new Intl.NumberFormat('en', {
                          notation: 'compact',
                          compactDisplay: 'short',
                        }).format(Number(viewsCount))}
                  </small>
                ) : (
                  ''
                )}

                <div>
                  <small>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={16}
                      height={16}>
                      <path d="M80 160c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 192c0-17.7 14.3-32 32-32l48 0zM270.6 16C297.9 16 320 38.1 320 65.4l0 4.2c0 6.8-1.3 13.6-3.8 19.9L288 160 448 160c26.5 0 48 21.5 48 48 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 23.4-16.8 42.9-39 47.1 4.4 7.3 7 15.8 7 24.9 0 22.2-15 40.8-35.4 46.3 2.2 5.5 3.4 11.5 3.4 17.7 0 26.5-21.5 48-48 48l-87.9 0c-36.3 0-71.6-12.4-99.9-35.1L184 435.2c-15.2-12.1-24-30.5-24-50l0-186.6c0-14.9 3.5-29.6 10.1-42.9L226.3 43.3C234.7 26.6 251.8 16 270.6 16z" />
                    </svg>
                    {likesCount}
                  </small>

                  {'|'}

                  <small>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={16}
                      height={16}>
                      <path d="M384 32c26.5 0 48 21.5 48 48 0 6.3-1.3 12.2-3.4 17.7 20.4 5.5 35.4 24.1 35.4 46.3 0 9.1-2.6 17.6-7 24.9 22.2 4.2 39 23.7 39 47.1 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 26.5-21.5 48-48 48l-160 0 28.2 70.4c2.5 6.3 3.8 13.1 3.8 19.9l0 4.2c0 27.3-22.1 49.4-49.4 49.4-18.7 0-35.8-10.6-44.2-27.3L170.1 356.3c-6.7-13.3-10.1-28-10.1-42.9l0-186.6c0-19.4 8.9-37.8 24-50l12.2-9.7C224.6 44.4 259.8 32 296.1 32L384 32zM80 96c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l48 0z" />
                    </svg>
                    {dislikesCount ? dislikesCount : '0'}
                  </small>
                </div>
              </div>
            </div>

            <div className="ms-auto">
              <p className="card-text">{videoDescription}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
