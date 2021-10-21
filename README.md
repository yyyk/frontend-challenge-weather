# Weather app

This project uses [React](https://reactjs.org/) with [Typescript](https://www.typescriptlang.org/), [Emotion](https://emotion.sh/) for styling, [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) for tests, and [OpenWeatherMap](https://openweathermap.org/) for weather data.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs necessary libraries for the project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test -- --coverage`

Launches the test runner in the interactive watch mode with coverage.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Technical notes

### `src/pages/Index.tsx`

This file is used to render the index page.
On the first render, weather card which corresponds to the current hour is selected and is scrolled into the view.

### `src/providers/SelectedWeather.tsx`

This React Context is used to store selected weather data globally.

### `src/utils/parseOpenWeatherMapData.ts`

`parseOpenWeatherMapData` function is used to parse the data fetched from __OpenWeatherMap 5 Days / 3 Hours Forecasts__ API.

- City name `Munich` is hardcoded here as `München` is used in the api call.
- Date for "Today" is selected based on the first date that contains weather data from 0:00 to 21:00, since the fetched data is dated as February 2017.
- Weather data from the API is set every 3 hours. To make 24 hour data, each data is duplicated for the next 2 missing hours.
- The constant `TODAY` is set because the weather on 2017-02-20 is only date that consists of `Clear` and `Clouds`, which svg icons are prepared.

### `src/setupProxy.js`

This is used to prevent CORS issue when OpenWeatherMap API is called.
