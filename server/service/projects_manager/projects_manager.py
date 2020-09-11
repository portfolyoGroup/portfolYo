import logging

from docker.errors import BuildError, APIError
from service.errors.container_errors.ContainerError import ContainerError
from service.errors.db_errors.DbError import DbError
from service.projects_manager import zip_handler, docker_client
from service.mongo_db.db_entities import Project, ProjectPic, ProjectHeader
from service.mongo_db.db_client import save_project, get_project, get_project_pKey, is_user_exist, delete_project, \
    get_project_if_exist, add_user_project, delete_user_project
import os
import socket

from service.projects_manager.project_data_keys import *

SUPPORTED_LANGUAGES = ['c', 'python', 'node']


def _get_default_encoded_project():
    f = open(os.path.join(os.getcwd(), "server", "service", "projects_manager", "default-project.txt"), "r")
    return f.read()


def _get_default_project_data():
    return _get_default_encoded_project(), "python", '5000'


def update_project(project_data: dict, user_id: str):
    project_type = project_data.get(TYPE_AND_PORT).get(PROJECT_PORT)
    encoded_zip = project_data.get(DATA_OF_ENCODED_PROJECT).get(ENCODED_PROJECT)
    project_root = project_data.get(DATA_OF_ENCODED_PROJECT).get(PROJECT_NAME)
    project_name = project_data.get(HEADER_DATA).get(TITLE)
    if project_type not in SUPPORTED_LANGUAGES:
        logging.log(project_type + "not supported")
        raise NotImplementedError(project_type + " not supported")
    if not is_user_exist(user_id):
        logging.error("user doesnt exist")
        raise DbError("User doesnt exist")

    try:
        zip_handler.base64_to_zip(encoded_zip, project_root + ".zip")
        zip_handler.unzip_file(os.path.join(os.path.sep, 'tmp', f"{project_root}.zip"), project_type)
        image = docker_client.create_image(project_name, project_type, user_id, project_root)[0]
        _update_project(project_data, user_id)
    except BuildError or APIError as e:
        logging.error(e)
        raise ContainerError(" couldn't build image for project: " + project_name, e)
    except DbError as e:
        logging.error(e)
        docker_client.remove_image(image.id)
        raise e
    finally:
        zip_handler.remove_zip(project_root + ".zip")
        zip_handler.remove_unzipped_folder(project_type, project_root)


def run_project(project_id: str):
    try:
        project = get_project(project_id)
    except Exception as e:
        logging.error(e)
        raise ContainerError("couldn't run project as the project doesnt exist.")

    app_port = project.port
    host_port = _get_available_port()
    docker_client.run_container(f"{project_id}".lower(), app_port, host_port)

    return host_port


def kill_container(user_id: str, project_name: str):
    docker_client.kill_container(f"{user_id}_{project_name}".lower())


def _get_available_port():
    free_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    free_socket.bind(('0.0.0.0', 0))
    free_socket.listen(5)
    port = free_socket.getsockname()[1]
    free_socket.close()
    return port


def _save_project(project_name: str, user_id: str):
    project_id = get_project_pKey(user_id, project_name)
    encoded_project, _, port = _get_default_project_data()
    project = Project(pKey=project_id, encoded=encoded_project)
    save_project(project)


def _update_project(project_data: dict, user_id: str):
    project_type = project_data.get(TYPE_AND_PORT).get(PROJECT_TYPE)
    project_port = project_data.get(TYPE_AND_PORT).get(PROJECT_PORT)

    title = project_data.get(HEADER_DATA).get(TITLE)
    subtitle = project_data.get(HEADER_DATA).get(SUB_TITLE)
    description = project_data.get(HEADER_DATA).get(DESCRIPTION)

    project_name = project_data.get(DATA_OF_ENCODED_PROJECT).get(PROJECT_NAME)
    project_format = project_data.get(DATA_OF_ENCODED_PROJECT).get(PROJECT_FORMAT)
    encoded_project = project_data.get(DATA_OF_ENCODED_PROJECT).get(ENCODED_PROJECT)

    pic_name = project_data.get(PIC_DATA).get(PIC_NAME)
    pic_format = project_data.get(PIC_DATA).get(PIC_FORMAT)
    encoded_pic = project_data.get(PIC_DATA).get(ENCODED_PIC)

    project_id = get_project_pKey(user_id, project_name)
    project = get_project_if_exist(project_id)

    project_pic_db_entity = ProjectPic(name=pic_name, format=pic_format, encoded=encoded_pic)
    project_header_db_entity = ProjectHeader(title=title, subtitle=subtitle)

    project.port = project_port
    project.description = description
    project.picture = project_pic_db_entity
    project.header_data = project_header_db_entity
    project.format = project_format
    project.type = project_type
    project.encoded = encoded_project

    project.save()


def delete_project(user_id, project_name):
    project_pkey = f"{user_id}_{project_name}"
    image = docker_client.get_image(project_pkey)
    docker_client.remove_image(image)
    delete_project(project_pkey)
    delete_user_project(user_id, project_pkey)

# save_new_project(zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip"), "Exam_Trainer_React", "node", "Exam_Trainer_React", "itzik")
# encoded_file = zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip")
# print(encoded_file)
# save_new_project(encoded_file_ascii, "flask-test", "python", "pythonWebServer", "noam")
# run_project("Exam_Trainer_React", "noam", "3000")


def handle_upload(project_data: dict, user_id: str):
    """

    :param project_data:dataOfProjectHeader: {
            title: " ",
            sub_title: "",
            description: ""
        },
        dataOfProjectDetails: {
            projectType: "python"
            port: 1
        },
        encodedProject: {
            encodedProjectName: "name",
            encodedProjectFormat: ".zip",
            encodedProjectData: "KAKI OF PIGIOYOTO"
        },
        projectPic: {
            picName: "some pic",
            picType: "png",
            picData: 'kaki of yonim'

        }
    :param user_id:
    :return:
    """
    if project_data.get(DATA_OF_ENCODED_PROJECT):
        update_project(project_data)
    else:
        project_name = project_data.get(HEADER_DATA).get(TITLE)
        add_user_project(user_id, project_name)
        _save_project(project_name, user_id)


def get_project_data(project_id: str):
    project = get_project(project_id)
    data_of_header = dict()

    data_of_header[TITLE] = project.header_data.title
    data_of_header[SUB_TITLE] = project.header_data.subtitle
    data_of_header[DESCRIPTION] = project.description

    data_of_project = dict()
    data_of_project[PROJECT_TYPE] = project.type
    data_of_project[PROJECT_PORT] = project.port

    encoded_project_data = dict()
    encoded_project_data[PROJECT_NAME] = project.name
    encoded_project_data[PROJECT_FORMAT] = project.format
    encoded_project_data[ENCODED_PROJECT] = project.encoded

    pic_data = dict()
    pic_data[PIC_NAME]  = project.picture.name
    pic_data[PIC_FORMAT] = project.picture.format
    pic_data[ENCODED_PIC] = project.picture.encoded

    result = dict()
    result[HEADER_DATA] =  data_of_header
    result[TYPE_AND_PORT] = data_of_project
    result[DATA_OF_ENCODED_PROJECT] = encoded_project_data
    result[PIC_DATA] = pic_data

    return result

