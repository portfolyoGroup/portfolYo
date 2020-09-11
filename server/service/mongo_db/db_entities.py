from mongoengine import *


class ProjectPic(Document):
    name = StringField()
    format = StringField()
    encoded = StringField()


class ProjectHeader(Document):
    title = StringField()
    subtitle = StringField()


class Project(Document):  # Todo: add encoded project if we are staying with the current implementation
    pKey = StringField(unique=True, required=True)  # userId_projectName
    name = StringField(required=True)
    port = StringField(max_length=5)
    description = StringField()
    picture = ReferenceField(ProjectPic)
    header_data = ReferenceField(ProjectHeader)
    format = StringField()
    type = StringField()
    encoded = StringField()


class User(Document):
    # email = EmailField(unique=True, required=True) // TODO: Return back to EmailField
    email = StringField(unique=True, required=True)
    password = StringField(required=True)
    name = StringField()
    description = StringField()
    projects = ListField()
    uid = StringField(required=True)
    programming_languages = StringField()
    skills = StringField()
    experience = StringField()
    date_of_birth = StringField()
    address = StringField()
    phone = StringField()
    title = StringField()
    main_description = StringField()
    picName = StringField()
    picType = StringField()
    picData = StringField()

