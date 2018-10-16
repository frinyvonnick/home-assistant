# home-assistant

> Home assistant for raspberry-pi with touchscreen

#### Build Setup

The project use yarn instead of npm for everything :wink:

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn run dev

# build electron application for production
yarn run build


# lint all JS/Vue component files in `src/`
yarn run lint
```

#### Hardware requirements

Here you can find a [list of hardwares needed](http://amzn.eu/4sU9x1x) to run the project.

#### Environment variables

Required env variables :

```
CITY_CODE
WEATHER_API_KEY
```

To get the weather API key, you must signup [here](https://openweathermap.org) and go to the API keys section.  
You can get your city code [here](http://bulk.openweathermap.org/sample/city.list.json.gz).

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[9add6ff](https://github.com/SimulatedGREG/electron-vue/tree/9add6ff4d47eaf8fb9f04efd0aca7be4dc6fb69d) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
