from docker.errors import BuildError, APIError
from service.errors.container_errors.ContainerError import ContainerError
from service.errors.db_errors.DbError import DbError
from service.projects_manager import zip_handler, docker_client
from service.mongo_db.db_entities import Project
from service.mongo_db.db_client import save_project, get_project, get_project_pKey, is_user_exist, delete_project
import os
import socket

SUPPORTED_LANGUAGES = ['c', 'python', 'node']


def save_new_project(encoded_zip: bytes, project_name: str, project_type: str, user_id: str, port: str):
    if project_type not in SUPPORTED_LANGUAGES:
        raise NotImplementedError(project_type + " not supported")
    if not is_user_exist(user_id):
        raise DbError("User doesnt exist")

    try:
        zip_handler.base64_to_zip(encoded_zip, project_name + ".zip")
        zip_handler.unzip_file(os.path.join(os.path.sep, 'tmp', f"{project_name}.zip"), project_type)
        image = docker_client.create_image(project_name, project_type, user_id)[0]
        _save_to_db(project_name, port, user_id) #Todo: should be save or update
    except BuildError or APIError as e:
        raise ContainerError(" couldn't build image for project: " + project_name, e)
    except DbError as e:
        docker_client.remove_image(image.id)
        raise e
    finally:
        zip_handler.remove_zip(project_name + ".zip")
        zip_handler.remove_unzipped_folder(project_type, project_name)


def run_project(project_name: str, user_id: str):
    try:
        project = get_project(get_project_pKey(user_id, project_name))
    except Exception:
        raise ContainerError("couldn't run project as the project doesnt exist.")

    app_port = project.port
    host_port = _get_available_port()
    docker_client.run_container(f"{user_id}_{project_name}".lower(), app_port, host_port)

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


def _save_to_db(project_name: str, port: str, user_id: str, description: str = None):
    project_id = get_project_pKey(user_id, project_name)
    project = Project(pKey=project_id, name=project_name)
    if port:
        project.port = port
    if description:
        project.description = description

    save_project(project)


def delete_project(user_id, project_name):
    project_pkey = f"{user_id}_{project_name}"
    image = docker_client.get_image(project_pkey)
    docker_client.remove_image(image)
    delete_project(project_pkey)

# save_new_project(zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip"), "Exam_Trainer_React", "node", "Exam_Trainer_React", "itzik")
# encoded_file = zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip")
# print(encoded_file)
# save_new_project(encoded_file_ascii, "flask-test", "python", "pythonWebServer", "noam")
# run_project("Exam_Trainer_React", "noam", "3000")
