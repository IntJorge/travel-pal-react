import axios from 'axios';
import changeCase from 'change-case';

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
};

const destructureWeatherData = ({ data }) => {
    const { dt, name, main, sys, weather, wind } = data;

    const date = new Date(dt*1000);
    const sunriseDate = new Date(sys.sunrise*1000).toLocaleTimeString();
    const sunsetDate = new Date(sys.sunset*1000).toLocaleTimeString();

    return {
        info: {
            date: `${date.toDateString()} ${date.toLocaleTimeString()}`,
            place: `${name}, ${sys.country}`,
            description: changeCase.upperCaseFirst(`${weather[0].description}`),
            iconUrl: `https://openweathermap.org/img/w/${weather[0].icon}.png`
        },
        toEnum: {
            humidity: `${main.humidity}%`,
            pressure: `${main.pressure} hpa`,
            temp: `${main.temp}°C`,
            wind: `${wind.speed} m/s`,
            sunriseDate,
            sunsetDate,
        },
    };
}

const ApiHelper = {
    getLocationDetails: ({ lat, lng, onSuccess, onError }) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&pretty=1&key=989ee4805561447581b22953c18a3e7b`)
        .then(function (response) {
            // handle success
            // console.debug("Opencage", response);
            onSuccess && onSuccess(destructureLocData({ data: response.data }));

        })
        .catch(function (error) {
            // handle error
            console.error(error);

            onError && onError(error);
        });
    },
    getRates: ({ from = 'USD', to = 'EUR', onSuccess, onError }) => {
        try {    
            return axios.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
            .then((response) => {
                // handle success
                console.error(response);
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
    },
    getWeather: ({ lat, lng, onSuccess, onError }) => {
        try {
            axios.get(`https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&lat=${lat}&lon=${lng}&units=metric`)
            .then((response) => {
                // console.debug("OpenWeather", response);
                const weatherData = destructureWeatherData({ data: response.data });

                onSuccess && onSuccess(weatherData);
            })
            .catch((error) => {
                console.error("Axios getWeather Error", error);
                onError && onError(error);
            })
        } catch (error) {
            console.error("ApiHelper.getWeather Error", error);
        }
    }
};


export default ApiHelper;