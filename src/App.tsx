import {Redirect, Route, Switch} from 'react-router-dom';

import Layout from './layouts/Layout';
import Podcasts from './screens/podcasts/Podcasts';
import PodcastDetail from './screens/podcastDetail/PodcastDetail';
import Episode from './screens/episode/Episode';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Podcasts />
          </Route>
          <Route path="/podcast/:podcastId" exact>
            <PodcastDetail />
          </Route>
          <Route path="/podcast/:podcastId/episode/:episodeId" exact>
            <Episode />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
