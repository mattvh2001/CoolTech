# CoolTech
A credential management system using jwt for authentication


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Create a split terminal and navigate to the frontend in the one and the backend in the other. Then type npm start in both of them.

## Login
The login page is where the user logs in to the service. The admin user account is: username:matthew, password:12345678.
The admin has access to both the credentials and user tables.
There is "register" button which takes the user to the registration page. They can create a new user  account here. It will be given the default user role of standard.
After the user is logged in they will be sent to the repositories page where all the divisions that can be viewed by that user are shown

## credentials table
The credentials table displays all the credentials. If the user is a "manager" or an admin they will be able to edit these credentials

## users table
The users table displays all the users. If the user is an admin they will be able to edit these user's details. The only way to grant a user the "manager" role is for the admin to
assign that role to them by editing that particular field in the user table
