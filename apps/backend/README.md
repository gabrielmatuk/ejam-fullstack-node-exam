# EJam - Full Stack

## What this implementation is about:

This is the backend implementation of the EJam project. It is a REST API that provides endpoints to create and list superheroes.

## API Structure:

> [!WARNING]
> All endpoints are protected by a bearer token. You must provide a valid token to access the endpoints.

| HTTP METHOD  | POST        | GET         | PUT    | DELETE |
| ------------ | ----------- | ----------- | ------ | ------ |
| CRUD OP      | CREATE      | READ        | UPDATE | DELETE |
| /superheroes | Ok (201) 🔒 | Ok (200) 🔒 | N/A    | N/A    |

## About tests

The tests are implemented using Jest. They are located in the `test` folder.
I choiced to use Jest because it is a very popular test framework for Node.js applications and it is very easy to use!
I don't follow the TDD methodology for this project, instead I wrote the tests after the implementation of the endpoints.
I developed only unit tests for the endpoints.
You can run the tests using the command:

```bash
pnpm run test
```

## How to start

It is very simple to start the application. You just need to run the command:

> [!WARNING]
> Don't forget to install the depedencies!.

On root folder you can start as development mode:

```bash
pnpm run dev
```

Or you can start as production mode which are configured to run as a docker container:

```bash
docker compose up --build -d
```

> [!CAUTION]
> Don't forget to create a `.env` in API folder, you can check the example.

## Improvements

- Implement integration tests
- Implement a better error handling
- Implement a better logging system
- Implement more endpoints to manage the superheroes
- Implement a database to store the superheroes

## Observations

- I organized the code in a simple way, but I could have organized it better.
- I didn't implement a database to store the superheroes, I used an array to store them.
