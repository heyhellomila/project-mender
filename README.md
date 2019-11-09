[![CircleCI](https://circleci.com/gh/milaroisin/project-mender/tree/master.svg?style=svg&circle-token=161d9b3dbb9771c1b5168d8b7ef2e8a2dbef19bf)](https://circleci.com/gh/milaroisin/project-mender/tree/master)

# Project Mender

![CircleCI](https://img.shields.io/circleci/build/github/milaroisin/project-mender/master?style=for-the-badge)
![CommitActivity](https://img.shields.io/github/last-commit/milaroisin/project-mender?color=lightgrey&style=for-the-badge)
![Issues](https://img.shields.io/github/issues/milaroisin/project-mender?style=for-the-badge)
![License](https://img.shields.io/github/license/milaroisin/project-mender?color=ultraviolet&style=for-the-badge)
![Stars](https://img.shields.io/github/stars/milaroisin/project-mender?color=blue&style=for-the-badge)
![BeerPay](https://img.shields.io/beerpay/milaroisin/project-mender?color=9cf&style=for-the-badge)
![CompanyLogo](https://raw.githubusercontent.com/milaroisin/project-mender/readme/CourseAdmin/mender-logo.jpg)

A home renovation & maintenance application for homeowners where users are will then be able to create work orders for corrective and preventive maintenance work aimed specifically for the Quebec markets. Every home purchase is required to be catalogued and pass under strict inspection standards that are set by provincial and regional requirements. However, the results of the inspection are too long-winded and are not easily translatable for the client. This application aims to condense, summarize and interpret the results in a visually appealing manner for the client to understand their home better. With this in mind, the homeowner will be able to create and track work orders for corrective and preventive maintenance.

Secondly, the application will include an additional feature for the client to be connected to network of local contractors in the area where they can request and access services directly with the application. The status of the work order can be easily retrieved, scheduled and updated.


This web application uses the following technologies:

-   _Express_, a Node.js back-end framework
-   _MongoDB_, a cross-platform document-oriented database
-   _React Native_, an application framework

```
node --version
npm --version
```

### Installing Dependencies

Before starting, make sure you have working versions of npm (6.12+) and Node (12.9.0+).

### Database Set Up

Necessary dependencies must be installed for both parts of the application.

For the back-end, execute:
```shell
cd backend/
npm install
```
For the front-end, execute:
```shell
cd frontend/
npm install
```

### Running the Back-end Server

To start the back-end server, use the following command from `backend/`:

```
npm start
```

### Running the Front-end Server

To start the front-end server, use the following command from `frontend/`:

```
npm start
```

Note that both servers must be running as separate processes for the application to function.