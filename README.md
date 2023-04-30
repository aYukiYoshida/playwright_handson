# Playwright Hands-on

This repository manages codes for hands-on of [Playwright](https://playwright.dev).

## Requirements

- [Python](https://www.python.org/) ^3.10
- [Poetry](https://python-poetry.org/)
- [Node.js](https://nodejs.org)

## Setup

1. Derive source code

   ```shell
   git clone git@github.com:aYukiYoshida/playwright_handson.git # via SSH
   git submodule init && git submodule update teseus
   ```

1. Install dependencies

   ```shell
   % poetry install
   % npm install
   ```

1. (optional) Install pre-commit

   ```shell
   % poetry run pre-commit install
   ```

## Usage

1. Run server in background.

   ```shell
   poetry run teseus &
   ```

1. Run testing

   ```shell
   npm run test
   ```

See also [official page](https://playwright.dev/docs/test-cli).
