// Generic pagination info included in list responses
export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

// A single thumbnail resource
export interface ThumbnailDetails {
  url: string;
  width: number;
  height: number;
}

// The thumbnails object that contains different resolutions
export interface Thumbnails {
  default?: ThumbnailDetails;
  medium?: ThumbnailDetails;
  high?: ThumbnailDetails;
  standard?: ThumbnailDetails;
  maxres?: ThumbnailDetails;
}

// A resource ID that uniquely identifies a YouTube resource
export interface ResourceId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  localized?: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
}

export interface VideoContentDetails {
  duration: string; // ISO 8601 format
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction?: {
    allowed?: string[];
    blocked?: string[];
  };
  contentRating?: {
    acbRating?: string;
    agcomRating?: string;
    anatelRating?: string;
    bbfcRating?: string;
    // ... many other rating system codes are possible
  };
  projection?: string;
  hasCustomThumbnail?: boolean;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoResource {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: VideoSnippet;
  contentDetails: VideoContentDetails;
  statistics: VideoStatistics;
}

export interface VideoListResponse {
  kind: 'youtube#videoListResponse';
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: VideoResource[];
}
export interface ChannelSnippet {
  title: string;
  description: string;
  customUrl?: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  defaultLanguage?: string;
  localized?: {
    title: string;
    description: string;
  };
  country?: string;
}

export interface ChannelContentDetails {
  relatedPlaylists?: {
    likes: string;
    uploads: string;
    watchHistory: string;
    watchLater: string;
  };
}

export interface ChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface ChannelResource {
  kind: 'youtube#channel';
  etag: string;
  id: string;
  snippet: ChannelSnippet;
  contentDetails?: ChannelContentDetails;
  statistics?: ChannelStatistics;
}

export interface ChannelListResponse {
  kind: 'youtube#channelListResponse';
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: ChannelResource[];
}

export interface PlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
}

export interface PlaylistItemContentDetails {
  videoId: string;
  startAt?: string;
  endAt?: string;
  note?: string;
  videoPublishedAt?: string;
}

export interface PlaylistItemResource {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
  snippet: PlaylistItemSnippet;
  contentDetails: PlaylistItemContentDetails;
}

export interface PlaylistItemListResponse {
  kind: 'youtube#playlistItemListResponse';
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: PageInfo;
  items: PlaylistItemResource[];
}

// export interface ActivitySnippet {
//   publishedAt: string;
//   channelId: string;
//   title: string;
//   description: string;
//   thumbnails: Thumbnails;
//   channelTitle: string;
//   type: string; // e.g., 'upload', 'like', 'favorite'
//   groupId?: string;
// }

// export interface ActivityContentDetails {
//   upload?: {
//     videoId: string;
//   };
//   like?: {
//     resourceId: ResourceId;
//   };
//   favorite?: {
//     resourceId: ResourceId;
//   };
//   comment?: {
//     resourceId: ResourceId;
//   };
//   subscription?: {
//     resourceId: ResourceId;
//   };
//   playlistItem?: {
//     resourceId: ResourceId;
//     playlistId: string;
//     playlistItemId: string;
//   };
//   recommendation?: {
//     resourceId: ResourceId;
//     reason: string;
//     seedResourceId: ResourceId;
//   };
//   social?: {
//     type: string;
//     resourceId: ResourceId;
//     author: string;
//     referenceUrl: string;
//     imageUrl: string;
//   };
//   channelItem?: {
//     resourceId: ResourceId;
//   };
// }

// export interface ActivityResource {
//   kind: 'youtube#activity';
//   etag: string;
//   id: string;
//   snippet: ActivitySnippet;
//   contentDetails: ActivityContentDetails;
// }

// export interface ActivityListResponse {
//   kind: 'youtube#activityListResponse';
//   etag: string;
//   nextPageToken?: string;
//   prevPageToken?: string;
//   pageInfo: PageInfo;
//   items: ActivityResource[];
// }

// export interface SubscriptionSnippet {
//   publishedAt: string;
//   channelTitle: string;
//   title: string;
//   description: string;
//   resourceId: ResourceId; // the channel being subscribed to
//   channelId: string; // subscriber's channel ID
//   thumbnails: Thumbnails;
// }

// export interface SubscriptionContentDetails {
//   totalItemCount: number;
//   newItemCount: number;
//   activityType: string; // "all", "uploads", etc.
// }

// export interface SubscriptionResource {
//   kind: 'youtube#subscription';
//   etag: string;
//   id: string;
//   snippet: SubscriptionSnippet;
//   contentDetails: SubscriptionContentDetails;
// }

// export interface SubscriptionListResponse {
//   kind: 'youtube#subscriptionListResponse';
//   etag: string;
//   nextPageToken?: string;
//   prevPageToken?: string;
//   pageInfo: PageInfo;
//   items: SubscriptionResource[];
// }

// // ----- Comment (used both as top-level and reply) -----
// export interface CommentSnippet {
//   authorDisplayName: string;
//   authorProfileImageUrl: string;
//   authorChannelUrl?: string;
//   authorChannelId?: {
//     value: string;
//   };
//   channelId?: string; // channel where the comment was made (for channel comments)
//   videoId?: string;
//   textDisplay: string;
//   textOriginal: string;
//   parentId?: string; // present if it's a reply
//   likeCount: number;
//   moderationStatus?: string;
//   publishedAt: string;
//   updatedAt: string;
// }

// export interface CommentResource {
//   kind: 'youtube#comment';
//   etag: string;
//   id: string;
//   snippet: CommentSnippet;
// }

// // ----- CommentThread -----
// export interface CommentThreadSnippet {
//   channelId: string;
//   videoId?: string;
//   topLevelComment: CommentResource;
//   canReply: boolean;
//   totalReplyCount: number;
//   isPublic: boolean;
// }

// export interface CommentThreadReplies {
//   comments: CommentResource[]; // list of reply comments
// }

// export interface CommentThreadResource {
//   kind: 'youtube#commentThread';
//   etag: string;
//   id: string;
//   snippet: CommentThreadSnippet;
//   replies?: CommentThreadReplies; // only present if there are replies
// }

// export interface CommentThreadListResponse {
//   kind: 'youtube#commentThreadListResponse';
//   etag: string;
//   nextPageToken?: string;
//   prevPageToken?: string;
//   pageInfo: PageInfo;
//   items: CommentThreadResource[];
// }
