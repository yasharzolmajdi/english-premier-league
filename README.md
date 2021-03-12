# English Premier League

[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)](https://yash-english-premier-league.herokuapp.com/)

This project is intended to show the usage of next js with SSR and graphql. The web app contains 2 pages, one allows to seach and filter for players while the other shows the teams in premier league based on live data from [APIfootball](https://apifootball.com/).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. `$ git clone https://github.com/yasharzolmajdi/english-premier-league.git`
1. `$ cd english-premier-league`
1. `$ yarn install`

## Usage

`APIFOOTBALL_KEY` environment variable needs to be set, you can get the API key from [APIfootball](https://apifootball.com/).

### Production

1. `$ yarn build`
1. `$ yarn start`

### Development

1. `$ yarn dev`

NOTE: After update of the GraphQL queries you will have to run `$ yarn apollo` to update all generated typescript interfaces.