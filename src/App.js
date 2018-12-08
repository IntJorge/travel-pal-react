import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";

import NavigationScreenContainer from './screens/NavigationScreenContainer';
import CurrencyScreenContainer from './screens/CurrencyScreenContainer';
import WeatherScreenContainer from './screens/WeatherScreenContainer';

import AppBarComponent from './components/AppBarComponent';
import BottomNavigationComponent from './components/BottomNavigationComponent';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import appRoutes from './routes';
import { store } from './configureStore';
import {
  appDeviceReady,
} from './actions/globals';

import AlertPortalContainer from './containers/AlertPortalContainer';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const MainCmp = withStyles(styles)((props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <AppBarComponent routes={appRoutes} />
          <Switch>
            <Route exact path="/" component={NavigationScreenContainer} />
            <Route path="/currency" component={CurrencyScreenContainer} />
            <Route path="/weather" component={WeatherScreenContainer} />
          </Switch>
          <BottomNavigationComponent routes={appRoutes}/>
        </Grid>
      </Grid>
      <AlertPortalContainer />
    </div>
  )
});

class MainApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (typeof store !== 'undefined' && store && typeof store.dispatch === 'function')
      store.dispatch(appDeviceReady());
  }

  render() {
    return (
      <Provider store={store}>
        {/* <App params={f7params}>
          <Statusbar />
          <View id="main-view" url="/home/" main className="ios-edges"/>
        </App> */}
        <HashRouter>
          <MainCmp />
        </HashRouter>
      </Provider>
    );
  }
}

export default MainApp;