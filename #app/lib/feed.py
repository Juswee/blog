class Article:
    def __init__(self, idx, title, timestamp, text, tags, img, type):
        self.idx = idx
        self.title = title
        self.timestamp = timestamp
        self.text = text
        self.tags = [el.strip() for el in tags.split(';')]
        self.img = img
        self.type = type

    def description(self):
        lst = self.text.split(' ')
        leng = min([len(lst), 30])
        return str(lst[:leng]).replace(',', '').replace("'", '').replace('\\n', '').strip('[]')


class Video:
    def __init__(self, idx, title, tags, link, img, timestamp, type):
        self.idx = idx
        self.title = title
        self.tags = [el.strip() for el in tags.split(';')]
        self.link = link
        self.img = img
        self.timestamp = timestamp
        self.type = type

class Text:
    def __init__(self, idx, timestamp, text, tags, type):
        self.idx = idx
        self.timestamp = timestamp
        self.text = text
        self.tags = [el.strip() for el in tags.split(';')]
        self.type = type


def post(idx, title, text, tags, link, img, timestamp, type):
    post_type = type
    if post_type == 'text': return Text(idx, timestamp, text, tags, type)
    elif post_type == 'article': return Article(idx, title, timestamp, text, tags, img, type)


def add_post(database, enum, idx, title, text, tags, link, img, timestamp, type):
    data_list = (enum, idx, title, text, tags, link, img, timestamp, type)
    database.push('Feed', data_list)
    return post(*data_list[1:])