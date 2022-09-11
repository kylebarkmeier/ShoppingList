# Simple Shopping List

 A simple shopping list made in React, MUI, TypeScript, NodeJS, Express, MongoDB, & Docker.
 
## Decisions

 I chose the front-end technologies because I am extremely familiar with them and was able to match the mocks quickly
 once I get my webpack/TypeScript config working. Express for the API makes REST CRUD operations a snap with their
 routes & HTTP method handlers. This was my first time using MongoDB and I chose it purely for the sake of convenience,
 as it integrates very well with a Node backend, and allows the use of a Schema. Refreshed my docker knowledge to put
 the backend services in containers for cleaner start/stop.
 
## TODO/Potential Improvements

1. Optimize docker containers (e.g. separate package.json & Dockerfile for backend services so image isn't so big, persist DB as file(s) on stop, etc.)
2. CI/CD for docker & frontend through github's container & pages services
3. Use MUI theme more extensively with style, typography, & component overrides in the theme itself (except for one-off components).
4. Drag & drop reordering of list items (would require some backend changes, too, as the items are currently sorted by creation date).
