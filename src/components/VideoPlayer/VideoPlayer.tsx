import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ videoSrc }: { videoSrc: string }) {
  return (
    <>
      <div>
        <ReactPlayer src={`https://www.youtube.com/watch?v=${videoSrc}`} />
      </div>
    </>
  );
}
