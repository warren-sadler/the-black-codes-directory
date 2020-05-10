# Configuration

## Extending the application with configuration

Core.Configuration is critical to how The Black Codes directory operates.
It provides access to process.env values such as the PORT and the NODE_ENV but is also responsible for the logger and request handlers like routers and middleware.

In this document we will cover how the configuration module works and how you can use it to add server-life-cycle events, middleware, or routers of your own.

## Table of Contents

-   [ApplicationConfiguration](#application-configuration)
-   [Server LifeCycle Functions](#server-life-cycle-events)
-   [Request Handlers](#request-handlers)
-   [Logger](#logger)

## Application Configuration

Below you can see an example configuration, we will walk-through each bit to understand
what is happening better.

```typescript
  {
    NODE_ENV: 'development', // The current runtime environment of the application
    PORT: 8000, // The configured PORT for the application, used by http.Server#listen
    BEFORE_SERVER_START_FNS: [
      clearLogsDirectory,
      establishDBConnection,
    ], // Functions to be executed before http.Server#listen is called, this is often times
    // a good place to clean up directories, and establish connection to the database
    AFTER_SERVER_START_FNS: [
      notifySlack,
      ({LOGGER, PORT}) => LOGGER.info(`Application running on port ${PORT}`)
    ], // Functions to be executed after http.Server#listen
    MIDDLEWARE: [
      helmet(),
      cors('*'),
      morgan('combined')
    ], // express middleware are defined here
    ROUTERS: [
      statusRouter,
      usersRouter,
      profilesRouter
    ], // applicationRouters are functions which receive an application instance
    // and mount a router to a particular endpoint. See #request-handlers for more details
    LOGGER: winstonLogger // Application logger, winston by default
  }
```

## Server LifeCycle Events

TODO: Notes about common use-cases for server-life-cycle events.

## Request Handlers

```typescript
function todosRouter(application: express.Application) {
    const router = express.Router();
    // actual router code omitted for brevity/clarity
    // see docs/technologies/express.md for more on express.Router's
    application.use('/api/v2/todos', router);
}
// ----
// later in main.ts
// Now we mount the router to the applicationConfig
const config = applicationConfigManager.appendRouters(todosRouter, someOtherRouter).getInstance();
```

## Logger

TODO: reference to winston, centralized logging, formats, and how to use
the application logger(LOGGER).
