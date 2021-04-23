import os 

SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_TRACK_MODIFICATIONS = False

DATABASE_URL = 'postgres://tgaqugindcjkfq:6e3293b085d408e8593ff424b108674a5d4206f3d4fd3a192c0164525fd0e43d@ec2-34-242-89-204.eu-west-1.compute.amazonaws.com:5432/d6ei6tn8iogst2'
UPLOAD_IMAGE = '/static/images/uploads/'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg'}