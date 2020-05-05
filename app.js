const express = require("express");
const cors = require('cors')
const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;

const {JWT} = require('google-auth-library');
const keys = require('./conf/bigquery.json');

// middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

json_resp = {}

app.options("/bigquery_tokens", cors())
app.get("/bigquery_tokens", cors(), (req, res) => {
  const client = new JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/cloud-platform'],
  );

  client.authorize((err, response) => {
    if (err) {
      json_resp['error'] = err
    } else {
      json_resp['access_token'] = response.access_token;
    }
  });

  res.status(200).json(json_resp);
});
