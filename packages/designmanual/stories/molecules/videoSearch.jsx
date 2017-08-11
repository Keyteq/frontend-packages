/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

import VideoSearch from 'ndla-video-search';
import {
  firstBrightCoveList,
  secondBrightCoveList,
  brightCoveMockVideo,
} from '../../dummydata';

const fetchVideos = (query, offset) =>
  new Promise(resolve => {
    if (offset > 0) {
      return setTimeout(() => resolve(secondBrightCoveList), 1000);
    }
    return setTimeout(() => resolve(firstBrightCoveList), 1000);
  });

const fetchVideo = id =>
  new Promise(resolve => {
    const modifiedVideo = brightCoveMockVideo;
    modifiedVideo.id = id;
    resolve(modifiedVideo);
  });

export const VideoSearcher = () => {
  const videoSelect = video => {
    console.log(video); // eslint-disable-line no-console
  };

  const onError = err => {
    console.error(err); // eslint-disable-line no-console
  };
  const translations = {
    searchPlaceholder: 'Søk i videoer',
    searchButtonTitle: 'Søk',
    loadMoreVideos: 'Last flere videor',
    noResults: 'Ingen videor funnet.',
    addVideo: 'Bruk video',
    previewVideo: 'Forhåndsvis',
  };
  return (
    <VideoSearch
      translations={translations}
      fetchVideo={fetchVideo}
      searchVideos={fetchVideos}
      locale="nb"
      onVideoSelect={videoSelect}
      onError={onError}
    />
  );
};

export default VideoSearcher;