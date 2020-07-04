# Ledger App Store Front

## Requirements

[Node 8](https://nodejs.org/download/release/latest-dubnium/)
[Yarn](https://yarnpkg.com/en/docs/install)

## Development

To make sure this project works, you will need to run the [App Store Api](https://github.com/LedgerHQ/ledger-app-store-api) (check out the repo for informations on how to setup django superusers and database)

Once you have both setup and running, you can then start this project

```shell
$ git clone https://github.com/LedgerHQ/ledger-app-store-front
$ cd ledger-app-store-front
$ yarn # or $ npm install
$ echo "API_URL=<URL_where_the_api_runs>" > .env
$ yarn start # or $ npm start
```

Then navigate to `https://localhost:9000/`

## Tools

##### Extracting apps versions

Create a CSV file that list all apps versions depending on providers & firmwares

```
APP_STORE_TOKEN=<your-token> yarn extract-apps
```

nb: you can find your token in your browser network devtools when inspecting
the request you do to the API
