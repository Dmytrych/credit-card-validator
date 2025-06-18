# Credit card validator

Simple credit card number validation via the REST API.

Validation includes:
- Expiration validation
- Card number check with Luhn algorithm
- BIN validation, using an external API

## How to run

Get a free API key from [Handy Api](https://www.handyapi.com/bin-list) and set it as an environment variable `BIN_API_KEY`.

Locally:
```bash
  npm install

  npm run dev
```

In Docker:
```bash
  docker compose up -d
```

## How to test

To run tests, you can use the following command:
```bash
  npm run test
```

## Swagger

Swagger docs are available at `http://localhost:4000/swagger`
