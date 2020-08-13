from service.projects_manager import zip_handler, docker_client
import os


def save_new_project(encoded_zip: bytes, project_name: str, project_type: str, project_root: str, user_name: str):
    try:
        zip_handler.base64_to_zip(encoded_zip, project_name + ".zip")
        zip_handler.unzip_file(os.path.join(os.path.sep, 'tmp', f"{project_name}.zip"), project_type)
        docker_client.create_image(project_name, project_type, user_name, project_root)
    finally:
        zip_handler.remove_zip(project_name + ".zip")
        #zip_handler.remove_unzipped_folder(project_type)


def run_project(project_name: str, user_name: str, app_port: str):
    docker_client.run_container(f"{user_name}_{project_name}".lower(), app_port)


def kill_container(user_name: str, project_name: str):
    docker_client.kill_container(f"{user_name}_{project_name}".lower())

# save_new_project(zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip"), "Exam_Trainer_React", "node", "Exam_Trainer_React", "itzik")
# encoded_file = zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Exam_Trainer_React.zip")
# save_new_project(encoded_file_ascii, "flask-test", "python", "pythonWebServer", "noam")
# run_project("Exam_Trainer_React", "noam", "3000")
