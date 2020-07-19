import os

DB_NAME = 'protfolYo-db'
USERS_COLLECTION_NAME = 'users'
MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
URI = f"mongodb://protfolYo:{MONGO_PASSWORD}@protfolyo-db-shard-00-00.qmyn0.mongodb.net:27017,protfolyo-db-shard-00-01.qmyn0.mongodb.net:27017,protfolyo-db-shard-00-02.qmyn0.mongodb.net:27017/protfolyo-db?ssl=true&replicaSet=atlas-bwaeyi-shard-0&authSource=admin&retryWrites=true&w=majority"