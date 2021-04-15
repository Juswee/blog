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

    def article_text(self):
        return [url(p).replace('\n', '<br>') for p in self.text.split('\n\n')]

def url(text):
    beg_ind = text.find('[url=')
    while beg_ind != -1:
        end_ind = text.find(']', beg_ind)
        text = text.replace('[url=', '<a href="', 1).replace('; ', '">', 1).replace(']', '</a>', 1)
        beg_ind = text.find('[url=')
    return text


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