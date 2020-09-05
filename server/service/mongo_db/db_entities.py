from mongoengine import *


class Project(Document):  # Todo: add encoded project if we are staying with the current implementation
    pKey = StringField(unique=True, required=True)  # userId_projectName
    name = StringField(required=True)
    port = StringField(max_length=5)
    description = StringField()


class User(Document):
    # email = EmailField(unique=True, required=True) // TODO: Return back to EmailField
    email = StringField(unique=True, required=True)
    password = StringField(required=True)
    name = StringField()
    description = StringField()
    projects = StringField()
    pic = StringField()
    uid = StringField(required=True)
    programming_languages = StringField()
    skills = StringField()
    experience = StringField()
    date_of_birth = DateField()
    address = StringField()
    phone = StringField()
    title = StringField()
    main_description = StringField()
    picName = StringField()
    picType = StringField()
    picData = StringField()

