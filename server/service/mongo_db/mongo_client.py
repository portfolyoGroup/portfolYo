import json
import os
from service.mongo_db.constatnts import URI, DB_NAME, USERS_COLLECTION_NAME, MONGO_PASSWORD
from mongoengine import *

from service.mongo_db.db_entities import Project, User


connect(host=URI)

def mongo_save_user(user: User):
    try:
        return user.save()
    except NotUniqueError as e:
        raise Exception("User already exist", e)

def mongo_get_user(email: str):
    try:
        return User.objects(email=email).get()
    except DoesNotExist as e:
        raise DoesNotExist("user with email address " + email + " does not exist", e)

def mongo_update_user(email: str, *args):
    pass

def mongo_delete_user(email: str):
    try:
        User.objects(email=email).get().delete()
    except DoesNotExist as e:
        raise DoesNotExist("user not found", e)

def save_project(project: Project):
    try:
        project.save()
    except Exception as e:
        raise Exception("Could'nt save project", e)



# result = save_user(User(email="noam1@gmail.com", password='123'))
# result = get_user("noam@gmail.com")
# print(result)




