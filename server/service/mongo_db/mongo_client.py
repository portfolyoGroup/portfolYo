
##### pip install dnspython before using the client. #####
import json
import os
from service.mongo_db.constatnts import URI, DB_NAME, USERS_COLLECTION_NAME
import pymongo

from pymongo import MongoClient

from service.mongo_db.db_entities import Project, User

client = MongoClient(URI)
db = client[DB_NAME]


def get_user(user_name: str):
    users = db[USERS_COLLECTION_NAME]

    return users.find_one({"user_name": user_name})


def post_user(user: User):
    users = db[USERS_COLLECTION_NAME]
    result = users.insert_one(user.__dict__)
    return result


def get_project(user_name: str, project_name: str):
    pass


def post_project(user_name: str, project: Project):
    users = db[USERS_COLLECTION_NAME]
    users.find_one_and_update(filter={'user_name': user_name},
                              update={"$addToSet":
                                          {"projects": project.__dict__ }})


# user = User(full_name="Noam Levy", user_name="noaml", description="some description...", pic="AWVFE")
# project = Project(name="hello_world", big_description="some long description...", small_description="some short description...", picture="blu_bear.png", technologies="python", runtime="python 3.8")
# post_user(user)
#
# post_project(user_name="noaml", project=project)
# project1 = Project(name="hello_world1", big_description="some long description...", small_description="some short description...", picture="blu_bear.png", technologies="python", runtime="python 3.8")
# post_project(user_name="noaml", project=project1)
