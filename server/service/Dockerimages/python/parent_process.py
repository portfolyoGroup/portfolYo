import subprocess
from multiprocessing import Process, Pipe
def run_user_code():

    pipe_child_read, pipe_parent_write = Pipe()
    pipe_parent_read, pipe_child_write = Pipe()

    p = subprocess.Popen(["python", "./test.py"], stdin=pipe_child_read, stdout=pipe_child_write, stderr=pipe_child_write)
    print(pipe_parent_read.poll())
    pipe_parent_write.send("Noam")
    print(pipe_parent_read.poll())
    p.wait()
