import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { parse as rssParse } from 'rss-to-json';

import PodcastSummary from '../../components/podcastSummary/PodcastSummary';
import Card from '../../components/card/Card';
import EpisodesCounter from '../../components/episodesCounter/EpisodesCounter';
import EpisodesList from '../../components/episodesList/EpisodesList';
import {
  getExpireTime,
  httpErrorHandler,
  oneDayTimeInMiliseconds,
} from '../../helpers/helpers';
import {
  PodcastDetail,
  PodcastDetailReq,
  PodcastItemData,
} from './PodcastDetail.types';
import styles from './PodcastDetail.module.scss';
import { PodcastEpisode } from '../../components/episodesList/EpisodesList.types';
import { PodcastContext } from '../../context/podcast-context';
import { PodcastEntryI } from '../../context/podcast.context.types';
import Episode from '../../components/episode/Episode';

// TODO: Responsive

const Podcast = () => {
  const history = useHistory();
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const { selectedPodcast, selectPodcast, setLoading } =
    useContext(PodcastContext);
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const [episode, setEpisode] = useState<PodcastEpisode>();

  useEffect(() => {
    if (!episodeId) setEpisode(undefined); // Clean up
    if (!selectedPodcast && podcastId) selectPodcast(podcastId);

    if (podcast && episodeId) {
      // This will only worck when PodcastDetail is save in the user browser data since episodeId is not supplied.
      const selectedEpisode = podcast.items.find(
        episode => episode.id === episodeId
      );
      if (selectedEpisode) {
        setEpisode(selectedEpisode);
      }
    }
  }, [podcastId, episodeId, selectedPodcast, podcast, selectPodcast]);

  useEffect(() => {
    const loadPodcastDetail = async (selectedPodcast: PodcastEntryI) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_CORS_ANYWHERE_URL}/https://itunes.apple.com/lookup?id=${podcastId}`
        );
        const podcastDetailReq: PodcastDetailReq = data;

        if (podcastDetailReq.resultCount > 0) {
          // Will use the first result.
          const feedUrl = podcastDetailReq.results[0].feedUrl;
          // Will use this url to excract the podcastDetailData

          const rssData = await rssParse(
            `${process.env.REACT_APP_CORS_ANYWHERE_URL}/${feedUrl}`
          );

          // TODO: For some reason feedUrl>items don't have an id
          const newPodcastDetail: PodcastDetail = {
            ...selectedPodcast,
            title: rssData.title,
            description: rssData.description,
            items: rssData.items.map((item: PodcastEpisode) => ({
              ...item,
              id: uuidv4(),
            })),
          };

          const newPodcastItemData: PodcastItemData = {
            ...newPodcastDetail,
            expiration: getExpireTime(oneDayTimeInMiliseconds),
          };
          const storedItemsData = localStorage.getItem('podcastsItemsData');

          if (!storedItemsData) {
            localStorage.setItem(
              'podcastsItemsData',
              JSON.stringify([newPodcastItemData])
            );
          } else {
            const storedItems = JSON.parse(storedItemsData);
            localStorage.setItem(
              'podcastsItemsData',
              JSON.stringify([...storedItems, newPodcastItemData])
            );
          }

          setPodcast(newPodcastDetail);
          setLoading(false);
        }
        setLoading(false);
        return; //TODO: Handle no results
      } catch (error) {
        httpErrorHandler(error);
        setLoading(false);
      }
    };

    if (selectedPodcast && podcastId) {
      setLoading(true);
      // Check podcastDetalItem on localStorage and has not expired
      const preloadedDetailsData = localStorage.getItem('podcastsItemsData');

      if (preloadedDetailsData) {
        const preloadedDetails: PodcastItemData[] =
          JSON.parse(preloadedDetailsData);

        const preloadedDetailsItem = preloadedDetails.find(
          detail => detail.id === podcastId
        );

        if (preloadedDetailsItem) {
          const hasExpired =
            new Date().getTime() > preloadedDetailsItem?.expiration;
          if (!hasExpired) {
            setPodcast(preloadedDetailsItem);
            setLoading(false);
            return;
          }
        }
      }

      loadPodcastDetail(selectedPodcast);
    }
  }, [podcastId, selectedPodcast, selectPodcast, setLoading]);

  const onPodcastEpisodeClickHandler = (episode: PodcastEpisode) => {
    history.push(`/podcast/${podcastId}/episode/${episode.id}`, {
      podcastDetail: podcast,
      podcastEpisode: episode,
    });
  };

  if (!podcast) return <div></div>;
  // TODO: Hide not published items

  return (
    <div className={styles.podcastDetail}>
      <PodcastSummary {...podcast} imgSource={podcast.image[2].label} />
      <section className={styles.podcastDetailContainer}>
        <Card>
          <EpisodesCounter counter={podcast.items.length} />
        </Card>
        {episode ? (
          <Episode episode={episode} />
        ) : (
          <Card classes={styles.podcastDetailContainer}>
            <EpisodesList
              episodes={podcast.items}
              onClick={onPodcastEpisodeClickHandler}
            />
          </Card>
        )}
      </section>
    </div>
  );
};

export default Podcast;
