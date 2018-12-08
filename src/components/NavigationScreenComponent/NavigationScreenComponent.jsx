import React from 'react';
import MapComponent from './MapComponent';
import LocationMapComponent from './LocationMapComponent';
import BaseScreenComponent from '../BaseScreenComponent';

import PlaceInfoCardComponent from './PlaceInfoCardComponent';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%'
  },
  map: {
    width: '100%',
    position: 'fixed',
    top: '56px',
  },
  placeInfo: {
    position: 'fixed',
    bottom: '61px',
    width: '100%',
  }
};


class NavigationScreenComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchActive: false,
    }
  }

  componentDidMount() {
    console.debug("Mounted");
    const { onLocationRequest } = this.props;

    onLocationRequest && onLocationRequest();
  }

  componentWillUnmount() {
    console.debug("Unmounting");
    const { onStopLocationWatch } = this.props;

    onStopLocationWatch && onStopLocationWatch();
  }

  onSearchbarEnable = (searchBar) => {
    this.searchBar = searchBar;

    this.setState({
      isSearchActive: true,
    });
  }

  onSearchbarDisable = (searchBar) => {
    this.searchBar = undefined;

    this.setState({
      isSearchActive: false,
    });
  }

  onBlur = (event) => {
    if (this.searchBar !== undefined) {
      this.searchBar.toggle();
    }
  }

  render() {
    const { classes, gpsLocation, placeInfo, isPlaceInfoLoading } = this.props;

    console.debug("IS LOADING", isPlaceInfoLoading);
    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
          <LocationMapComponent gpsLocation={gpsLocation} isPlaceInfoLoading={isPlaceInfoLoading} />
          {
            placeInfo && (
              <div className={classes.placeInfo}>
                <PlaceInfoCardComponent placeInfo={placeInfo} isPlaceInfoLoading={isPlaceInfoLoading} />
              </div>
            )
          }
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(styles)(NavigationScreenComponent);