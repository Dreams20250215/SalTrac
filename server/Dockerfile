FROM python:3.8-slim

RUN apt update && apt install -y libgl1 libglib2.0-0 libsm6 libxrender1 libxext6

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "./flaskr/app.py"]