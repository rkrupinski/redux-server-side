# Redux server-side

The ultimate [React](https://reactjs.org/) [SSR](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38), [Redux](https://redux.js.org/)-powered example.

## But why?

Does any of the following sentences describe your SSR adventures?

- You'd love to introduce SSR in your project yet you're scared by the level of vendor lock-in that comes with [Next.js](https://nextjs.org/) or [Gatsby](https://www.gatsbyjs.com/).

- You've got what it takes to implement SSR yourself, yet the sheer awareness of the amount of work needed makes you procrastinate.

- You're looking for a good SSR example on the web yet they're all either overly complex (half of the code being [webpack configuration mess](https://webpack.js.org/configuration/)), or oversimplified (a crappy demo).

It does? You're in the right place. Keep on reading.

## The app

![Todos](./assets/todos.png)

Surprise, surprise - this example implements a well-known, "todo app" concept. Nothing interesting, you say? Well, I say it's got some pros:

- no domain knowledge required (how many todo apps have you built so far? 10? 20?)
- a fair amount of implicit complexity (sync stuff, async stuff, routing, storage, race conditions)
- once you familiarize yourself with the SSR implementation, you can use it to plan implementing yours; how cool is that?

The app uses [monorepo](https://classic.yarnpkg.com/en/docs/workspaces/) structure for better separation and to ease code reuse, along with simple [automation](https://github.com/hfour/wsrun) to make your life easier. It consists of the following packages:

- [@rss/app](./packages/app) - This is the core package. It holds components (used both on the client and on the server), routes and services.
- [@rss/client](./packages/client) - The client-side package. It encapsulates all the code needed to render (match routes, resolve dependencies, handle errors) the app in the browser.
- [@rss/server](./packages/server) - A simple [Express](https://expressjs.com/)-based server. Apart from routing, resolving dependencies and putting together HTML responses, it also exposes API for the client.
- [@rss/state](./packages/state) - All the state-related code resides here as it's shared between client and server. Types, redux-related boilerplate, store utils - it's all there.
- [@rss/db](./packages/db) - A database server. This sounds like computer science, yet we're just talking about a [JSON Server](https://github.com/typicode/json-server) instance. More than enough for an example app.
- [@rss/shared](./packages/shared) - Remaining common chunks. Utility functions and types. Stuff that's shared across, yet doesn't really belong into any of the aforementioned packages.
- [@rss/prettier](./packages/prettier) - Shared [Prettier](https://prettier.io/) configuration. Read more on sharing configuration [here](https://prettier.io/docs/en/configuration.html#sharing-configurations).

## Setup

### Prerequisites

Make sure you've installed the latest stable versions of [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

### Running the app

1. Clone the repository.
2. Run `yarn` from the root directory to install all dependencies.
3. Copy `.env.example` into `.env` (the defaults will work just fine but feel free to tweak them if needed)
4. Run `yarn allthethings`. This is gonna clean, build, lint and start the app.
5. In your web browser, navigate to `http://localhost:<port>` (you'll find the port number under `SERVER_PORT` inside `.env`; it defaults to `4000`)

Have fun!
