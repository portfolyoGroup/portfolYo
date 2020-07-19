import json
import os
from constatnts import URI, DB_NAME, USERS_COLLECTION_NAME, MONGO_PASSWORD
from mongoengine import *

from db_entities import Project, User


connect(host=URI)

def save_user(user: User):
    try:
        return user.save()
    except NotUniqueError as e:
        raise Exception("User already exist", e)

def get_user(email: str):
    try:
        return User.objects(email=email).get()
    except DoesNotExist as e:
        raise DoesNotExist("user with email address " + email + " does not exist", e)

def update_user(email: str, *args):
    pass

def delete_user(email: str):
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




