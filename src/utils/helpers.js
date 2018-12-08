const defaultOptions = { timeout: 5000 };
const defaultOnError = (e) => {
    console.error("Geolocation error ", e);
}
const Helpers = {
    watchLocation: ({ onSuccess, onError = defaultOnError, options = {...defaultOptions}}) => {
        console.debug("Helpers.watchLocation: getting gps details");

        return navigator.geolocation.watchPosition((position) => {
            if (typeof position !== 'undefined') {
                onSuccess && onSuccess({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }
        }, (error) => {
            console.error("Watch Location Error ", error);
            onError && onError(error);

        }, options);
    },
    getCurrentLatLng: ({ onSuccess, onError, options = defaultOptions } = {}) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.debug("POSITION", position);
            if (typeof position !== 'undefined') {
                onSuccess && onSuccess({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }
        }, onError, options);
    },
    stopLocationWatch: ({ watchId }) => {
        console.log("Clearing watch id");
        navigator.geolocation.clearWatch(watchId);
    }
}


export default Helpers;