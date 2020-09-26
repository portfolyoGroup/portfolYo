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
    except DoesNotExist:
        raise DbError("user with id address " + user_id + " does not exist")


def get_user_by_email(email: str):
    try:
        return User.objects(email=email).get()
    except DoesNotExist:
        raise DbError("user with email address " + email + " does not exist")


def is_user_exist(user_id: str):  #Todo: change this method implementation
    try:
        user = get_user_by_id(user_id)
        return True
    except DoesNotExist as e:
        return False


def update_user(email: str, *args):
    pass


def update_user_profile(profile_data: dict):
    if is_user_exist(profile_data.get('uid')):
        user = User.objects(uid=profile_data.get('uid')).get()
        user.name = profile_data.get('dataOfProfileHome').get('name')
        user.title = profile_data.get('dataOfProfileHome').get('title')
        user.main_description = profile_data.get('dataOfProfileHome').get('main_description')
        user.date_of_birth = profile_data.get('dataOfContact').get('date_of_birth')
        user.address = profile_data.get('dataOfContact').get('address')
        user.phone = profile_data.get('dataOfContact').get('phone')
        user.experience = profile_data.get('dataOfAbout').get('experience')
        user.skills = profile_data.get('dataOfAbout').get('skills')
        user.programming_languages = profile_data.get('dataOfAbout').get('programming_languages')
        user.description = profile_data.get('dataOfAbout').get('description')
        user.projects = profile_data.get('projectsList')
        user.picName = profile_data.get('profilePic').get('picName')
        user.picType = profile_data.get('profilePic').get('picType')
        user.picData = profile_data.get('profilePic').get('picData')

        user.save()


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


def get_project_if_exist(pKey: str):
    project_objects = Project.objects(pKey=pKey)

    return project_objects.get() if project_objects else None


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


def delete_user_project(uid: str, project_key: str):
    user = User.objects(uid=uid).get()
    projects_list = user.get('projects')
    if project_key in projects_list:
        projects_list.remove(project_key)
        user.save()


def get_project_pKey(user_id: str, project_name: str):
    return f"{user_id}_{project_name}"


def add_user_project(uid: str, project_name: str):
    try:
        user = User.objects(uid=uid).get()
        project_key = get_project_pKey(uid, project_name)
        if project_key not in user.projects:
            user.projects.append(project_key)
            user.save()
    except Exception as e:
        logging.error(e)
        raise DbError("user not found")




