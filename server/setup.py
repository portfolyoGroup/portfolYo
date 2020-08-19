from setuptools import setup, find_packages
import os

with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(name='server', packages=['service', 'app'], install_requires=required)

# run pip install -e .