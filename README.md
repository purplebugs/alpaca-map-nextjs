# alpaca-map-nextjs 🦙 🗺

Accessible Alpaca map app with search, React.js UI using Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Purpose 😊

Migrate from previous alpaca map app that was using [Create React App](https://github.com/facebook/create-react-app) and handcoded CSS to using [Next.js](https://nextjs.org/) and [tailwind css](https://tailwindcss.com/)

## Getting Started 🌱

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy app 🤖

### Auto deploy on push to main branch 🚀

- 👾 [beta.alpaca.life](beta.alpaca.life): App auto deploys on push to `main` branch -> to [Google Cloud Run](https://console.cloud.google.com/run/) `beta`

Check latest builds at [Google Cloud Build](https://console.cloud.google.com/cloud-build/)

#### Note: First time deployment setup ℹ️

- [Deploy from Source Code](https://cloud.google.com/run/docs/deploying-source-code#automate)
- Domain mapping was done within [Cloud Run > Domain mappings](https://console.cloud.google.com/run/domains)

#### Note: Command line deploy option ℹ️

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

## License 📝

The work is under exclusive copyright by default.
