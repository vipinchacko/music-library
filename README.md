# Music Library

## Available Scripts

### `yarn install` - Installs all dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs all the tests and displays test coverage information. (Has 100% test coverage)

### `yarn build`

Builds the app for production to the `build` folder.

## Features present in music library app

- Displays all albums returned from this [endpoint](https://itunes.apple.com/us/rss/topalbums/limit=100/json)
- Clicking on any album shows additonal information regarding that album and clicking again hides the additional information.
- Sidebar has the following filters
  - search input that allows to search by artist or album name
  - date filters to filter by release date
  - category dropdown to filter by category
- The implementation is responsive for all screen sizes. This has been accomplished using media queries. No additional frameworks were used.
- On smaller screen sizes, the sidebar is initially hidden and shows up on clicking the filter icon on the top right side.
- React hooks has been used to build the app. No class components have been used
- The codebase has 100% test coverage
- Create React App was used to get a boiler plate for the application.
