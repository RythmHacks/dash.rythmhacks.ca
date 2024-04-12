# dash.rythmhacks.ca

RythmHacks hacker dashboard and application portal

## How to contribute

1. Clone the repository

    ```bash
    git clone https://github.com/RythmHacks/dash.rythmhacks.ca.git
    ```

2. Install PostgreSQL (guide [here](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database))
3. Run `psql postgres` then `CREATE DATABASE rythmhacksdash`
4. Create a file in the project root directory called `.env.local`
5. Copy everything in `.env.template` and put it in `.env.local`, filling in the missing values
6. Type `npm i` to install dependencies
7. Write some code and run `npm start` to start the web app

## Git naming conventions

The commit naming conventions follow [this guide](https://www.conventionalcommits.org/en/v1.0.0/). Commits are named in the format `type(env): description`. Both commits and pull requests are named in this format. See the `Pull Requests` tab for some examples.
