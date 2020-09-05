<<<<<<< HEAD:server/service/mongo_db/mongo_client.py
import json
import os

from service.errors.db_errors.DbError import DbError
from service.mongo_db.constatnts import URI, DB_NAME, USERS_COLLECTION_NAME, MONGO_PASSWORD
from mongoengine import *

from service.mongo_db.db_entities import Project, User


connect(host=URI)


def mongo_save_user(user: User):
    try:
        return user.save()
    except NotUniqueError as e:
        raise Exception("User already exist", e)


def mongo_get_user_by_id(user_id: str):
    try:
        return User.objects(uid=user_id).get()
    except DoesNotExist as e:
        raise DoesNotExist("user with id address " + user_id + " does not exist", e)


def mongo_get_user_by_email(email: str):
    try:
        return User.objects(email=email).get()
    except DoesNotExist as e:
        raise DoesNotExist("user with email address " + email + " does not exist", e)


def mongo_is_user_exist(user_id: str):  #Todo: change this method implementation
    try:
        user = mongo_get_user_by_id(user_id)
        return True
    except DoesNotExist as e:
        return False


def mongo_update_user(email: str, *args):
    pass


def mongo_delete_user(email: str):
    try:
        User.objects(email=email).get().delete()
    except DoesNotExist as e:
        raise DbError("user not found", e)


def mongo_save_project(project: Project):
    try:
        project.save()
    except Exception as e:
        raise DbError("Could'nt save project", e)


def mongo_get_project(pKey: str):
    try:
        return Project.objects(pKey=pKey).get()
    except Exception as e:
        raise DbError("project not found", e)


def mongo_delete_project(pKey: str):
    try:
        return Project.objects(pKey=pKey).get().delete()
    except Exception as e:
        raise DbError("project not found", e)


def get_project_pKey(user_id: str, project_name: str):
    return f"{user_id}_{project_name}"


# result = save_user(User(email="noam1@gmail.com", password='123'))
# result = get_user("noam@gmail.com")
# print(result)




=======
import json
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
        raise Exception("User already exist", e)


def get_user(user_id: str):
    try:
        return User.objects(uid=user_id).get()
    except DoesNotExist as e:
        raise DoesNotExist("user with id address " + user_id + " does not exist", e)


def is_user_exist(user_id: str): #Todo: change this method implementation
    try:
        get_user(user_id)
    except:
        return False

    return True


def mongo_update_user(email: str, *args):
    pass


def delete_user(email: str):
    try:
        User.objects(email=email).get().delete()
    except DoesNotExist as e:
        raise DbError("user not found", e)


def save_project(project: Project):
    try:
        project.save()
    except Exception as e:
        raise DbError("Could'nt save project", e)


def get_project(pKey: str):
    try:
        return Project.objects(pKey=pKey).get()
    except Exception as e:
        raise DbError("project not found", e)


def delete_project(pKey: str):
    try:
        return Project.objects(pKey=pKey).get().delete()
    except Exception as e:
        raise DbError("project not found", e)


def get_project_pKey(user_id: str, project_name: str):
    return f"{user_id}_{project_name}"


# result = save_user(User(email="noam1@gmail.com", password='123'))
# result = get_user("noam@gmail.com")
# print(result)




>>>>>>> 65e960925f24a956915801e543183ca1228b86ad:server/service/mongo_db/db_client.py
