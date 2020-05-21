#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Request = require('request-promise');
const core = require('@actions/core');

require('dotenv').config({ silent: true });

const {
  FOLDER = core.getInput('FOLDER'),
  IB_URL = core.getInput('IB_URL'),
  NODE = core.getInput('NODE'),
  BASIC_AUTH_USERNAME = core.getInput('BASIC_AUTH_USERNAME'),
  BASIC_AUTH_PASSWORD = core.getInput('BASIC_AUTH_PASSWORD')
} = process.env;

const handleError = ({ message }) => {
  console.error(message);
  process.exit(1);
};

(async () => {
  const request = Request.defaults({
    headers: { 'User-Agent': 'request' },
    resolveWithFullResponse: true
  });

  const url = `${IB_URL}/PSIGW/RESTListeningConnector/${NODE}/CONTENT_DEFN.v1`;

  const authOptions = {
    user: BASIC_AUTH_USERNAME,
    pass: BASIC_AUTH_PASSWORD
  };

  const handleResponse = fileName => response => {
    if (response.statusCode !== 200) {
      throw Error(`Upload failed: ${response.body}`);
    }
    console.log(`Uploaded: ${fileName}`);
  };

  fs.readdirSync(FOLDER).forEach(item => {
    const extension = path.extname(item);

    switch (extension) {

      case '.css':
      case '.scss': {
        const fileName = item.replace(extension, '').toUpperCase();
        const styleContent = fs.readFileSync(`${FOLDER}/${item}`, 'utf8');
        const options = {
          method: 'POST',
          uri: `${url}/stylesheet/${fileName}`,
          body: styleContent,
          headers: { 'content-type': 'text/css' },
          auth: authOptions
        };

        request(options)
          .then(handleResponse(item))
          .catch(handleError);
        break;
      }

      case '.js': {
        const fileName = item.replace(extension, '_js').toUpperCase();
        const scriptContent = fs.readFileSync(`${FOLDER}/${item}`, 'utf8');
        const options = {
          method: 'POST',
          uri: `${url}/html/${fileName}`,
          body: scriptContent,
          headers: { 'content-type': 'application/javascript' },
          auth: authOptions
        };

        request(options)
          .then(handleResponse(item))
          .catch(handleError);
        break;
      }

      default:
      // Ignore
    }
  });
})().catch(handleError);