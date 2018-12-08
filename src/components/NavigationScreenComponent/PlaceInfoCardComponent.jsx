import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ContentLoader, { List } from 'react-content-loader';

const styles = {
  card: {
      margin: '20px',
      marginBottom: '15px',
  },
  loader: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const PlaceInfoCardComponent = ({ classes, placeInfo = {}, isPlaceInfoLoading = false, }) => {
  const bull = <span className={classes.bullet}>•</span>;

  const { city, city_district, country, postcode, road } = placeInfo;
  return (
    <Card className={classes.card}>
        {
          isPlaceInfoLoading ? (
            <div className={classes.load}>
              <ContentLoader style={{ width: '100%', margin: '10px', }}>
                  <rect x="0" y="0" rx="3" ry="3" width="50%" height="15" />
                  <rect x="0" y="35" rx="3" ry="3" width="90%" height="15" />
                  <rect x="0" y="60" rx="3" ry="3" width="90%" height="15" />
                  <rect x="0" y="85" rx="3" ry="3" width="200" height="15" />
                  <rect x="0" y="110" rx="3" ry="3" width="80%" height="25" />
              </ContentLoader>
            </div>
          )
          : 
          ( 
            <React.Fragment>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" variant="overline" gutterBottom>
                  Current Location
                </Typography>
                
                <Typography variant="h6" component="h2">
                  { road }
                </Typography>
                
                <Typography variant="h6" component="h2">
                  { city_district }
                </Typography>
                <Typography variant="h6" component="h2">
                  {
                    !city ? `${country || ''}` : `${city || '--'}, ${country || '--'}`
                  }
                </Typography>
                
                <Typography color="textSecondary" variant="h5" component="h2">
                  { postcode }
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
          </React.Fragment>
          )
        }
    </Card>
  );
}

PlaceInfoCardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceInfoCardComponent);