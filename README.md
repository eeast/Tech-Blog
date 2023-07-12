
# Tech Blog Web App

[![license](https://camo.githubusercontent.com/029166d85f92969845201e59c3fcd8c8345556036155ff18140f6a9e796173a3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d677265656e)](https://camo.githubusercontent.com/029166d85f92969845201e59c3fcd8c8345556036155ff18140f6a9e796173a3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d677265656e)

## Table of Contents

* [Description](#description)
* [Features](#features)
* [Deployed Application](#deployed-application)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Description

Simple blog web app using sequelize, mysql, bcrypt, and handlebars. Allows users to sign in, create posts, add comments, and edit posts.

## Features

* User authentication with password encryption
* Persistent database saves user posts and comments
* Users are able to edit posts through the My Posts page

## Deployed Application

* Deployed web application can be found [here](https://eeast-tech-blog-a2d8c6ae77bb.herokuapp.com/)
* Note: Web application is deployed for example purposes only. Please install and host separately for extended testing and/or use. (Feel free to leave a post, though!)

## Installation

* Ensure Node and npm are installed
* Run `npm i` to install required dependencies; scripts are included so all required packages will be included when ran from the root folder
* Run `npm run start` to start the server (also in the root folder)
* Navigate to `localhost:3001` or hosted location to view web app

NOTE: When deploying, ensure all supporting requirements are in place for database management. The code currently supports jawsdb in the config file.

## Usage

This program can be used as a simple blog that can be accessed from anywhere. Be sure to follow the [Installation](https://github.com/eeast/E-Commerce-Back-End-Application/blob/main/README.md#installation) instructions above.

Once installed and hosted, accessing the web app will serve a blog web app. Users who are not logged in will only have access to the front home page. Viewing full posts, creating posts, and editing posts requires the user to be logged in. Account creation can be done from the login page. The user will also be redirected to the login page if they attempt to navigate to any page other than the landing page.

## License

Please refer to the [LICENSE](https://github.com/eeast/E-Commerce-Back-End-Application/blob/main/LICENSE) in the repo.
