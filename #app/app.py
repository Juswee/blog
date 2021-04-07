from flask import Flask, render_template
from lib.story import Story
from lib.feed import News

app = Flask(__name__)

stories = [
    Story(0, 'Отдыхаю на природе', '31.03.2021'),
    Story(1, 'Выбираю ноутбук', '15.03.2021'),
    Story(2, 'Весна пришла', '01.03.2021')
]
feed = [  # idx, title, date, text, tags
    News(0, 'Выбираю ноутбук', '15.03.2021', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.', 'it; devices', 'article'),
    News(1, 'Как писать код быстро и безболезненно?', '01.03.2021', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'it; productivity', 'article')
]


@app.route('/')
def index():
    return render_template('index.html', stories=stories, feed=feed)


@app.route('/article/<int:idx>')
def article(idx):
    return render_template('article.html')
