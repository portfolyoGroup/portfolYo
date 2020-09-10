import json
import logging
import os

from service.errors.db_errors.DbError import DbError
from service.mongo_db.constatnts import URI, DB_NAME, USERS_COLLECTION_NAME, MONGO_PASSWORD
from mongoengine import *

from service.mongo_db.db_entities import Project, User


connect(host=URI)


def save_user(user: User):
    try:
        return user.save()
    except NotUniqueError as e:
        raise DbError("User already exist")


def get_user_by_id(user_id: str):
    try:
        user_result = User.objects(uid=user_id).get()
        return user_result
    except DoesNotExist as e:
        raise DbError("user with id address " + user_id + " does not exist")


def get_user_by_email(email: str):
    try:
        return User.objects(email=email).get()
    except DoesNotExist as e:
        raise DbError("user with email address " + email + " does not exist")


def is_user_exist(user_id: str):  #Todo: change this method implementation
    try:
        user = get_user_by_id(user_id)
        return True
    except DoesNotExist as e:
        return False


def update_user(email: str, *args):
    pass


def delete_user(email: str):
    try:
        User.objects(email=email).get().delete()
    except DoesNotExist as e:
        raise DbError("user not found")


def save_project(project: Project):
    try:
        project.save()
    except Exception as e:
        logging.error(e)
        raise DbError("Could'nt save project")


def get_project(pKey: str):
    try:
        return Project.objects(pKey=pKey).get()
    except Exception as e:
        logging.error(e)
        raise DbError("project not found")


def delete_project(pKey: str):
    try:
        return Project.objects(pKey=pKey).get().delete()
    except Exception as e:
        logging.error(e)
        raise DbError("project not found")


def get_project_pKey(user_id: str, project_name: str):
    return f"{user_id}_{project_name}"


def add_user_project(uid: str, project_name: str):
    try:
        user = User.objects(uid=uid).get()
        user.projects.append(project_name)
        user.save()
    except Exception as e:
        logging.error(e)
        raise DbError("user not found")


# result = save_user(User(email="noam1@gmail.com", password='123'))
# result = get_user("noam@gmail.com")
# print(result)




