# DataStack Backend

This respository is a simple passthrough for bigquery token retrieval using a service account using [google-auth-library](https://www.npmjs.com/package/google-auth-library).

## Setup

1. Clone the repository
2. `npm install`
3. Follow [getting started with authentication](https://cloud.google.com/docs/authentication/getting-started) to set up and download service account credentials.
4. Save downloaded service account json config to `conf/bigquery.json`
5. `npm start`