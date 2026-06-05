# Paketdobra

Simple guide to run the project locally with the included JSON Server.

## Prerequisites

- Node.js (recommended >= 18)
- npm (comes with Node.js) or yarn

## Quick start

1. Clone the repository (replace the URL with the project repo):

```bash
git clone https://github.com/ar-rud/paket_dobra.git
cd paket_dobra
```

2. Create a local environment file from the example and set values if needed:

```bash
cp .env.example .env
```

then edit `.env` to adjust `VITE_API_URL` or other variables

3. Install dependencies:

```bash
npm install
```

## Run the site

Start and the Vite dev server and the JSON Server.

```bash
npm run dev:full
```

## Format code

Use Prettier to format the whole repository:

```bash
npm run format
```

To check formatting without changing files, run:

```bash
npm run format:check
```

## Script for placeholders generation

Run in the terminal

```bash
node generate-images.js
```

### Remarks

In catalog most populated category of products is "Хобі та розваги".

It displayes 6 items per page to demonstrate the pagination functionality and in the same time not clutter db with too much products.
