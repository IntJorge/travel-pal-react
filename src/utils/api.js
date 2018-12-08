import axios from 'axios';

const destructureLocData = ({ data }) => {
    const res = data.results.length > 0 ? data.results[0] : null;

    if (!res) return null;

    const { annotations, components } = res;

    return {
        city: components.city,
        city_district: components.city_district,
        country: components.country,
        country_code: components.country_code,
        road: components.road,
        postcode: components.postcode,
        currency_code: annotations.currency.iso_code,
        currency: annotations.currency.name,
        currency_symbol: annotations.currency.symbol,
    };
}

const ApiHelper = {
    getLocationDetails: ({ lat, lng, onSuccess, onError }) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&pretty=1&key=989ee4805561447581b22953c18a3e7b`)
        .then(function (response) {
            // handle success
            console.debug("Opencage", response);

            onSuccess && onSuccess(destructureLocData({ data: response.data }));

        })
        .catch(function (error) {
            // handle error
            console.log(error);

            onError && onError(error);
        });
    },
    getRates: ({ from = 'USD', to = 'EUR', onSuccess, onError }) => {
        try {    
            return axios.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
            .then((response) => {
                // handle success
                console.log(response);
                const rates = 1;
                
                if (!response.data || !response.data.rates) {
                    throw new Error("No rates found.");
                }
                
                return response.data.rates[to];
                // onSuccess && onSuccess(response.data.rates[to]);

            })
            .catch(function (error) {
                // handle error
                console.error(error);

                //onError && onError(error);
            });
        } catch (error) {
            console.error(error);

            // onError && onError(error);
        }
    }
};


export default ApiHelper;