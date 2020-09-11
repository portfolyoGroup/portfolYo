from mongoengine import *


class ProjectPic(Document):
    name = StringField(default="my project pic")
    format = StringField("png")
    encoded = StringField("default")


class ProjectHeader(Document):
    title = StringField("my amazing hello world!")
    subtitle = StringField("Hello world using flask")


default_project = 'UEsDBAoAAAAAALu4KlEAAAAAAAAAAAAAAAAOAAAAZmxhc2stZXhhbXBsZS9QSwMEFAAAAAgAVrgqUVD2juuEAAAAswAAABQAAABmbGFzay1leGFtcGxlL2FwcC5weTWNvQrDMAyEd4PfQZ3kLGnngqFT6RtkFIbYxNR/KDZ9/dpJe5pOH3fnOEdwwexv8LFkrvAcRgopTCmgT6uIkomWaBpAikdnM+dWrcIr9udqHWw2hEyfzGFV010K6GJbGyfA12CwDHbBs8M7+LeC1oBE0fhEhL/oMdGS2vJeNd7m48bWF1BLAwQUAAAACACuuCpR3Vgu628AAACgAAAAFgAAAGZsYXNrLWV4YW1wbGUvTWFrZWZpbGVNjUsKwzAMBdc1+A6C7HuAXCYY54FVXFmVlH5u34Y20O1j3gyLR+l9WaGQFVIZPpMjFsjdczopK/0gMtw2Nlwh4ed4Bk0G7aWCorFTZwE9OBq9xmakNi6oQf/qQ1WCh+SU01GaP6lp736/+0QNhjdQSwMEFAAAAAgASLgqUZmA3K9SAAAAZQAAAB4AAABmbGFzay1leGFtcGxlL3JlcXVpcmVtZW50cy50eHRLzslMzra1Ndcz1DPi5XLLSSwG8gwhvMyS4pTEvPTUovzSYoigAS+XV2ZeVqKRra2RniFYkW9iUXZpQXBiWipEiSEvV3hqUXZVamk6SMAAJAAAUEsBAh8ACgAAAAAAu7gqUQAAAAAAAAAAAAAAAA4AJAAAAAAAAAAQAAAAAAAAAGZsYXNrLWV4YW1wbGUvCgAgAAAAAAABABgAhooJy62H1gGJsQnLrYfWAUecQfCsh9YBUEsBAh8AFAAAAAgAVrgqUVD2juuEAAAAswAAABQAJAAAAAAAAAAgAAAALAAAAGZsYXNrLWV4YW1wbGUvYXBwLnB5CgAgAAAAAAABABgAjECXWa2H1gGMQJdZrYfWAea+dQKth9YBUEsBAh8AFAAAAAgArrgqUd1YLutvAAAAoAAAABYAJAAAAAAAAAAgAAAA4gAAAGZsYXNrLWV4YW1wbGUvTWFrZWZpbGUKACAAAAAAAAEAGAC9ztq6rYfWAb3O2rqth9YBaUS3d62H1gFQSwECHwAUAAAACABIuCpRmYDcr1IAAABlAAAAHgAkAAAAAAAAACAAAACFAQAAZmxhc2stZXhhbXBsZS9yZXF1aXJlbWVudHMudHh0CgAgAAAAAAABABgA8nL0R62H1gHycvRHrYfWAdeyfUath9YBUEsFBgAAAAAEAAQAngEAABMCAAAAAA=='


class Project(Document):  # Todo: add encoded project if we are staying with the current implementation
    pKey = StringField(unique=True, required=True)  # userId_projectName
    name = StringField(required=True, default="flask example")
    port = StringField(max_length=5, default="5000")
    description = StringField(" here I explain about my project")
    picture = ReferenceField(ProjectPic, default=ProjectPic())
    header_data = ReferenceField(ProjectHeader, default=ProjectHeader())
    format = StringField(default="zip")
    type = StringField(default="python")
    encoded = StringField(default=default_project)


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

