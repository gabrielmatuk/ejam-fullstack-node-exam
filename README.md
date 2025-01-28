# Turbo Monorepo

Install all dependencies:

```bash
pnpm install
```

Start the backend

```bash
docker compose up --build -d
```

Start as development mode:

```bash
pnpm dev
```

For lint only use the command:

```bash
pnpm lint
```

For test open the API folder and follow the instructions in the README.md

> [!IMPORTANT]
> For detailed info check each apps README.md

> [!WARNING]
> If you want to test the backend avoid to use docker. You can change the package.json and change the dev script from "start:dev": "nest start --watch" to "dev": "nest start --watch",
