/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './ResultChannelCard.css';

//TODO:
export default function ResultChannelCard({
  channelId,
  href,
  channelThumbnailSrc,
  channelTitle,
  channelDescription,
  publishedAt,
}: {
  channelId: string;
  href?: string;
  channelThumbnailSrc: string;
  channelTitle: string;
  channelDescription: string;
  publishedAt: string;
}) {
  return (
    <>
      <div
        id={`channel_${channelId}`}
        className="channel-card position-relative">
        <a
          href={href ?? `https://www.youtube.com/channel/${channelId}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${channelTitle} on YouTube`}>
          <span className="result-type rounded-pill">Channel</span>
          <div className="card h-100 shadow">
            <img
              className="card-img-top"
              src={channelThumbnailSrc}
              // width={100}
              alt={channelTitle}
              loading="lazy"
            />

            <div className="card-body">
              <h6>{channelTitle}</h6>
              <small>{channelTitle}</small>
              {publishedAt ? (
                <p className="text-muted">
                  <small>{publishedAt}</small>
                </p>
              ) : null}
              <p className="card-text">{channelDescription}</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
