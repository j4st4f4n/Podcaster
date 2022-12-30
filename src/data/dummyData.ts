import { PodcastSummaryProps } from '../components/podcastSummary/PodcastSummary.types';
import { PodcastEntryI } from '../screens/podcasts/Podcasts.types';

export const DUMMY_SUMMARY: PodcastSummaryProps = {
  imgSource:
    'https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/170x170bb.png',
  name: 'Caresha Please',
  title: 'Caresha Please',
  artist: 'REVOLT',
  description: `Host Yung Miami (of City Girls' fame) welcomes the biggest names in Hip Hop and entertainment for wild and unfiltered conversations about their lives, careers, relationships, and much more. Caresha Brownlee (Yung Miami) is a famous singer, musician, entrepreneur, model, social media star, and Internet sensation from Miami, FL. She is sure to get people talking and bring some surprises with fun, no holds barred interviews.`,
};

export const DUMMY_ENTRY: PodcastEntryI = {
  id: '1628914491',
  name: 'Caresha Please',
  title: 'Caresha Please - REVOLT',
  artist: 'REVOLT',
  image: [
    {
      height: '55',
      label:
        'https://is3-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/55x55bb.png',
    },
    {
      height: '60',
      label:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/60x60bb.png',
    },
    {
      height: '170',
      label:
        'https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/170x170bb.png',
    },
  ],
};

export const DUMMY_PODCASTS: PodcastEntryI[] = [
  {
    id: '1633466636',
    name: 'Angie Martinez IRL',
    title: 'Angie Martinez IRL - iHeartPodcasts',
    artist: 'iHeartPodcasts',
    image: [
      {
        height: '55',
        label:
          'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/dd/2a/ac/dd2aacbf-f784-7ff2-94f9-939c923c98b8/mza_15448115337081593321.jpg/55x55bb.png',
      },
      {
        height: '60',
        label:
          'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/dd/2a/ac/dd2aacbf-f784-7ff2-94f9-939c923c98b8/mza_15448115337081593321.jpg/60x60bb.png',
      },
      {
        height: '170',
        label:
          'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/dd/2a/ac/dd2aacbf-f784-7ff2-94f9-939c923c98b8/mza_15448115337081593321.jpg/170x170bb.png',
      },
    ],
  },
  {
    id: '1535809341',
    name: 'The Joe Budden Podcast',
    title: 'The Joe Budden Podcast - The Joe Budden Network',
    artist: 'The Joe Budden Network',
    image: [
      {
        height: '55',
        label:
          'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/08/4c/5b/084c5b07-d5fd-e1aa-4762-d4369d7f1e4e/mza_1271598091786917531.jpeg/55x55bb.png',
      },
      {
        height: '60',
        label:
          'https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/08/4c/5b/084c5b07-d5fd-e1aa-4762-d4369d7f1e4e/mza_1271598091786917531.jpeg/60x60bb.png',
      },
      {
        height: '170',
        label:
          'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/08/4c/5b/084c5b07-d5fd-e1aa-4762-d4369d7f1e4e/mza_1271598091786917531.jpeg/170x170bb.png',
      },
    ],
  },
];
