from service.projects_manager import zip_handler, docker_client
import os
import socket


def save_new_project(encoded_zip: bytes, project_name: str, project_type: str, user_name: str):
    try:
        zip_handler.base64_to_zip(encoded_zip, project_name + ".zip")
        zip_handler.unzip_file(os.path.join(os.path.sep, 'tmp', f"{project_name}.zip"), project_type)
        docker_client.create_image(project_name, project_type, user_name)
    finally:
        zip_handler.remove_zip(project_name + ".zip")
        #zip_handler.remove_unzipped_folder(project_type)


def run_project(project_name: str, user_name: str, app_port: str):
    port = _get_available_port()
    docker_client.run_container(f"{user_name}_{project_name}".lower(), app_port, port)
    return port


def kill_container(user_name: str, project_name: str):
    docker_client.kill_container(f"{user_name}_{project_name}".lower())


def _get_available_port():
    free_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    free_socket.bind(('0.0.0.0', 0))
    free_socket.listen(5)
    port = free_socket.getsockname()[1]
    free_socket.close()
    return port

# save_new_project(zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip"), "Exam_Trainer_React", "node", "Exam_Trainer_React", "itzik")
# encoded_file = zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip")
# print(encoded_file)
# save_new_project(encoded_file_ascii, "flask-test", "python", "pythonWebServer", "noam")
# run_project("Exam_Trainer_React", "noam", "3000")
