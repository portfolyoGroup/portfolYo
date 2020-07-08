import zip_handler
import docker_client
project_types = ("PYTHON")

def save_new_project(encoded_zip: str, project_name: str, project_type: str, project_root: str, user_name: str):
    try:
        zip_handler.base64_to_zip(encoded_zip, project_name + ".zip")
        zip_handler.unzip_file(f"/tmp/{project_name}.zip", project_type)
        docker_client.create_image(project_root, project_type, user_name)
    except Exception as e:
        print(e)
    finally:
        zip_handler.remove_zip(project_name + ".zip")
        #zip_handler.remove_unzipped_folder(project_type)

def run_project(project_name: str, user_name: str):
    docker_client.run_project(f"{user_name}_{project_name}")


save_new_project(zip_handler.base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\pythonWebServer.zip"), "flask-test", "python", "pythonWebServer", "noam")
run_project("pythonWebServer", "noam")