# Transactions Demo

Transactions Demo is a POC of an app where you can see a large list of bank transactions
## Prerequisites
- yarn
- node v16
- docker daemon started

## Installation
It`s as simple as (hopefully :) ):
```bash
yarn setup
```
This will:
- Install all the node_modules needed for the app to start

- Create a postgresql database in a docker container.

- Migrate and seed the database with the .csv files from github. (*Notice that the files are not downloaded, but parsed directly from the github source)

The whole process should take less than 5 minutes.

## Usage

```bash
yarn start
```
By default the app will be available on http://localhost:3000 (Backend is by default on :4000)
