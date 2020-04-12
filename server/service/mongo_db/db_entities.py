

class Project:
    def __init__(self, name: str, big_description: str, small_description: str, technologies: str, picture: str,
                 runtime: str):
        self.runtime = runtime
        self.picture = picture
        self.technologies = technologies
        self.small_description = small_description
        self.big_description = big_description
        self.name = name


class User:
    def __init__(self, user_name: str, description: str, pic: str, password: str, email: str, projects: list =[]):
        self.email = email
        self.password = password
        self.projects = projects
        self.user_name = user_name
        self.description = description
        self.pic = pic
