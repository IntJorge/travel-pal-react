import React from 'react'
import {
   Map,
   Marker,
   Popup,
   TileLayer,
   Circle,
   FeatureGroup,
   LayerGroup,
   LayersControl,
   Overlay,
   Rectangle, } from 'react-leaflet';


class LocationMapComponent extends React.Component {
  constructor (props) {
    super(props)
    const { gpsLocation } = props;

    const initialViewport = {
      center: [gpsLocation.lat-0.0005, gpsLocation.lng],
      zoom: 18,
    };

    this.state = {
      viewport: initialViewport,
      lat: 51.505,
      lng: -0.09,
      zoom: 18,
      height: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { gpsLocation } = this.props;
    
    if (nextProps.gpsLocation.lat !== gpsLocation.lat || nextProps.gpsLocation.lng !== gpsLocation.lng) {
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
    
    // const { gpsLocation } = this.props;

    // const newViewport = {
    //   center: [gpsLocation.lat-0.0005, gpsLocation.lng],
    //   zoom: 18,
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

  onViewportChanged = (viewport) => {
    // The viewport got changed by the user, keep track in state
    console.debug("VIEWPORT", viewport);
    this.setState({ viewport })
  }

  render () {
    const { gpsLocation, isPlaceInfoLoading } = this.props;
    
    const center = [gpsLocation.lat-0.0005, gpsLocation.lng]
    const position = [gpsLocation.lat, gpsLocation.lng]

    const style = {
      height: `${this.state.height}px`
    };

    const zoom = isPlaceInfoLoading ? 17 : 18;


    return (
        <Map 
          style={style} 
          center={center} 
          zoom={zoom}
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
      )
  }
}

export default LocationMapComponent;