# VetCare
We create VetCare from an university asignation where we created a website for the management of the processes of a vet clinic. The web has many roles and of course different access for all of them.

## Índice
1. [Introduction](#Introduction)
2. [Parameters](#Parameters)
3. [Pre-Installation Steps](#Pre-Installation-steps)
4. [Installation Steps](#Instalation-steps)
5. [Process](#Process)
   - [Built with](#Building)
6. [Authors](#Autors)

## Introduction
VetCare was created by Luna Penagos Garcia and Sara Murillo, it started from an university asignment and it helps improve the processes of the vet clinic, you can enter as Admin, Vet or Pet Owner and based on your rol you'll have a different Landing with different buttons ans functions.

## Parameters
- Rol management
- User profile
- Pet management
- Appoiment module
- Profile management
- Medicines and prescriptions module
- Payment module
- Data base
- Graphic User Interface

## Pre-Installation Steps
As a pre-parameter you'll have to install some programs such as:
   - MongoDB compass
   - Visual Studio Code (Specifically)
     - HTML
     - CSS
     - JavaScript
   - NodeJS

## Instalation Steps
1. Open a terminal on Visual Studio
2. Use the command "git init"
3. Use the command "git remote add origin https://github.com/LunaGar1/vetCare.git"
4. Use the command "git clone https://github.com/LunaGar1/vetCare.git"
5. Use the command "cd vetCare"
6. Use the command "code ."
7. Use the command on the project terminal: "npm install bcrypt body-parser cors ejs express express-session mongodb mongoose multer"
8. Use the command: "node index.js"
9. Open MongoDB Compass and click on Connect button
10. You should be looking at the database "vetCare"
11.  Click on "users" collection
12. Click on "ADD DATA" button
13. Click on "Insert Document"
14. Enter the following:
```
    [{
  "_id": {
    "$oid": "672d6f0057271f85872fe35e"
  },
  "names": "luna",
  "lastNames": "garcia m",
  "typeID": "ID",
  "ID": "12345678",
  "Role": "Admin",
  "user": "l@gmail.com",
  "hashedPassword": "$2b$10$oypTYqJUyNMjR.V4bCXUbuoOqJ8/v0yzsPkTZA8iGMMnyl9faIisG",
  "__v": 0
},
{
  "_id": {
    "$oid": "672d6f2f57271f85872fe362"
  },
  "names": "Sara",
  "lastNames": "Murillo",
  "typeID": "ID",
  "ID": "09876543",
  "Role": "Vet",
  "user": "s@gmail.com",
  "hashedPassword": "$2b$10$fyV5yJzHPBNOK5RegRLEDOYJJ5T2BgWH5l8Q69x1cxN3BP12ENVia",
  "__v": 0
},
{
  "_id": {
    "$oid": "672d6f5657271f85872fe366"
  },
  "names": "Manuel",
  "lastNames": "Garcia",
  "typeID": "ID",
  "ID": "162695327",
  "Role": "Pet owner",
  "user": "m@gmail.com",
  "hashedPassword": "$2b$10$SvrQpou/.fY04knPOvOJb.hUHZmSHflDX5xJVRMZl89mGHDx9..3i",
  "__v": 0
}]
```


And enter on "Insert" button

14. Go to visual again and use the command on the terminal: "node index.js"
15. Open the browser and search the browser and look for the addres "http://localhost:3000/HTML/login.html"
16. You can login with any of the users you saved in the "users" collection of MongoDB, everyone has a diferent role

## Process
Our website was created in about 2 months, we use git as our version control software. We work separately and in different branches dividing our work equally. Overall, it was a great process, we learned a lot.

### Built with
We built the web using HTML, CSS and JS. We used Visual as our workspace and git to control changes of the web

## Authors
Luna Penagos Garcia and Sara Murillo
