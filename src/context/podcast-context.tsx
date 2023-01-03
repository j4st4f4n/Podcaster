import { createContext, useEffect, useReducer } from 'react';
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
  PodcastsData,
} from './podcast-context.types';
import {
  SET_PODCAST_LIST,
  SET_PODCAST_LOADING,
  SET_PODCAST_SELECTED,
  podcastReducer,
  podcastReducerInitialState,
} from './podcast-reducer';

export const PodcastContext = createContext<PodcastContextI>({
  podcastsList: [],
  selectedPodcast: undefined,
  loading: false,
  selectPodcast: podcastId => {},
  setLoading: value => {},
});

const PodcastContextProvaider = (props: PodcastContextProps) => {
  const [state, dispatch] = useReducer(
    podcastReducer,
    podcastReducerInitialState
  );

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
        dispatch({ type: SET_PODCAST_LIST, payload: entries });
      } catch (error) {
        httpErrorHandler(error);
        dispatch({ type: SET_PODCAST_LOADING, payload: false });
      }
    };

    dispatch({ type: SET_PODCAST_LOADING, payload: true });
    const preloadedPodcastsString = localStorage.getItem('podcastsData');
    if (preloadedPodcastsString) {
      const preloadedPodcasts: PodcastsData = JSON.parse(
        preloadedPodcastsString
      );
      const hasExpired = new Date().getTime() > preloadedPodcasts.expiration;
      if (!hasExpired) {
        dispatch({
          type: SET_PODCAST_LIST,
          payload: preloadedPodcasts.podcasts,
        });
        return;
      }
    }
    loadPodcasts();
  }, []);

  const selectPodcastHandler = (podcastId: string) =>
    dispatch({ type: SET_PODCAST_SELECTED, payload: podcastId });

  const setLoadingHandler = (value: boolean) =>
    dispatch({ type: SET_PODCAST_LOADING, payload: value });

  const contextValue: PodcastContextI = {
    podcastsList: state.podcastsList,
    selectedPodcast: state.selectedPodcast,
    loading: state.loading,
    selectPodcast: selectPodcastHandler,
    setLoading: setLoadingHandler,
  };

  console.log(contextValue);

  return (
    <PodcastContext.Provider value={contextValue}>
      {props.children}
    </PodcastContext.Provider>
  );
};

export default PodcastContextProvaider;
