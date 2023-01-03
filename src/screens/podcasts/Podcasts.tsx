import { useContext, useEffect, useState } from 'react';

import SearchBox from '../../components/searchBox/SearchBox';
import PodcastList from '../../components/podcastsList/PodcastsList';
import { PodcastContext } from '../../context/podcast-context';
import { PodcastEntryI } from '../../context/podcast-context.types';

const Podcasts = () => {
  const { podcastsList } = useContext(PodcastContext);
  const [search, setSearch] = useState<string>('');
  const [filteredPodcasts, setFilteredPodcasts] =
    useState<PodcastEntryI[]>(podcastsList);

  useEffect(() => {
    setFilteredPodcasts(podcastsList);
  }, [podcastsList]);

  const onSearchChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const searchText = event.currentTarget.value;
    setSearch(searchText);
    const filteredPodcasts = podcastsList.filter(podcast => {
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
