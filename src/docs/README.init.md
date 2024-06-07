# First time setup 🐣

## Application 🦙 🗺️

1. Repo is cloned and installed `npm install`
1. Create `.env.local` file and add values

```
ELASTIC_CLOUD_ID="Add_me"
ELASTIC_API_KEY="Add_me" # Key for accessing Kibana on behalf of a user, not for deployment

```

## Build and deploy 🛠️

### GCP First time deployment setup ℹ️

Google Cloud Platform setup

1. Connect GitHub repo to Cloud Run as per [Automating building from source](https://cloud.google.com/run/docs/deploying-source-code#automate)
2. Domain mapping is done within [Cloud Run > Domain mappings](https://console.cloud.google.com/run/domains)

### Note: There is also a command line deploy option ℹ️

- Install gcloud CLI as per [Google docs](https://cloud.google.com/sdk/docs/install) or [Homebrew](https://formulae.brew.sh/cask/google-cloud-sdk)

- Initialise gcloud cli. Follow prompts to authenticate and set gcloud project

```
gcloud init
```

- Deploy the app

```
gcloud run deploy beta --source .
```

- Helpful commands

```
# list projects
gcloud projects list

# login
gcloud auth login

# set current project
gcloud config set project alpaca-maps
```

## Test 🧪

Install browsers for UI tests

```
npx playwright install --with-deps
```
