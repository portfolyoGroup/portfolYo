from service.projects_manager import zip_handler, docker_client
from service.mongo_db.db_entities import Project
from service.mongo_db.mongo_client import mongo_save_project, mongo_get_project, get_project_pKey, mongo_get_user
import os
import socket


def save_new_project(encoded_zip: bytes, project_name: str, project_type: str, user_id: str, port: str):
    try:
        # mongo_get_user(user_id)
        zip_handler.base64_to_zip(encoded_zip, project_name + ".zip")
        zip_handler.unzip_file(os.path.join(os.path.sep, 'tmp', f"{project_name}.zip"), project_type)
        docker_client.create_image(project_name, project_type, user_id)
        _save_to_db(project_name, port, user_id)
    except BuildError or APIError as e:
        raise Exception(" couldnt build image for project: " + project_name)
    except DoesNotExist as e:
        raise Exception("could not upload project for a non existing user")
    finally:
        zip_handler.remove_zip(project_name + ".zip")
        # zip_handler.remove_unzipped_folder(project_type)


def run_project(project_name: str, user_id: str):
    try:
        project = mongo_get_project(get_project_pKey(user_id, project_name))
    except Exception as e:
        raise Exception("couldnt run project as the doesnt exist.")

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

    mongo_save_project(project)



# save_new_project(zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip"), "Exam_Trainer_React", "node", "Exam_Trainer_React", "itzik")
# encoded_file = zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip")
# print(encoded_file)
# save_new_project(encoded_file_ascii, "flask-test", "python", "pythonWebServer", "noam")
# run_project("Exam_Trainer_React", "noam", "3000")
