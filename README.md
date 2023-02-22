# Project 1: Shared shopping list

The application consists of three types of pages. The main page, which displays
some simple statistics. The lists page which shows a list of all shopping lists
in the database. This page includes a feature to add more shopping lists into
the shopping list database and to deactivate shopping lists if the user wants
to. Finally it includes pages for the singular lists in the shopping list
database. These shopping list pages display the items on each specific shopping
list and provide a possibility to add items into the shopping list. Additionally
the items may be marked as collected and they will be striked through.

This application does not have an online deployment location due to difficulties
with registering for fly.io.

## Running the application locally

This application is run with Docker Compose

To run the application, open up terminal in the folder /project1 which includes
the file docker-compose.yml and run the command `docker compose up --build`.

To close the application you can press `ctrl + C` in the same terminal where you
started the application, or open up a new terminal in /project1 which contains
docker-compose.yml and type in `docker compose down`.

When running `docker compose up --build` the application will automatically make
a PostgreSQL database and attach it to your application. The database can be
accessed through the terminal with the command
`docker exec- it database-server psql -U username database`. After gaining
access, the database can be modified through SQL commands.

## Running the tests

The application includes e2e tests in the folder /e2e-playwright/tests. These
can be run by opening the a terminal in the folder /project1 and entering the
command `docker-compose run --entrypoint=npx e2e-playwright playwright test`. It
should be noted that the tests are meant to be done on an empty database. The
database can be reset by the command `docker-compose rm -sf`.
