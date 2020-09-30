# PortfolYo
portfolYo is a web application that allow users share their projects with the world, and recruiters to run projects with a single button click, without taking care of installation and running.

## Prerequisites
1. Python <=V3.7
2. pip <=3.7
3. nodeJS <= 12.16.1
4. npm <= 6.13.4
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
 `cd app/`
 `python app.py`
 
### Client setup:
Go to the client directory:
`cd client`

install dependencies:
`sudo npm install`

run the client:
`sudo npm start`

### Browse:
Browse to localhost:80

### ENJOY OUR STATE OF THE ART CODE!!!
