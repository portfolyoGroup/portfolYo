from mongoengine import *


class Project(Document): # Todo: add encoded project if we are staying with the current implementation
    pKey = StringField(unique=True, required=True) # userId_projectName
    name = StringField(unique=True, required=True)
    port = StringField(max_length=5)
    description = StringField()


class User(Document):
    email = EmailField(unique=True, required=True)
    password = StringField(required=True)
    description = StringField()
    projects = StringField()
    pic = StringField()
    uid = StringField(required=True)

