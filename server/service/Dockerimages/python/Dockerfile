FROM python:3.7

ARG PROJECT_NAME

# We copy just the requirements.txt first to leverage Docker cache
COPY ./tmp/${PROJECT_NAME}/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY ./tmp/${PROJECT_NAME} /app

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]