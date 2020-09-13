import logging
from concurrent.futures.thread import ThreadPoolExecutor

import docker
import os
import re
import time

from docker.errors import NotFound
from docker.models.containers import Container
from docker.models.images import Image
from service.errors.container_errors import ContainerError

docker_client = docker.from_env()

def create_image(project_name: str, project_type, user_id: str, project_root):
    if ' ' in project_name:
        raise NameError("container name must not contain spaces")
    path_to_dockerfile = os.path.join(os.getcwd(), '..', 'service', 'Dockerimages', project_type)
    # path_to_dockerfile = os.path.join(os.getcwd(), 'server', 'service', 'Dockerimages', project_type)
    buildargs = {"PROJECT_NAME": project_root}
    tag = f"{user_id}_{project_name}"
    build_command = f"docker build {path_to_dockerfile} -t {tag.lower()} --build-arg PROJECT_NAME={project_root}"
    logging.error("going to build image with: " + build_command)

    # os.system(build_command)
    logging.error("image built successfully ")
    return docker_client.images.build(path=path_to_dockerfile, buildargs=buildargs, tag=tag.lower())


def remove_image(image: Image):
    docker_client.images.remove(image)


def run_container(container_tag: str, app_port: str, host_port: int):
    # os.system(f"docker run --name {container_tag} -p {host_port}:{app_port} -d {container_tag}")
    ports = {f"{app_port}/tcp": host_port}
    return docker_client.containers.run(image=container_tag, detach=True, auto_remove=True, ports=ports, name=container_tag)
    # _timeout_container(container, 60*60*60)


def kill_container(container_tag: str):
    try:
        container = docker_client.containers.get(container_tag)
        container.kill()
    except NotFound as e:
        pass


# def _timeout_container(container: Container, seconds: int):
#     def kill_container_after(container_2_kill: Container, time_to_live: int):
#         time.sleep(time_to_live)
#         try:
#             container_2_kill.kill()
#         except Exception as e:
#             logging.error(e)
#     with ThreadPoolExecutor(max_workers=1) as executor:
#         executor.submit(kill_container_after, container, seconds)

docker_client.images.build(path="../Dockerimages/c/", buildargs={"PROJECT_NAME": "helloc"}, tag="helloc")

container = docker_client.containers.run("helloc", detach=True, tty=True)
# logs = container.logs()
# urls = re.findall(b'(?P<url>https?://[^\s]+)', logs)
# counter = 0
# while not urls and counter < 20:
#     urls = re.findall(b'(?P<url>https?://[^\s]+)', logs)
#     logs = container.logs()
#     counter += 1
#     time.sleep(1)
#
#
# url = urls[2].decode("utf-8")
# url = url.replace("\x1b[K", "")
# print(url)

#res = container.exec_run(cmd="echo q")
#print(res)
# tmp_log = b'\x1b[?1049h\x1b[22;0;0t\x1b(B\x1b[m\x1b[?1l\x1b>\x1b[H\x1b[2J\x1b[?12l\x1b[?25h\x1b[?1000l\x1b[?1002l\x1b[?1006l\x1b[?1005l\x1b]112\x07\x1b[?25l\x1b[1;1HTip: if you wish to use tmate only for remote access, run: tmate -F        \x1b[30m\x1b[43m[0/0]\x1b[2;1H\x1b[39m\x1b[49mTo see the following messages again, run in a tmate session: tmate show-messages\x1b[3;1HPress <q> or <ctrl-c> to continue\x1b[K\r\n---------------------------------------------------------------------\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[30m\x1b[42m[my_sessio0:sh*                                   "45a992de31a0" 12:47 09-Aug-20\x1b(B\x1b[m\x1b[24;1H\x1b[1;24r\x1b[H\x1b[?12l\x1b[?25h\x1b[?25l\x1b[24d\x1b[30m\x1b[42m[my_sessio0:[tmux]*                               "45a992de31a0" 12:47 09-Aug-20\x1b(B\x1b[m\x1b[1;1H\x1b[?12l\x1b[?25h\x1b[1;23r\x1b[4BConnecting to ssh.tmate.io...\x1b[K\x1b[?25l\x1b[24;1H\x1b[30m\x1b[43m[tmate] Connecting to ssh.tmate.io...                                           \x1b(B\x1b[m\x1b[24;1H\x1b[1;24r\x1b[H\x1b[?12l\x1b[?25h\x1b[1;23r\x1b[5BNote: clear your terminal before sharing readonly access\x1b[K\r\nweb session read only: https://tmate.io/t/ro-Z6ttXZW3E4kw2xDgUXZDZkqxS\x1b[K\r\nssh session read only: ssh ro-Z6ttXZW3E4kw2xDgUXZDZkqxS@lon1.tmate.io\x1b[K\r\nweb session: https://tmate.io/t/jTbWMf25WxcGtHy6thhYsUdFA\x1b[K\r\nssh session: ssh jTbWMf25WxcGtHy6thhYsUdFA@lon1.tmate.io\x1b[K\x1b[?25l\x1b[HTip: if you wish to use tmate only for remote access, run: tmate -F        \x1b[30m\x1b[43m[0/0]\x1b[2;1H\x1b[39m\x1b[49mTo see the following messages again, run in a tmate session: tmate show-messages\x1b[3;1HPress <q> or <ctrl-c> to continue\x1b[K\r\n---------------------------------------------------------------------\x1b[K\r\nConnecting to ssh.tmate.io...\x1b[K\r\nNote: clear your terminal before sharing readonly access\x1b[K\r\nweb session read only: https://tmate.io/t/ro-Z6ttXZW3E4kw2xDgUXZDZkqxS\x1b[K\r\nssh session read only: ssh ro-Z6ttXZW3E4kw2xDgUXZDZkqxS@lon1.tmate.io\x1b[K\r\nweb session: https://tmate.io/t/jTbWMf25WxcGtHy6thhYsUdFA\x1b[K\r\nssh session: ssh jTbWMf25WxcGtHy6thhYsUdFA@lon1.tmate.io\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\x1b[24d\x1b[30m\x1b[43m[tmate] ssh session: ssh jTbWMf25WxcGtHy6thhYsUdFA@lon1.tmate.io                \x1b(B\x1b[m\x1b[24;1H\x1b[1;24r\x1b[H\x1b[?12l\x1b[?25h\x1b[?25lTip: if you wish to use tmate only for remote access, run: tmate -F        \x1b[30m\x1b[43m[0/0]\x1b[2;1H\x1b[39m\x1b[49mTo see the following messages again, run in a tmate session: tmate show-messages\x1b[3;1HPress <q> or <ctrl-c> to continue\x1b[K\r\n---------------------------------------------------------------------\x1b[K\r\nConnecting to ssh.tmate.io...\x1b[K\r\nNote: clear your terminal before sharing readonly access\x1b[K\r\nweb session read only: https://tmate.io/t/ro-Z6ttXZW3E4kw2xDgUXZDZkqxS\x1b[K\r\nssh session read only: ssh ro-Z6ttXZW3E4kw2xDgUXZDZkqxS@lon1.tmate.io\x1b[K\r\nweb session: https://tmate.io/t/jTbWMf25WxcGtHy6thhYsUdFA\x1b[K\r\nssh session: ssh jTbWMf25WxcGtHy6thhYsUdFA@lon1.tmate.io\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n\x1b[K\r\n'
# web = re.search("web session: .*", str(tmp_log))
#create_image("pythonWebServer")