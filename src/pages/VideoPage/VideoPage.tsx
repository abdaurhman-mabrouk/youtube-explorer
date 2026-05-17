/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import type { VideoResource } from '../../apis/Types';
import { searchVideoById } from '../../apis/Youtube';
import './VideoPage.css';

export default function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();

  return (
    <>
      <div>
        <h1>Video Page</h1>
        {videoId ? (
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${videoId}`}
            controls
          />
        ) : (
          <p>No video ID provided.</p>
        )}
      </div>
    </>
  );
}
