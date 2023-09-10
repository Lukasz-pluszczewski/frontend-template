Frontend template using React, Mantine, Vite, and Vitest

## template script
To quickly fill the project name, app title, version etc. install dependencies and run:
```bash
bun template.js
```

## Start the app
```bash
bun dev
```

## Config in dev environment
Create a `.env` file:
```
VITE_API_URL=http://localhost:3000
```
or just set required env variables

## Config in production environment
If envs are correctly defined both in config.ts file and in start.sh script, set the env variables when running the container (without VITE_prefix, e.g. `API_URL=http://localhost:3000`)

### Usage with node
If you use node instead of [bun](https://bun.sh/), replace `bun` with `npm`
