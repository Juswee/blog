pip freeze > requirements.txt
pip install -r ./requirements.txt

cd #app

set FLASK_APP=app.py
set FLASK_ENV=production
set FLASK_DEBUG=0

flask run

cd ..