import "./ResultCard.css";

export default function ResultCard({
  resultId,
  href,
  videoThumbnailSrc,
  videoTitle,
  channelTitle,
  videoDescription,
  publishedAt,
  resultType,
}: {
  resultId: string;
  href?: string;
  videoThumbnailSrc: string;
  videoTitle: string;
  channelTitle: string;
  videoDescription: string;
  publishedAt: string;
  resultType: string;
}) {
  const link = href ?? `https://www.youtube.com/watch?v=${resultId}`;
  const dateString = (() => {
    if (!publishedAt) return "";
    const d = new Date(publishedAt);
    return isNaN(d.getTime()) ? "" : d.toDateString();
  })();

  return (
    <div className={`result-card position-relative`} id={`video_${resultId}`}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${videoTitle} on YouTube`}
      >
        <span className="result-type rounded-pill z-1">{resultType}</span>
        <div className="card h-100 shadow">
          <img
            src={videoThumbnailSrc}
            className="card-img-top"
            alt={videoTitle}
            loading="lazy"
          />

          <div className="card-body">
            <h6>{videoTitle}</h6>
            <small>{channelTitle}</small>
            {dateString ? (
              <p className="text-muted">
                <small>{dateString}</small>
              </p>
            ) : null}
            <p className="card-text">{videoDescription}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
