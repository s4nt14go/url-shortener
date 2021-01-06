<h1 align="center">URL shortener using Node, React & Mongo 👋 </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

### Project

Make a **landing page** capable of generating a functional, shortened *link* based on an *input* of a URL. This project will evaluate the developer' skills and code quality when transforming a *layout* in a functional prototype, along with the backend and frontend properly separated. A considerable part of your goal deals with transforming the mockup provided into a working prototype.

The URL shortener must be implemented at the *backend* together with a validator, which must be able to indicate if the generated *link* is actually working. The communication between backend and frontend must be handled by a RESTful API, where the results will be shown.

It's expected that on top of shortening a URL, we are also able to keep an access count, so each time the URL is accessed, we can track a list of these accumulated values and rank the URLs properly.

All data must be saved on a database.

Requirements:

- The *frontend* must be developed using the React
- The *backend* must be developed using the Node
- The used font is [SF Pro Display](https://developer.apple.com/fonts/)

### ✨ <a href="https://shorten-aqa7s7uoga-uc.a.run.app" target="_blank">Demo</a>

## Install

```sh
npm i
```

## Usage

The backend uses MongoDB Atlas cloud service and Bitly url shortener, so you will need to open the following free accounts.

* MongoDB Atlas setting:
    * Open a account in https://www.mongodb.com/cloud
    * Create a cluster
    * Create a user going to Security > Database Access and choosing Read and write to any database for Database user privileges 
    * Under Security > Network Access click on Add IP address and fill Whitelist entry with 0.0.0.0/0 to allow access from everywhere
    * Under Atlas > Clusters click on Connect button, choose Connect your app, then driver Node.js and copy the Connection string, it would be similar to mongodb+srv://`yourUsername`:`yourPassword`@<clusterName>.mongodb.net/test?retryWrites=true&w=majority
    * Copy that string into .env variable `MONGO_DB_URL` and for `LINKS_COLLECTION` put the collection name you like, for example Links
    
* Bitly setting:
    * Open a account in https://bitly.com
    * Go to Profile settings > Generic access token and after entering your password click on Generate token
    * Register your app going to Profile settings > Registered OAuth Apps and you will get your Client ID and Client secret
    * Copy them into .env variables `BITLY_ACCESS_TOKEN`, `BITLY_CLIENT_ID` and `BITLY_CLIENT_SECRET`
    
Once the settings are done you can run the app, first fire up the back with `npm start` and then react running the same in another terminal.

## Show your support

Give a ⭐️ if this project helped you!
