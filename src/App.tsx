import {Redirect, Route, Switch} from 'react-router-dom';

import Podcasts from './screens/podcasts/Podcasts';
import Layout from './layouts/Layout';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Podcasts />
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
