import os

DB_NAME = 'protfolYo-db'
USERS_COLLECTION_NAME = 'users'
MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
URI = f"mongodb+srv://protfolYo:{MONGO_PASSWORD}@protfolyo-db-qmyn0.mongodb.net/test?retryWrites=true&w=majority"