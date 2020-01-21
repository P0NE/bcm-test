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

For building scalable and maintenable backend applications I like to use principles like dependency injection and DDD (Domain-Driven Design) architecture. That's why I choose NestJS framework. (It's also confortable for me, an old java developper :relaxed: )

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

 ```curl -X POST http://localhost:3000/auth/login -d '{"username": "BCM", "password": "bcmenergy"}' -H "Content-Type: application/json"```

 The API send you in return an access token :

 ```{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJDTSIsInN1YiI6MSwiaWF0IjoxNTc5NjAzMDUzLCJleHAiOjE1Nzk2MDMxMTN9.4crUNRJF0QWu3Spl9cpAKv-ZeY4Gvu7U2G-6l4DIsqQ"}```

After you have to add this token to bearer authorization for every request to the API flights:

```curl http://localhost:3000/flights?departure_airport=ORL&arrival_airport=CDG&departure_date=2019-03-20&tripType=R&return_date=2019-03-29 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."```

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
 
 We are also interested in knowing:
  * How you would deploy this in production.
  
  -> We can use a docker container (I created one) to deploy on a webapp on the cloud (AWS, Azure, GCP).
  * What technologies would you use to have a CI/CD running.
  
  -> We can use Jenkins or Azure devops (base on which cloud or not we want to use). It's important to couple a CI/CD with a git strategy. I like to use gitflow.
  The process for the CI are:
  - Install dependencies
  - Code linting
  - Runs tslint to check code style in project files
  - Run unit tests
  - Run end-to-end (E2E) tests
  
  Each merge on develop launch the CI/CD for the develop (alpha) plateform. When Develop is merged on Master, the CI/CD is launch on the beta plateform. And if all works like we want, we can autorize manualy the deployment on our production plateform.
  We can couple all this process with tools like SonarQube for analysing the code base and decide of a strategy with code coverage and errors detected if the CI can be launched.

## Conclusion
Things I wish I could have done with more time:
- More TU for flights service.
- Create a database for store the user informations.
- Use bcrypt for salting and hash password.
- Create environment variables to store the secret for JWT strategy.
- Try to find a strategy for caching system with redis.
- The search radius bonus.
  
I would be happy to answer all your questions, especially on the aggregation algorithm and the choice of the data structure.