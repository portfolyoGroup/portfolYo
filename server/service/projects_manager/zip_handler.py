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


def unzip_file(path2file: str, project_type):
    with zipfile.ZipFile(path2file, 'r') as zip_ref:
        try: # Todo: fix this hacking
            zip_ref.extractall(_generate_project_tmp_path(project_type))
        except Exception as e:
            pass


def remove_zip(zip_file_name):
    path_to_zip = os.path.join(f"{os.path.sep}tmp", zip_file_name)
    os.remove(path_to_zip)


def remove_unzipped_folder(project_type: str, project_name: str):
    path = _generate_project_tmp_path(project_type) + project_name + os.path.sep
    os.chmod(path, stat.S_IWRITE)
    shutil.rmtree(path)


def _remove_readonly(func, path, _):
    os.chmod(path, stat.S_IWRITE)
    func(path)
# # #
# file_encoded = base64_encoder("C:\\Users\\noaml\\OneDrive - Nice Systems Ltd\\Desktop\\School\\final project\\Alguru.zip")
# file_encoded = base64_encoder("C:\\Users\\noaml\\Alguru\\Alguru.zip")
# #
# base64_to_zip(file_encoded, "flaskWebTest.zip")
# unzip_file("C:\\tmp\\flaskWebTest.zip")