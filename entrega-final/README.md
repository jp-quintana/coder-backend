# Coder Backend Shop

Simple Shopping cart MERN app. Currently WIP.

## Installation

 - Step 1: Clone Repository and Install Packages in client and server folders.
 
 - Step 2: Generate private key for your Firebase Service account and store it inside the db folder inside the server folder. Rename file to firebase.json.

 - Step 3: Setup your .env file
 
```
  CONNECTION_STRING=(mongo connect url)
  EMAIL_STRING=()
  EMAIL_ADMIN=(email address used to send email on sign up and order confirm).
  daoOption=(should be either MONGO or FIREBASE, based on which DAO you want to use)
  
```
 -  Step 4: Launch Node Server
 
```
npm run dev
```
 - Step 5: Launch React App
 
```
npm start
```

## Admin Role
For a user to become admin, just add "isAdmin: true" in the user object directly through mongoDb or Firebase.
![isAdmin](https://user-images.githubusercontent.com/87621233/222892318-aa7893f9-6e8f-4200-b16f-9782e52398fd.png)

## Sessions
Sessions are currently stored in mongoDb.

## Features
- Products Display.
- Basic Cart Functions.
- Auth (Email/Password)
- User orders.
- Admin functions (create/edit/delete).

## Authors
- [@jp-quintana](https://github.com/jp-quintana)
