<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">This technical test use NestJs, a progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">

## Description

It's a technical test for BCM energy. I create an API for aggregate flights from differents API sources.

I try to respect the time given (about 4 / 5 hours).

## Technical choice

I start the project in NodeJs / Typescript for being in agreement with the technological environment of the company.

For building scalable and maintenable backend applications I like to use principles like dependency injection and DDD (Domain-Driven Design) architecture. That's why I choose NestJS framework. (It's also confortable for me, an old java developper :) )

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Utilisation

For using the Api you have to authenticate before.
The system is a simple user auth(login, password) and JWT implementation.
I didn't have the time to implement a production like user system. I mock users informations in memory.

For authenticate, you have to call POST `auth/login` API.

Example:

 `̀ curl -X POST http://localhost:3000/auth/login -d '{"username": "BCM", "password": "bcmenergy"}' -H "Content-Type: application/json"`

 The API send you in return an access token :

 `{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJDTSIsInN1YiI6MSwiaWF0IjoxNTc5NjAzMDUzLCJleHAiOjE1Nzk2MDMxMTN9.4crUNRJF0QWu3Spl9cpAKv-ZeY4Gvu7U2G-6l4DIsqQ"}`

After you have to add this token to bearer authorization for every request to the API flights:

`curl http://localhost:3000/flights?departure_airport=ORL&arrival_airport=CDG&departure_date=2019-03-20&tripType=R&return_date=2019-03-29 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."`

For testing the API you can use Postman or directly the OpenApi definition (Swagger). The definition is basic and not contain all information than you can find in a production application (all possible responses definitions, models...).

`http://localhost:3000/api/`

I recommend to use Postman, Swagger may have difficulty viewing large amounts of data

## Bonus

* We would like to be able to cache and reuse results. Be aware that the response can be quite big / huge.
  -> I didn't have the time to implement it but we can use a cache system like redis for store all the informations. But for that it is necessary to set up a cache strategy because it can become less efficient if it is poorly thought out
 * We would like to be able to perform searches using a search radius. See "Bonus // Search radius" paragraph
  -> I didn't have the time to implement it but if you want I'll be happy to do it. But to be honest in 5 hours I did not have time
 * We would like the endpoint to be secured. :heavy_check_mark:
 * Beyond security, we need to be able to identify a user :heavy_check_mark:
 * Once security and identification in place, we need to be able to rate limit this API. The limit is up to you. :heavy_check_mark:
 