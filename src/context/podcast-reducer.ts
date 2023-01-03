import { PodcastContextState } from './podcast-context.types';

export const SET_PODCAST_LIST = '[PODCAST] Set selected podcast list.';
export const SET_PODCAST_SELECTED = '[PODCAST] Set selected list podcast item.';
export const SET_PODCAST_LOADING = '[PODCAST] Set podcast loading.';

export const podcastReducerInitialState: PodcastContextState = {
  podcastsList: [],
  selectedPodcast: undefined,
  loading: false,
};

export const podcastReducer = (
  state: PodcastContextState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_PODCAST_LIST:
      return { ...state, podcastsList: action.payload, loading: false };
    case SET_PODCAST_SELECTED:
      return {
        ...state,
        selectedPodcast: state.podcastsList.find(
          podcast => podcast.id === action.payload
        ),
        loading: false,
      };
    case SET_PODCAST_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
