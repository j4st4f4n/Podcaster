import axios from 'axios';
import {useEffect, useState} from 'react';

import {PodcastsData, PodcastsEntryReq, PodcastsEntry} from './Podcasts.types';
import {getExpireTime, httpErrorHandler} from '../../helpers/helpers';
import {useHistory} from 'react-router-dom';

const Podcasts = () => {
  const history = useHistory();
  const [podcasts, setPodcasts] = useState<PodcastsEntry[]>([]);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const {data} = await axios.get(`
          ${process.env.REACT_APP_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);

        const oneDayTimeInMiliseconds = 24 * 60 * 60 * 1000;
        const entries = simplifyRequestEntries(data.feed.entry);
        const podcastsToSaveData: PodcastsData = {
          podcasts: entries,
          expiration: getExpireTime(oneDayTimeInMiliseconds),
        };
        localStorage.setItem(
          'podcastsData',
          JSON.stringify(podcastsToSaveData)
        );
        setPodcasts(entries);
      } catch (error) {
        httpErrorHandler(error);
      }
    };

    const preloadedPodcastsString = localStorage.getItem('podcastsData');

    if (preloadedPodcastsString) {
      const preloadedPodcasts: PodcastsData = JSON.parse(
        preloadedPodcastsString
      );
      const hasExpired = new Date().getTime() > preloadedPodcasts.expiration;
      if (!hasExpired) return setPodcasts(preloadedPodcasts.podcasts);
    }
    loadPodcasts();
  }, []);

  const onPodcastClickHandler = (podcastEntry: PodcastsEntry) => {
    history.push(`/podcast/${podcastEntry.id}`, {podcastEntry});
  };

  const simplifyRequestEntries = (reqEntries: PodcastsEntryReq[]) =>
    reqEntries.map((entry: PodcastsEntryReq) => {
      const simplifiedEntry: PodcastsEntry = {
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

  return (
    <div>
      <h1>PODCASTS</h1>
      {podcasts.map((podcast: PodcastsEntry) => (
        <div
          key={podcast.id}
          style={{marginBottom: '1rem'}}
          onClick={() => onPodcastClickHandler(podcast)}
        >
          <div>{podcast.title}</div>
          <div>Author: {podcast.artist}</div>
          <img src={podcast.image[0].label} alt={podcast.name} />
        </div>
      ))}
    </div>
  );
};

export default Podcasts;
