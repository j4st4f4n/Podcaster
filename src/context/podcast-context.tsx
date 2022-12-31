import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import {
  getExpireTime,
  httpErrorHandler,
  oneDayTimeInMiliseconds,
  simplifyRequestPodcastsEntry,
} from '../helpers/helpers';
import {
  PodcastContextI,
  PodcastContextProps,
  PodcastEntryI,
  PodcastsData,
} from './podcast.context.types';

export const PodcastContext = createContext<PodcastContextI>({
  podcastsList: [],
  selectedPodcast: undefined,
  loading: false,
  selectPodcast: podcastId => {},
  setLoading: value => {},
});

const PodcastContextProvaider = (props: PodcastContextProps) => {
  const [podcasts, setPodcasts] = useState<PodcastEntryI[]>([]);
  const [selectedPodcast, setSelectedPodcast] = useState<
    PodcastEntryI | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const { data } = await axios.get(`
          ${process.env.REACT_APP_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);

        const entries = simplifyRequestPodcastsEntry(data.feed.entry);
        const podcastsToSaveData: PodcastsData = {
          podcasts: entries,
          expiration: getExpireTime(oneDayTimeInMiliseconds),
        };
        localStorage.setItem(
          'podcastsData',
          JSON.stringify(podcastsToSaveData)
        );
        setPodcasts(entries);
        setLoading(false);
      } catch (error) {
        httpErrorHandler(error);
        setLoading(false);
      }
    };

    setLoading(true);
    const preloadedPodcastsString = localStorage.getItem('podcastsData');
    if (preloadedPodcastsString) {
      const preloadedPodcasts: PodcastsData = JSON.parse(
        preloadedPodcastsString
      );
      const hasExpired = new Date().getTime() > preloadedPodcasts.expiration;
      if (!hasExpired) {
        setPodcasts(preloadedPodcasts.podcasts);
        setLoading(false);
        return;
      }
    }
    loadPodcasts();
  }, []);

  const selectPodcastHandler = (podcastId: string) =>
    setSelectedPodcast(podcasts.find(podcast => podcast.id === podcastId));

  const setLoadingHandler = (value: boolean) => setLoading(value);

  const contextValue: PodcastContextI = {
    podcastsList: podcasts,
    selectedPodcast,
    loading,
    selectPodcast: selectPodcastHandler,
    setLoading: setLoadingHandler,
  };

  return (
    <PodcastContext.Provider value={contextValue}>
      {props.children}
    </PodcastContext.Provider>
  );
};

export default PodcastContextProvaider;
