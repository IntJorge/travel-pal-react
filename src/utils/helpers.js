const defaultOptions = { enableHighAccuracy: true };
const defaultOnError = (e) => {
    console.error("Geolocation error ", e);
}
const Helpers = {
    watchLocation: ({ onSuccess, onError = defaultOnError, options = {...defaultOptions}}) => {
        return navigator.geolocation.watchPosition((position) => {
            if (typeof position !== 'undefined') {
                onSuccess && onSuccess({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }
        }, (error) => {
            console.error("Watch Location Error ", error);

        }, options);
    },
    getCurrentLatLng: ({ onSuccess, onError, options = {}} = {}) => {
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