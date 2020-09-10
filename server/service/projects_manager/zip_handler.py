import base64
import zipfile
import os, stat
import shutil


def _generate_project_tmp_path(project_type: str):
    return os.path.join(os.getcwd(), "server", "service", "Dockerimages", project_type, "tmp") + os.path.sep


def base64_encoder(path2file): # this method is for testing
    with open(path2file, "rb") as f:
        bytes = f.read()
        return base64.b64encode(bytes)


def base64_to_zip(base64_zip_file: bytes, zip_file_name: str):
    path = os.path.join(os.path.sep, 'tmp', zip_file_name)
    with open(path, "wb") as f:
        decoded = base64.b64decode(base64_zip_file)
        f.write(decoded)


def unzip_file(path2file: str, project_type, project_name):
    with zipfile.ZipFile(path2file, 'r') as zip_ref:
        try: # Todo: fix this hacking
            path = _generate_project_tmp_path(project_type)
            project_path = path + project_name
            # os.chmod(project_path, stat.S_IREAD, stat.S_IWRITE)
            # os.subprocess.call(['chmod', '-R', '+rw', project_path])
            change_permissions_recursive(path, stat.S_IWRITE)
            zip_ref.extractall(path)
        except Exception as e:
            pass


def change_permissions_recursive(path, mode):
    for root, dirs, files in os.walk(path, topdown=False):
        for dir in [os.path.join(root,d) for d in dirs]:
            os.chmod(dir, mode)
    for file in [os.path.join(root, f) for f in files]:
            os.chmod(file, mode)


def remove_zip(zip_file_name):
    path_to_zip = os.path.join(f"{os.path.sep}tmp", zip_file_name)
    os.remove(path_to_zip)


def remove_unzipped_folder(project_type: str, project_name: str):
    path = _generate_project_tmp_path(project_type) + project_name + os.path.sep
    shutil.rmtree(path)   # TODO: fix; fail to remove files


def _remove_readonly(func, path, _):
    os.chmod(path, stat.S_IWRITE)
    func(path)
# #
# file_encoded = base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\fakebook-using-Flask.zip")
# base64_to_zip(file_encoded, "flaskWebTest.zip")
# unzip_file("C:\\tmp\\flaskWebTest.zip")