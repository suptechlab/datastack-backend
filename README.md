# DataStack Backend

This respository is a simple passthrough for bigquery token retrieval using a service account using [google-auth-library](https://www.npmjs.com/package/google-auth-library).

## Setup

1. Clone the repository
2. `npm install`
3. Follow [getting started with authentication](https://cloud.google.com/docs/authentication/getting-started) to set up and download service account credentials.
4. Save downloaded service account json config to `conf/bigquery.json`
5. `npm start`

## BigQuery Config

### Steps to Create an Auth Token

1. Create Service User in Google Cloud Console UI, e.g. either via

    - Clicking "add" in web [dashboard](https://console.cloud.google.com/iam-admin/serviceaccounts/)

    - Running gcloud command: `gcloud iam service-accounts create {{some-account-name}} --display-name "{{My Service Account}}"`

2. Make sure the Service User has "BiqQuery Job User" and "BigQuery Data Viewer" permissions in IAM:

    ```{bash}
    gcloud projects add-iam-policy-binding {{project-slug}} \
    --member serviceAccount:{{service account address}} \
    --role roles/bigquery.dataViewer
    --role roles/bigquery.jobUser
    ```

3. Create key and download credentials key.json: `gcloud iam service-accounts keys create --iam-account my-iam-account@somedomain.com key.json`

4. Generate an access token: `gcloud auth activate-service-account --key-file ~/Downloads/key.json`

5. Copy the access token: `gcloud auth print-access-token | pbcopy`

6. Test a query:

```{bash}
curl --request POST \
  'https://bigquery.googleapis.com/bigquery/v2/projects/{{INSERT PROJECT NAME HERE}}/queries?prettyPrint=true' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {{INSERT SERVICE USER ACCESS TOKEN HERE]}' \
  --data '{"query":"SELECT CONCAT(year, "-", LPAD(CAST(month AS STRING), 2, "0"), "-01") AS `date`, num_atm_transactions, val_naira_billion_atm_transactions FROM nigeria_demo.payment_system_statistics ORDER BY year, month LIMIT 10;"}' \
  --compressed
```

### Example

`gcloud auth activate-service-account --key-file ~/Downloads/nfs-maps-dcac98cfd0e1.json`

`gcloud auth print-access-token | pbcopy`

```{bash}
curl --request POST \
  'https://bigquery.googleapis.com/bigquery/v2/projects/nfs-maps/queries?prettyPrint=true' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer ya29.c.KpYBxAfI7iaC8eksFMwhiLT27DS1nVGO_tKnpJmnWJSr9n1cl1wTPVFn2hPIZ8oElpG2a0uINcpbR7an2vFF8iC7tux16CK9cPekcTjQULBl5JMz0LFAj1Qv9AK7utqGvKrQjLyZ_Mx5hJbOKCXMFHdPhhPJ-gGX0hN1HMp8K1sGa5iv-UK8j0bRaWZmuYTuhs2cEj3mNGem' \
  --data '{"query":"SELECT CONCAT(year, "-", LPAD(CAST(month AS STRING), 2, "0"), "-01") AS `date`, num_atm_transactions, val_naira_billion_atm_transactions FROM nigeria_demo.payment_system_statistics ORDER BY year, month LIMIT 10;"}' \
  --compressed
```

### Other Commands

List service acccounts: `gcloud iam service-accounts list`
List keys for a service account: `gcloud iam service-accounts keys list --iam-account {{email field from service account list}}`

