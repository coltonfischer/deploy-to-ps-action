# Deploy to PeopleSoft Action

A GitHub action to deploy web assets to PeopleSoft.  

Note: This action requires the [Deploy to PeopleSoft Handler](https://github.com/coltonfischer/deploy-to-ps-handler) to be installed on the PeopleSoft system.

Example Usage:
```
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

### Input Arguments

|Argument|  Description  |  Default  |
|--------|---------------|-----------|
| FOLDER | Folder Name in Repo Containing the Files to Deploy | dist |
| IB_URL | Base Integration Broker URL - Ex: https://dev-ps.example.com | _required_ Field |
| NODE | Default Local Node| _required_ Field |
|  BASIC_AUTH_USERNAME | Basic Auth User ID for Integration Broker Service Operation| _required_ Field |
|BASIC_AUTH_PASSWORD | Basic Auth Password for Integration Broker Service Operation| _required_ Field |

### Supported File Types

- Only `.js`, `.css`, `.scss`, and `.html` file types will be deployed to PeopleSoft.
