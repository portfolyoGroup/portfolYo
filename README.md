# PortfolYo
portfolYo is a web application that allow users share their projects with the world, and recruiters to run projects with a single button click, without taking care of installation and running.

## Prerequisites
1. Python <=V3.7
2. pip
3. nodeJS
4. npm
5. mongoDB account for storage
6. Docker up and running on your machine

## Getting started:

clone the project to your local machine using: https://github.com/portfolyoGroup/portfolYo.git

### Docker setup:
A running Docker process is required (download here: https://docs.docker.com/get-docker/)

### Mongo setup:
A running Mongo process is requiered(more information here: https://www.mongodb.com/)

### Server setup:
Go to the server's folder:
`cd server`
install the requirements:
`pip install -e .` (notice the dot)

set the environment variables:
 FLASK_APP=app.py
 MONGO_PASSWORD=<your mongodb password>
 
 run the server:
 `python app.py`
 
### Client setup:
Go to the client directory:
`cd client`

install dependencies:
`npm install`

run the client:
`npm start`

### Browse:
Brose to localhost:3000

 
## TODO

 * fix windows chrome render  
 * fix test color on dark mode.
 * find the real project type bug on update project info.
 * look for all pic options really is working.
 * favicon
 * add c programming language in types

## Commit messege:
in the commit meseege, let's try to keep a consistant fromat.


[SERVER/CLIENT][BUG/FEATURE/README][NAME_OF_COMMITER] - Lable
Description: describe the contant of the commit.

Names will be: NONO,LEVIVOT,DUDI,MOACH.
Lable should be in present.

Psuedo Exapmle:


[CLIENT][FEATURE][NONO] Add prrofile update form.

Description: The form will update the profile of the profile owner bla bla bla...


Add as many tags as you can, 
so when we will look for a bad commit that broke something,
we'll know where to look.

## to reset:
if you want to delete all your local changes and go back to what's on github use this command:
 git reset --hard origin/master
