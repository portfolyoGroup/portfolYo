import docker
import os
import re
import time
docker_client = docker.from_env()

def create_image(project_name: str, project_type, user_name: str, project_root: str):
    path_to_dockerfile = os.path.join(os.getcwd(), 'server', 'service', 'Dockerimages', project_type)
    buildargs = {"PROJECT_NAME": project_root}
    tag = f"{user_name}_{project_name}"

    # os.system(f"docker build {path_to_dockerfile} -t {tag.lower()} --build-arg {buildargs}")
    print(docker_client.images.build(path=path_to_dockerfile, buildargs=buildargs, tag=tag.lower()))

def run_container(container_tag: str, app_port: str, host_port: int):
    # os.system(f"docker run --name {container_tag} -p 5001:{app_port} -d {container_tag}")
    ports = {f"{app_port}/tcp": host_port}
    docker_client.containers.run(image=container_tag, detach=True, auto_remove=True, ports=ports, name=container_tag)

def kill_container(container_tag: str):
    container = docker_client.containers.get(container_tag)
    container.kill()


# docker_client.images.build(path="../Dockerimages/c/", buildargs={"PROJECT_NAME": "c_test"}, tag="c_test")

# container = docker_client.containers.run("c_test", detach=True, auto_remove=True, tty=True)
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