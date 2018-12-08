
import React, { Component } from 'react';
import Leaflet from 'leaflet';

import Helpers from '../../utils/helpers';
import ApiHelpers from '../../utils/api';


export default class MapComponent extends Component {
  constructor(props) {
      super(props);

      this.locationData = null;
  }

  componentDidMount() {
    this.map = Leaflet.map('map').fitWorld();

    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9yZ2VpMDI0IiwiYSI6ImNqb2RncW5pbjFkaW0za29qMG1rMGlzanQifQ.96uFcGovHvXXegmXBV62Gg'
    }).addTo(this.map);

    const marker = Leaflet.marker([51.5, -0.09]).addTo(this.map);
    const currCoords = Leaflet.latLng(53.386848,-6.068040);
    const radius = 100 / 2;
    this.map.setView(currCoords, 16, { maxZoom: 16 });
    this.mainMarker = Leaflet.marker(currCoords).addTo(this.map);
    this.mainCircle = Leaflet.circle(currCoords, radius).addTo(this.map);
    this.watchLocation();
  }

  componentWillUnmount() {
      console.debug("Stopping location watch", this.locationWatchId);
    Helpers.stopLocationWatch({
        watchId: this.locationWatchId,
    });
  }

  getLocationInfo = ({ lat, lng }) => {
      const self = this;
    ApiHelpers.getLocationDetails({ 
        lat, 
        lng,
        onSuccess: (data) => {
            console.log("Location Data", data);
            self.locationData = { ...data };
        }, 
        onError: () => {},
    });
  }

  watchLocation = () => {
    const geolocationSuccess = (position) => {
        if (this.map !== undefined && this.map) {
            const { accuracy, latitude, longitude } = position.coords;
            const currCoords = Leaflet.latLng(latitude, longitude);
            const radius = accuracy / 2;

            this.map.setView(currCoords, 16, { maxZoom: 16 });
            this.mainMarker.setLatLng(currCoords);
            this.mainCircle.setLatLng(currCoords);

            this.getLocationInfo({ lat: latitude, lng: longitude });
        }
    };

    const geolocationError = (message) => {
        navigator.notification.alert(
            message,  // message
            () => {},         // callback
            'Geolocation Error',            // title
            'Dismiss'                  // buttonName
        );
    };

    this.locationWatchId = Helpers.watchLocation({
        onSuccess: geolocationSuccess,
        onError: geolocationError,
    });
  }

  render() {
    return (
        <React.Fragment>     
            <div id="map"></div>
        </React.Fragment>
    )
  }
}