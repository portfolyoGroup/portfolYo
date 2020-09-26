import logging

import docker
import os

from docker.errors import NotFound
from docker.models.images import Image

docker_client = docker.from_env()

def create_image(project_name: str, project_type, user_id: str, project_root):
    if ' ' in project_name:
        raise NameError("container name must not contain spaces")
    path_to_dockerfile = os.path.join(os.getcwd(), 'server', 'service', 'Dockerimages', project_type)
    # path_to_dockerfile = os.path.join(os.getcwd(), '..', 'service', 'Dockerimages', project_type)
    buildargs = {"PROJECT_NAME": project_root}
    tag = f"{user_id}_{project_name}"
    build_command = f"docker build -t {tag.lower()} --build-arg PROJECT_NAME={project_root} {path_to_dockerfile}"
    logging.error("going to build image with: " + build_command)

    # os.system(build_command)
    image = docker_client.images.build(path=path_to_dockerfile, buildargs=buildargs, tag=tag.lower())
    logging.error("image built successfully ")

    return image


def remove_image(image: Image):
    docker_client.images.remove(image)


def run_container(container_tag: str, app_port: str, host_port: int):
    # os.system(f"docker run --name {container_tag} -p {host_port}:{app_port} -d {container_tag}")
    port = {f"{app_port}/tcp": host_port}
    container = docker_client.containers.run(image=container_tag, detach=True, auto_remove=True, ports=port, name=container_tag)
    logging.error(f"container: {container_tag} is running")

    return container


def kill_container(container_tag: str):
    try:
        container = docker_client.containers.get(container_tag)
        container.remove(force=True)
        logging.error(f"container: {container_tag} is running")
    except NotFound as e:
        pass

