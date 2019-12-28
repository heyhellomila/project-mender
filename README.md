# Project Mender
[![CircleCI](https://circleci.com/gh/milaroisin/project-mender/tree/master.svg?style=svg&circle-token=161d9b3dbb9771c1b5168d8b7ef2e8a2dbef19bf)](https://circleci.com/gh/milaroisin/project-mender/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b0ecc9244c745a3b3c804f2226d5ae9)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=milaroisin/project-mender&amp;utm_campaign=Badge_Grade)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![CompanyLogo](https://user-images.githubusercontent.com/15717229/71537138-99bacf00-28e5-11ea-8b11-f4a575ee82ba.jpg)

A home renovation & maintenance application for homeowners where users are will then be able to create work orders for corrective and preventive maintenance work aimed specifically for the Quebec markets. Every home purchase is required to be catalogued and pass under strict inspection standards that are set by provincial and regional requirements. However, the results of the inspection are too long-winded and are not easily translatable for the client. This application aims to condense, summarize and interpret the results in a visually appealing manner for the client to understand their home better. With this in mind, the homeowner will be able to create and track work orders for corrective and preventive maintenance.

Secondly, the application will include an additional feature for the client to be connected to network of local contractors in the area where they can request and access services directly with the application. The status of the work order can be easily retrieved, scheduled and updated.

This web application uses the following technologies:

-   _Express_, a Node.js back-end framework
-   _MySQL_, a cross-platform document-oriented database
-   _React Native_, an application framework
-   _Expo_, a framework and platform for React applications.

## Installing Dependencies

Before starting, make sure you have working versions of npm (6.12+) and mySQL (5.7.22+).

```shell
node --version
mysql --version
```

### Package Set Up

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

```shell
npm start
```

### Running the Front-end Server

To start the front-end server, use the following command from `frontend/`:

A. on NodeDemon:

```shell
npm start
```

B. on ts-node:

```shell
npm run dev
```

Afterwards, scan the barcode or navigate to the link provided by Expo with your phone.

Note that both servers must be running as separate processes for the application to function.
