import axios from 'axios';
import { useEffect, useState } from 'react';

import { PodcastsData, PodcastEntryI } from './Podcasts.types';
import {
  getExpireTime,
  httpErrorHandler,
  oneDayTimeInMiliseconds,
  simplifyRequestPodcastsEntry,
} from '../../helpers/helpers';
import SearchBox from '../../components/searchBox/SearchBox';
import PodcastList from '../../components/podcastsList/PodcastsList';

const Podcasts = () => {
  const [search, setSearch] = useState<string>('');
  const [podcasts, setPodcasts] = useState<PodcastEntryI[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<PodcastEntryI[]>([]);

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
        setFilteredPodcasts(entries);
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
      if (!hasExpired) {
        setPodcasts(preloadedPodcasts.podcasts);
        setFilteredPodcasts(preloadedPodcasts.podcasts);
        return;
      }
    }
    loadPodcasts();
  }, []);

  const onSearchChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const searchText = event.currentTarget.value;
    setSearch(searchText);
    const filteredPodcasts = podcasts.filter(podcast => {
      return (
        podcast.title.toLowerCase().includes(searchText.toLowerCase()) ||
        podcast.artist.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredPodcasts(filteredPodcasts);
  };

  return (
    <div>
      <SearchBox
        resultsNumber={filteredPodcasts.length}
        value={search}
        onSearchChangeHandler={onSearchChangeHandler}
      />
      <PodcastList podcasts={filteredPodcasts} />
    </div>
  );
};

export default Podcasts;
