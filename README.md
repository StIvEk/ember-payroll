# Payroll

Payroll is a demo application build with Ember.js.

The application presents a list of employees with their personal and salary details. It allows filtering the list by employee first name or surname.
The employees list is provided by a backend REST service mocked-up with Ember CLI Mirage.  

This README outlines the details of installing the application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

In order to run the application only you can install [lite-server](https://github.com/johnpapa/lite-server) as described in the next [section](#installation).

In order to run the application and the tests of the application you will need [Ember CLI](http://ember-cli.com/), [Bower](http://bower.io/) and [PhantomJS](http://phantomjs.org/) installed as described in the next [section](#installation).

## Installation

#### 1. Clone this repository
`git clone <repository-url>`

#### 2. Install lite-server (to run the application only) or Ember CLI (to run the application and the tests)
##### lite-server installation  
`npm install -g lite-server`

##### Ember CLI, Bower, PhantomJS installation 
* change into payroll directory
* `npm install -g ember-cli@2.7`
* `npm install -g bower`
* `npm install phantomjs-prebuilt`
* `npm install`
* `bower install`


## Running
### Running the application
##### If using lite-server
* change into payroll/dist directory
* `lite-server`
* Open [http://localhost:3000](http://localhost:3000)

##### If using Ember CLI
* change into payroll directory
* `ember server`
* Open [http://localhost:4200](http://localhost:4200)

### Running Tests

* `ember test`
* `ember test --server`

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* [ember-cli-mirage](http://www.ember-cli-mirage.com/)