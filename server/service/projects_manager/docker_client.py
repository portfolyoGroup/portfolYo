import docker
import os
docker_client = docker.from_env()

def create_image(project_name: str, project_type, user_name: str, project_root: str):
    path_to_dockerfile = f"{os.getcwd() + os.path.sep}..{os.path.sep}" \
                         f"service{os.path.sep}" \
                         f"Dockerimages{os.path.sep}{project_type}"
    buildargs = {"PROJECT_NAME": project_root}
    tag = f"{user_name}_{project_name}"

    # os.system(f"docker build {path_to_dockerfile} -t {tag.lower()} --build-arg {buildargs}")
    return docker_client.images.build(path=path_to_dockerfile, buildargs=buildargs, tag=tag.lower())

def run_container(container_tag: str):
    os.system(f"docker run -p 5001:5000 -d --name {container_tag} {container_tag}")

def kill_container(container_tag: str):
    container = docker_client.containers.get(container_tag)
    container.kill()

#create_image("pythonWebServer")