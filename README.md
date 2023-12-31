# Weather-App

Weather App Created with the help Of HTML, CSS and JavaScript 
I have used Current Weather Data API which has access to current weather data for any location including over 200,000 cities
API_CALL --Latitude And Longitude API: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
         --City API: https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
         
appid	required --	Your unique API key (you can always find it on your account page under the "API key" tab)
lat, lon	required	Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API.


Example of API response--
{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}                        


![Grant Access](https://github.com/Ashish5692/Weather-App/assets/92576127/8aa94129-d016-46ac-9c15-ea39434f1ec3)         
  ![My Weather Page](https://github.com/Ashish5692/Weather-App/assets/92576127/ce77133c-f2fe-4d2e-b9e2-3e7871a4eeae)
![Search Weather](https://github.com/Ashish5692/Weather-App/assets/92576127/eba70df2-b4d1-427e-9428-0014c4527b08)

