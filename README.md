# alpaca-map-nextjs 🦙 🗺

Accessible Alpaca map app with search, React.js UI using Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Purpose 😊

Migrate from previous alpaca map app

1. [Create React App](https://github.com/facebook/create-react-app) -> [Next.js](https://nextjs.org/)
2. Handcoded CSS -> [tailwind css](https://tailwindcss.com/)
3. Google map embedded in React -> Map as a web component in plain JS

## First time setup 🐣

See [First time setup](src/docs/README.init.md)

## Develop app 💻

Run the development server for auto-updates while editing

```bash
npm run dev
```

Start the app

```bash
npm run start
```

View at [http://localhost:3000](http://localhost:3000)

## Test app 🧪

Unit tests

```bash
npm run test
```

UI tests

```bash
npm run test-ui
```

Interactive mode

```bash
npm run test-ui -- --ui
```

## Deploy app 🤖

### Auto deploy on push to main branch 🚀

- 👾 [beta.alpaca.life](https://beta.alpaca.life): App auto deploys on push to `main` branch -> to [Google Cloud Run](https://console.cloud.google.com/run/) `beta`

Check latest builds at [Google Cloud Build](https://console.cloud.google.com/cloud-build/)

## License 📝

The work is under exclusive copyright by default.
