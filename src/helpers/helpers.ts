// import {
//   PodcastEntryI,
//   PodcastsEntryReq,
// } from '../screens/podcasts/Podcasts.types';

import {
  PodcastEntryI,
  PodcastsEntryReq,
} from '../context/podcast-context.types';

export const oneDayTimeInMiliseconds = 24 * 60 * 60 * 1000;

export const getFormattedDate = (date: number) =>
  new Date(date).toLocaleDateString('es-ES');

export const getFormattedDuration = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

export const httpErrorHandler = (error: any) => {
  if (error === null) {
    console.log('Unrecoverable error!! Error is null!');
    return;
  }
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
};

export const getExpireTime = (expirationInMilisecons: number) => {
  const nowTime = new Date().getTime();
  return nowTime + expirationInMilisecons;
};

export const simplifyRequestPodcastsEntry = (reqEntries: PodcastsEntryReq[]) =>
  reqEntries.map((entry: PodcastsEntryReq) => {
    const simplifiedEntry: PodcastEntryI = {
      id: entry.id.attributes['im:id'],
      name: entry['im:name'].label,
      title: entry.title.label,
      artist: entry['im:artist'].label,
      image: entry['im:image'].map(image => ({
        height: image.attributes.height,
        label: image.label,
      })),
    };
    return simplifiedEntry;
  });
