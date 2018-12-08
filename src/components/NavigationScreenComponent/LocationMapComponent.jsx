import React from 'react'
import {
   Map,
   Marker,
   Popup,
   TileLayer,
  } from 'react-leaflet';

  import { withStyles } from '@material-ui/core/styles';
  import Button from '@material-ui/core/Button';
  
  const styles = theme => ({
    button: {
      position: 'fixed',
      top: '66px',
      right: '10px',
    },
  });


const RefreshButton = withStyles(styles)(({ children, classes, onClick }) => {
  return (  
    <Button variant="contained" className={classes.button} onClick={onClick}>
      { children }
    </Button>
  )
});

class LocationMapComponent extends React.Component {
  constructor (props) {
    super(props)
    const { gpsLocation } = props;

    const initialViewport = {
      center: [gpsLocation.lat-0.0005, gpsLocation.lng],
      zoom: 18,
    };

    this.state = {
      // viewport: initialViewport,
      lat: 51.505,
      lng: -0.09,
      zoom: 18,
      height: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { viewport } = this.state;
    
    if (!viewport) return;

    const lat = viewport.center[0];
    const lng = viewport.center[1];

    if (nextProps.gpsLocation.lat !== lat || nextProps.gpsLocation.lng !== lng) {
      const newViewport = {
        center: [nextProps.gpsLocation.lat-0.0005, nextProps.gpsLocation.lng],
        zoom: 18,
      };
      
      this.setState({
        viewport: newViewport,
      });
    }

  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window) {
      const physicalScreenHeight = window.screen.height;

      this.setState({
        height: physicalScreenHeight-112,
      });
    }
    
    this.onClickReset();
    // const { gpsLocation } = this.props;

    // const newViewport = {
    //   center: [gpsLocation.lat-0.0005, gpsLocation.lng],
    //   zoom: 17,
    // };

    // this.setState({
    //   viewport: newViewport,
    // });
  }

  onClickReset = () => {
    // Reset to position provided in props
    const { gpsLocation } = this.props;

    const viewport = {
      center: [gpsLocation.lat-0.0005, gpsLocation.lng],
      zoom: 18,
    };

    this.setState({ viewport })
  }

  onRefresh = () => {
    const { onLocationRequest } = this.props;

    // this.onClickReset();
    onLocationRequest && onLocationRequest();
  }

  onViewportChanged = (viewport) => {
    // The viewport got changed by the user, keep track in state
    // console.debug("VIEWPORT", viewport);
    this.setState({ viewport })
  }

  render () {
    const { gpsLocation, isPlaceInfoLoading } = this.props;
    const position = [gpsLocation.lat, gpsLocation.lng];
    const style = {
      height: `${this.state.height}px`
    };

    return (
        <React.Fragment>
          <Map 
            style={style}
            onClick={this.onClickReset}
            onViewportChanged={this.onViewportChanged}
            viewport={this.state.viewport}>
          >
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {
              isPlaceInfoLoading ? '' : (
                <Marker position={position}>
                  <Popup>
                    <span>This is your<br/>current location.</span>
                  </Popup>
                </Marker>
              )
            }
          </Map>
          <RefreshButton onClick={this.onRefresh}>
            Refresh
          </RefreshButton>
        </React.Fragment>
      )
  }
}

export default LocationMapComponent;