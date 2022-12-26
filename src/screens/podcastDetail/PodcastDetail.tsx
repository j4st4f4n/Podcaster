import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {parse as rssParse} from 'rss-to-json';

import {httpErrorHandler} from '../../helpers/helpers';
import {
  PodcastDetail,
  PodcastDetailReq,
  PodcastDetailLocationState,
  PodcastDetailItem,
} from './PodcastDetail.types';

const Podcast = () => {
  const history = useHistory();
  const {podcastId} = useParams<{podcastId: string}>();
  const {state: locationState} = useLocation<PodcastDetailLocationState>();
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);

  useEffect(() => {
    const loadPodcastDetail = async () => {
      try {
        const {data} = await axios.get(
          ` https://itunes.apple.com/lookup?id=${podcastId}`
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
            items: rssData.items.map((item: PodcastDetailItem) => ({
              ...item,
              id: uuidv4(),
            })),
          };
          setPodcast(newPodcastDetail);
        }
        return; //TODO: Handle no results
      } catch (error) {
        httpErrorHandler(error);
      }
    };

    loadPodcastDetail();
  }, [podcastId, locationState]);

  const onPodcastDetailClickHandler = (
    podcastDetailItem: PodcastDetailItem
  ) => {
    history.push(`/podcast/${podcastId}/episode/${podcastDetailItem.id}`, {
      podcastDetail: podcast,
      podcastEpisode: podcastDetailItem,
    });
  };

  if (!podcast) return <div>No podcast found</div>;

  return (
    <div>
      <img src={podcast.image[2].label} alt={podcast.name} />
      <div>{podcast.title}</div>
      <div>by {podcast.artist}</div>
      <div>Description: {podcast.description}</div>
      <div>Episodes: {podcast.items.length}</div>
      {podcast.items.map((item: PodcastDetailItem) => {
        // TODO: Hide not published items

        return (
          <div key={item.id}>
            <div onClick={() => onPodcastDetailClickHandler(item)}>
              {item.title}
            </div>
            <div>{item.published}</div>
            <div>{item.itunes_duration}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Podcast;
