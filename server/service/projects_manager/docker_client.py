import docker
import os
docker_client = docker.from_env()

def create_image(project_name: str, project_type, user_name: str):
    build_result = docker_client.images.build(path=f"../Dockerimages/{project_type}/",
                                              buildargs={"PROJECT_NAME": project_name},
                                              tag=f"{user_name}_{project_name}")

def run_container(container_tag: str):
    os.system(f"docker run -p 5000:5000 -d {container_tag}")

def kill_container(container_tag: str):
    pass

#create_image("pythonWebServer")