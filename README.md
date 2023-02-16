# Project 1: Shared shopping list

This is a shopping list application, called "Shopping Lists".

It stores shopping lists, and provides the following functionality:
- Create new lists
- Add items to lists
- Mark items on the list as collected
- Delete old lists
- Show statistics of the application

The application is written in JavaScript, and uses .eta files for templating the HTML.
The application can be tried out at fly.io: (ADD LINK HERE)

You can run the application locally using *docker-compose*. The application will be available at http://localhost:7777.
To run it locally, run the following commands:
- docker-compose build
- docker-compose up
After this, the application will be available at http://localhost:7777.

To run the tests, run the following commands:
- docker-compose run --entrypoint=npx e2e-playwright playwright test; docker-compose rm -sf
