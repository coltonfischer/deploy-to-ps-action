# Deploy to PeopleSoft Action

A GitHub action to deploy web assets to PeopleSoft.

## Prerequisites

- This action requires the [Deploy to PeopleSoft Handler](https://github.com/coltonfischer/deploy-to-ps-handler) to be installed on the PeopleSoft system.

## Usage

1. Set up the PeopleSoft environment Integration Broker details as secrets in your repository settings using `IB_URL`, `NODE`, `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD`

2. Create a `.github/workflows/action.yml` file:

```yml
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy to PeopleSoft
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Deploy to PeopleSoft Step
        id: dps
        uses: coltonfischer/deploy-to-ps-action@v1.0.0
        with:
          FOLDER: 'dist'
          IB_URL: ${{ secrets.IB_URL }}
          NODE: ${{ secrets.NODE }}
          BASIC_AUTH_USERNAME: ${{ secrets.BASIC_AUTH_USERNAME }}
          BASIC_AUTH_PASSWORD: ${{ secrets.BASIC_AUTH_PASSWORD }}
```

## Inputs

|Input|  Description  |  Usage  |
|--------|---------------|-----------|
| FOLDER | Folder Name in Repo Containing the Files to Deploy | Optional (default `dist`) |
| IB_URL | Base Integration Broker URL - Ex: https://dev-ps.example.com | Required |
| NODE | Default Local Node| Required |
|  BASIC_AUTH_USERNAME | Basic Auth User ID for Integration Broker Service Operation| Required |
|BASIC_AUTH_PASSWORD | Basic Auth Password for Integration Broker Service Operation| Required |

## Supported File Types

- Only `.js`, `.css`, `.scss`, and `.html` file types will be deployed to PeopleSoft.
