# Project Mender
[![CircleCI](https://circleci.com/gh/milaroisin/project-mender/tree/master.svg?style=svg&circle-token=161d9b3dbb9771c1b5168d8b7ef2e8a2dbef19bf)](https://circleci.com/gh/milaroisin/project-mender/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b0ecc9244c745a3b3c804f2226d5ae9)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=milaroisin/project-mender&amp;utm_campaign=Badge_Grade)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![CompanyLogo](https://user-images.githubusercontent.com/15717229/74889867-4e0a2c00-5350-11ea-8525-f538c6512beb.png)

A home renovation & maintenance application for homeowners where users are will then be able to create work orders for corrective and preventive maintenance work aimed specifically for the Quebec markets. Every home purchase is required to be catalogued and pass under strict inspection standards that are set by provincial and regional requirements. However, the results of the inspection are too long-winded and are not easily translatable for the client. This application aims to condense, summarize and interpret the results in a visually appealing manner for the client to understand their home better. With this in mind, the homeowner will be able to create and track work orders for corrective and preventive maintenance.

Secondly, the application will include an additional feature for the client to be connected to network of local contractors in the area where they can request and access services directly with the application. The status of the work order can be easily retrieved, scheduled and updated.

This project is also hosted on the [Concordia University Gina Cody School of Engineering](https://capstone-projects-491.firebaseapp.com/project/WgrR2ZnLGm) showcase website.

This web application uses the following technologies:

-   _Express_, a Node.js back-end framework
-   _MySQL_, a cross-platform database
-   _React Native_, an application framework
-   _Expo_, a framework and platform for React applications.

## Installing Dependencies


Before starting, make sure you have working versions of npm (6.12+), node (12.9.0+) and mySQL (5.7.22+).

```shell
npm --version
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

### For Mac OSX Systems ( Catalina - 10.15+ & above)

**Update** - With the latest release of Mac OSX Catalina (10.15+ and up) on October 19, 2019 and the replacement of `bash` with `zsh`, additional steps must be done to allow permissions for the app to run.

Do not use `bash` for OSX 10.15 & above.

1. Select `System Preferences` from the `Apple` menu.

2. Select `Security & Privacy` icon.

3. Under the `Privacy` tab, and locate the `Full Disk Access` folder on the left side pane.

4. Tick onto the checkbox for the `Watchman` application to grant full access.

Restart `zsh` and the Mender application should be running smoothly from here on.

### Environment Variables

The /backend will require the following environment variables:

```shell
JWT_KEY=
RDS_HOSTNAME=
RDS_PORT=
RDS_USERNAME=
RDS_PASSWORD=
RDS_DATABASE=
```

The /frontend will require the following environment variables:

```shell
LOCAL_API_KEY=<ip-address>:3000
```

### Running the Back-end Server

To start the back-end server, use the following command from `backend/`:

_A. on NodeDemon:_

```shell
npm start
```

or

_B. on ts-node:_

```shell
npm run dev
```

### Running the Front-end Server

To start the front-end server, use the following command from `frontend/`:

``` shell
npm start
```

Afterwards, scan the barcode or navigate to the link provided by Expo with your phone.

Note that both servers must be running as separate processes for the application to function.

### Running Application with Docker

To create and start the container, use the following command from the project root:

``` shell
docker-compose up --build
```

Ensure that port forwarding is enabled with the Docker technology installed, specifically for the following host and guest ports: 3000:3000, 19000:19000, 19001:19001 and 19002:19002.
Additionally, add the following environment variable to /frontend:

`REACT_NATIVE_PACKAGER_HOSTNAME=<ip-address>`

Finally, once the application has been built, scan the QR displayed in the terminal.

Currently, for development purposes, polling/hot reloading is supported for the backend, but not for the frontend (see https://github.com/milaroisin/project-mender/issues/195).

## Team XENA

![xena-banner](https://raw.githubusercontent.com/milaroisin/atelier-xena/master/CourseAdmin/xena-banner.png)

| Jamal Ghamrouai | Dania Kalomiris  |
|--|--|
| **Anamika Pancholy** | **Daniel Privotsky** |
| **Mila Roisin** |**Sébastien Ong Tone** |
