Frontend template using React, Mantine, Vite, and Vitest

## template script
To quickly fill the project name, app title, version etc. install dependencies and run:
```bash
node template.js
```

## Start the app
```bash
npm run dev
```

## Config in dev environment
Create a `.env` file:
```
VITE_API_URL=http://localhost:3000
```
or just set required env variables

## Config in production environment
If envs are correctly defined both in config.ts file and in start.sh script, set the env variables when running the container (without VITE_prefix, e.g. `API_URL=http://localhost:3000`)
