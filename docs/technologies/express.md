# Express

## Table of Contents

-   [Express Overview](#express-overview)
-   [Express Basics](#express-basic-concepts)
    -   [Sample Node HTTP Server](#sample-node-http-server)
    -   [Express Applications](#express-applications)

## Express Overview

Express is a minimal framework for Web Development in Node.js. It's minimal in the sense that it doesn't impose or prescribe any particular way to structure your web applications.

Express is capable of supporting many use-cases: JSON API Endpoints, serving static content, GraphQL Endpoints, and so much more. This is possible because of Express' expressive and powerful router and middleware constructs.

## Express Basic Concepts

If you've worked with Node.js' [http](https://nodejs.org/api/http.html) module and have created a web-server with it, you are familiar with the concept of the `Request` and `Response` objects. Express, is at it's core, an extension of those objects with some extra tools for building more complex web interactions.

### Sample Node HTTP Server

Below we have an example of a very basic web-server written with the Node.js http module. The http#createServer method takes as it's first argument a function called a `requestHandler`, `(1)` this function is then passed the aforementioned `Request` and `Response` object.

```typescript
import http from 'http';

const server = http
    // (1)
    .createServer((req, res) => {
        // (2)
        if (!!req.url.match(/\/$/)) {
            // (3)
            res.end('Hello World!');
        } else {
            // (4)
            res.end('Not Found');
        }
    })
    // 5
    .listen(8080);
```

The request object contains many interesting properties but for the use-case of developing web-servers, we are primarily interested in performing specific actions when a particular URL is requested.

`(2)` We match on the index route `/`, as Request#url is a String. If the Request#url is a match, we use the Response#end method to respond to the request sending the message 'Hello World!'. `(3)` Otherwise we respond with the string 'Not Found'. `(4)`

If that seems like a lot of work to explicitly match on every request, it's because it is! Express has some really nice tooling for us in that regard that we will explore here shortly. Moreover, the response we sent back to the requester is plain text, not JSON.

To actually send JSON as our response we would have to make a lot of modifications to the Response objects headers and stringify our JSON payload manually. [Here's a handy tutorial if you're interested in how this is done using plain NODE http](http://zetcode.com/javascript/http/) With Express sending JSON is relatively trivial.

### Express Applications

```typescript
import express from 'express';
const app = express();
app.get('/', (req, res) => res.json('Hello World'));
app.get('*', (req, res) => res.send('Not Found'));
app.listen(8080);
```

With Express we've simplified our code quite a bit! Express has a pretty intelligent routing engine that allows it to utilize not only the order in which we define our router handlers to determine their precedence but also an elegant string based syntax for matching request urls.

We can also see how simple it is to send JSON bodies as our response with the Express powered Response#json method!

## TODOS

We've only scratched the surface, so much more to write 😬

-   How The Black Codes Directory utilizes Express
-   How TBCD structures it's Express Application
-   The Express Router Stack
-   How Express Middleware and works
-   The Next Function
-   How To Test Express Applications
