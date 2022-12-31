import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
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
  PodcastDetailLocationState,
  PodcastItemData,
} from './PodcastDetail.types';
import styles from './PodcastDetail.module.scss';
import { PodcastEpisode } from '../../components/episodesList/EpisodesList.types';

const Podcast = () => {
  const history = useHistory();
  const { podcastId } = useParams<{ podcastId: string }>();
  const { state: locationState } = useLocation<PodcastDetailLocationState>();
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);

  // TODO: Save podcastDetail to client

  useEffect(() => {
    const loadPodcastDetail = async () => {
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
            ...locationState.podcastEntry,
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
        }
        return; //TODO: Handle no results
      } catch (error) {
        httpErrorHandler(error);
      }
    };

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
          return;
        }
      }
    }

    loadPodcastDetail();
  }, [podcastId, locationState]);

  const onPodcastEpisodeClickHandler = (episode: PodcastEpisode) => {
    history.push(`/podcast/${podcastId}/episode/${episode.id}`, {
      podcastDetail: podcast,
      podcastEpisode: episode,
    });
  };

  if (!podcast) return <div>Loading...</div>;
  // TODO: Hide not published items

  return (
    <div className={styles.podcastDetail}>
      <PodcastSummary {...podcast} imgSource={podcast.image[2].label} />
      <section className={styles.podcastDetailContainer}>
        <Card>
          <EpisodesCounter counter={podcast.items.length} />
        </Card>
        <Card classes={styles.podcastDetailContainer}>
          <EpisodesList
            episodes={podcast.items}
            onClick={onPodcastEpisodeClickHandler}
          />
        </Card>
      </section>
    </div>
  );
};

export default Podcast;
