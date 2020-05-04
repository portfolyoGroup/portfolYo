# Makefile for depndencies
ECHO = echo "going to compile for target $@"

PROG = "Install dependencies"
ifeq ($(OS), Windows_NT)
	FOLDER = Scripts
else
	FOLDER = bin
endif

all: install_python_requierments install_npm

install_npm:
	echo "### going to install node modules... ###"
	cd client &&\
	npm install --save-dev &&\
	cd ..
	echo "### finished to install node modules ###"

enter_venv:
	echo "### going to enter venv...### "
	server/venv/$(FOLDER)/activate

install_python_requierments: enter_venv
	echo "### going to install python requierments... ### "
	pip install -r server/requirments.txt

