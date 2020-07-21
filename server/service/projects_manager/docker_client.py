import docker
import os
docker_client = docker.from_env()

def create_image(project_name: str, project_type, user_name: str, project_root: str):
    path_to_dockerfile = os.path.join(os.getcwd(), 'server', 'service', 'Dockerimages', project_type)
    buildargs = {"PROJECT_NAME": project_root}
    tag = f"{user_name}_{project_name}"

    # os.system(f"docker build {path_to_dockerfile} -t {tag.lower()} --build-arg {buildargs}")
    print(docker_client.images.build(path=path_to_dockerfile, buildargs=buildargs, tag=tag.lower()))

def run_container(container_tag: str):
    os.system(f"docker run --name {container_tag} -p 5001:5000 -d {container_tag}")

def kill_container(container_tag: str):
    container = docker_client.containers.get(container_tag)
    container.kill()
    container.remove()

#create_image("pythonWebServer")