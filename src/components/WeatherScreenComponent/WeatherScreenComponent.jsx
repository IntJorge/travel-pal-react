import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Grid';
import WeatherTableComponent from './WeatherTableComponent';
import WeatherItemComponent from './WeatherItemComponent';
import changeCase from 'change-case';

const styles = {
  root: {
    width: '100%',
  },
  content: {
    width: '100%',
    paddingTop: '56px',
    paddingBottom: '66px',
  },
  title: {
    color: '#3f51b5',
    padding: '5px',
    textAlign: 'center',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  subTitle: {
    color: '#3f51b5',
    padding: '5px',
    textAlign: 'center',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  icon: {
    textAlign: 'center',
  },
};


class WeatherScreenComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onWeatherRequest } = this.props;

    // onWeatherRequest && onWeatherRequest();
  }
  
  render() {
    const { classes, weather, isPlaceInfoLoading, isWeatherInfoLoading } = this.props;
    const { toEnum = {}, info = {} } = weather;
    // console.debug("WEATHER", weather);

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
          {
            (!isWeatherInfoLoading) && (
              <div className={classes.content}>
                <h1 className={classes.title}>Weather in { info.place }</h1>
                <h5 className={classes.icon}><img src={info.iconUrl} /></h5>
                <h4 className={classes.subTitle}>{ info.description }</h4>
                <h4 className={classes.subTitle}>{ info.date }</h4>
                {
                  Object.keys(toEnum).map(key => {
                    const name = changeCase.upperCaseFirst(key);

                    return (
                      <WeatherItemComponent key={name} name={name} value={toEnum[key]} />
                    )
                  })
                }
                {/* <WeatherTableComponent /> */}
              </div>
            )
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(WeatherScreenComponent);